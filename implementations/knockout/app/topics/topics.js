var model = require('model.js');
var ko = require('knockout');
var asyncAll = require('async-all');


module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
		template: {
			template: require('fs').readFileSync('implementations/knockout/app/topics/topics.html', 'utf8'),
			viewModel: TopicsVM
		},
		resolve: function(data, parameters, cb) {
			asyncAll({
				topics: model.getTopics,
				tasks: model.getTasks
			}, cb);
		},
		activate: function(context) {
			var viewModel = context.domApi.viewModel;
			viewModel.goToState = stateRouter.go;
			viewModel.activate(context.content.topics, context.content.tasks);
		}
	});

	require('./tasks/tasks')(stateRouter);
};


function TopicsVM() {
	this.addingTopic = ko.observable(false);
	this.newTopic = ko.observable('');
	this.topics = ko.observableArray();

	this.onTasksSaved = TopicsVM.prototype.onTasksSaved.bind(this);
	this.onTopicsSaved = TopicsVM.prototype.onTopicsSaved.bind(this);

	model.on('tasks saved', this.onTasksSaved);
	model.on('topics saved', this.onTopicsSaved);
}

ko.utils.extend(TopicsVM.prototype, {
	activate: function(topics, tasks) {
		this.addingTopic(false);
		this.newTopic('');
		this._init(topics, tasks);
	},

	dispose: function() {
		model.removeListener('tasks saved', this.onTasksSaved);
		model.removeListener('topics saved', this.onTopicsSaved);
	},

	addTopic: function() {
		var newTopicName = this.newTopic();

		if (this.addingTopic()) {
			if (newTopicName) {
				var newTopic = model.addTopic(newTopicName);

				this.newTopic('');
				this.addingTopic(false);

				this.goToState('app.topics.tasks', {
					topicId: newTopic.id
				});
			}
		}
		else {
			this.addingTopic(true);
		}
	},

	onTasksSaved: function(topicId) {
		this._recomputeTasksLeft(topicId);
	},

	onTopicsSaved: function() {
		var _this = this;
		asyncAll({
			topics: model.getTopics,
			tasks: model.getTasks
		}, function(err, data) {
			_this._init(data.topics, data.tasks);
		});
	},

	_init: function(topics, tasksByTopic) {
		var _this = this;
		_this.topics(
			topics.map(function(item) {
				return {
					id: item.id,
					name: item.name,
					tasksLeft: ko.observable(_this._countTasksLeft(tasksByTopic[item.id]))
				};
			}));
	},

	_countTasksLeft: function(tasks) {
		return tasks.reduce(function(toDo, task) {
			return toDo + (task.done ? 0 : 1);
		}, 0);
	},

	_recomputeTasksLeft: function(topicId) {
		var topic = this.topics().find(function(item) {
			return item.id === topicId;
		});
		if (topic) {
			var _this = this;
			model.getTasks(topicId, function(err, tasks) {
				topic.tasksLeft(_this._countTasksLeft(tasks));
			});
		}
	},

	resetContext: function(data) {
		this._init(data.topics, data.tasks);
	}
});
