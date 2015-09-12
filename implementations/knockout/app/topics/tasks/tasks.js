var model = require('model.js');
var fs = require('fs');
var UUID_V4_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
var ko = require('knockout');
var asyncAll = require('async-all');


module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId(' + UUID_V4_REGEX + ')',
		template: {
			template: fs.readFileSync('implementations/knockout/app/topics/tasks/tasks.html', 'utf8'),
			viewModel: TasksVM
		},
 		resolve: function(data, parameters, cb) {
 			asyncAll({
				topic: model.getTopic.bind(undefined, parameters.topicId),
				tasks: model.getTasks.bind(undefined, parameters.topicId)
			}, cb);
 		},
 		activate: function(context) {
			var viewModel = context.domApi.viewModel;
			viewModel.activate(context.content.topic, context.content.tasks);
 		}
	});

	stateRouter.addState({
		name: 'app.topics.no-task',
		route: '',
 		template: fs.readFileSync('implementations/knockout/app/topics/tasks/no-task-selected.html', 'utf8')
	});
};


function TasksVM() {
	this.tasks = ko.observableArray();
	this.topicId = ko.observable();
	this.topicName = ko.observable();
	this.newTaskName = ko.observable('');

	this.completeTask = TasksVM.prototype.completeTask.bind(this);
	this.restoreTask = TasksVM.prototype.restoreTask.bind(this);
	this.removeTask = TasksVM.prototype.removeTask.bind(this);

	this.onCreateTask = TasksVM.prototype.onCreateTask.bind(this);
	this.onTasksSaved = TasksVM.prototype.onTasksSaved.bind(this);

	model.on('tasks saved', this.onTasksSaved);
}

ko.utils.extend(TasksVM.prototype, {
	activate: function(topic, tasks) {
		this._init(topic, tasks);
	},

	_init: function(topic, tasks) {
		this.topicId(topic.id);
		this.topicName(topic.name);

		this.tasks(
			tasks.map(function(item) {
				return {
					name: ko.observable(item.name),
					done: ko.observable(item.done),
					$data: item
				};
			}));
	},

	dispose: function() {
		this.tasks.removeAll();
		model.removeListener('tasks saved', this.onTasksSaved);
	},

	completeTask: function(task) {
		task.done(true);
		task.$data.done = true;
		model.saveTasks(this.topicId(), this.tasks().map(function(item) { return {name: item.name(), done: item.done() }}));
	},

	restoreTask: function(task) {
		task.done(false);
		task.$data.done = false;
		model.saveTasks(this.topicId(), this.tasks().map(function(item) { return {name: item.name(), done: item.done() }}));
	},

	removeTask: function(task) {
		var _this = this;
		this.tasks.remove(task);

		model.getTasks(this.topicId(), function(err, tasks) {
			var index = tasks.indexOf(task.$data);

			if (index > -1) {
				tasks.splice(index, 1);
				model.saveTasks(_this.topicId(), _this.tasks().map(function(item) { return {name: item.name(), done: item.done() }}));
			}
		});
	},

	createTask: function() {
		if (this.newTaskName()) {
			model.saveTask(this.topicId(), this.newTaskName());
			this.newTaskName('');
		}
	},

	onCreateTask: function(viewModel, event) {
		if (event.keyCode === 13) {
			this.createTask();
		}
	},

	onTasksSaved: function(topicId) {
		var _this = this;
		asyncAll({
			topic: model.getTopic.bind(undefined, topicId),
			tasks: model.getTasks.bind(undefined, topicId)
		}, function(err, data) {
			_this._init(data.topic, data.tasks);
		});
	},

	resetContext: function(data) {
		this._init(data.topic, data.tasks);
	}
});
