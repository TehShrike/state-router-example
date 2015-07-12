var model = require('model.js');
var ko = require('knockout');


module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
		template: require('fs').readFileSync('implementations/knockout/app/topics/topics.html', 'utf8'),
		resolve: function(data, parameters, cb) {
			var viewModel = new TopicsVM(stateRouter);
			cb(null, viewModel);
		},
		activate: function(context) {
			var viewModel = context.content;
			viewModel.activate();
			context.on('destroy', viewModel.dispose.bind(viewModel));
		}
	});

	require('./tasks/tasks')(stateRouter);
};


function TopicsVM(stateRouter) {
	this._stateRouter = stateRouter;

	this.addingTopic = ko.observable(false);
	this.newTopic = ko.observable('');
	this.topics = ko.observableArray();

	this.onTasksSaved = TopicsVM.prototype.onTasksSaved.bind(this);
	this.onTopicsSaved = TopicsVM.prototype.onTopicsSaved.bind(this);

	model.on('tasks saved', this.onTasksSaved);
	model.on('topics saved', this.onTopicsSaved);
}

ko.utils.extend(TopicsVM.prototype, {
	activate: function() {
		this.addingTopic(false);
		this.newTopic('');
		this._init();
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
				model.saveTopics();
				this.newTopic('');
				this.addingTopic(false);

				this._stateRouter.go('app.topics.tasks', {
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
		this._init();
	},

	_init: function() {
		this.topics(
			model.getTopics().map(function(item) {
				return {
					id: item.id,
					name: item.name,
					tasksLeft: ko.observable()
				};
			}));
		this.topics().forEach(function(item) { this._recomputeTasksLeft(item.id); }, this);
	},

	_recomputeTasksLeft: function(topicId) {
		var topic = this.topics().find(function(item) {
			return item.id === topicId;
		});
		var countTasksLeft = function(topicId) {
			return model.getTasks(topicId)
				.reduce(function(toDo, task) {
					return toDo + (task.done ? 0 : 1);
				}, 0);
		};

		if (topic) {
			topic.tasksLeft(countTasksLeft(topic.id));
		}
		else {
			this._init();
		}
	}
});
