var model = require('model.js');
var fs = require('fs');
var UUID_V4_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
var ko = require('knockout');



module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId(' + UUID_V4_REGEX + ')',
 		template: fs.readFileSync('implementations/knockout/app/topics/tasks/tasks.html', 'utf8'),
 		resolve: function(data, parameters, cb) {
 			cb(null, new TasksVM());
 		},
 		activate: function(context) {
			var viewModel = context.content;
			viewModel.activate(context.parameters.topicId);
			context.on('destroy', viewModel.dispose.bind(viewModel));
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
	activate: function(topicId) {
		this._init(topicId);
	},

	_init: function(topicId) {
		var topic = model.getTopic(topicId);
		this.topicId(topicId);
		this.topicName(topic.name);

		this.tasks(
			model.getTasks(topicId).map(function(item) {
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
		model.saveTasks(this.topicId());
	},

	restoreTask: function(task) {
		task.done(false);
		task.$data.done = false;
		model.saveTasks(this.topicId());
	},

	removeTask: function(task) {
		this.tasks.remove(task);

		var tasks = model.getTasks(this.topicId());
		var index = tasks.indexOf(task.$data);

		if (index > -1) {
			tasks.splice(index, 1);
			model.saveTasks(this.topicId());
		}
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
		this._init(topicId);
	}
});
