var model = require('model.js')
var all = require('async-all')

var UUID_V4_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'

module.exports = function(stateRouter) {
	require('./no-task-selected.tag')
	require('./tasks.tag')

	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId(' + UUID_V4_REGEX + ')',
 		template: 'tasks',
 		resolve: function(data, parameters, cb) {
 			all({
 				topic: model.getTopic.bind(null, parameters.topicId),
 				tasks: model.getTasks.bind(null, parameters.topicId)
 			}, cb)
 		},
 		activate: function(context) {
 			var tag = context.domApi
 			var topicId = context.parameters.topicId

 			function saveTasks() {
 				model.saveTasks(topicId, tag.opts.tasks)
 			}

  			tag.complete = function complete(task) {
  				task.done = true
  				saveTasks()
 			}
 			tag.restore = function restore(task) {
 				task.done = false
 				saveTasks()
 			}
 			tag.remove = function remove(task) {
 				var index = tag.opts.tasks.indexOf(task)
 				tag.opts.tasks.splice(index, 1)
 				saveTasks()
 				tag.update()
 			}

 			tag.newTask = function(newTaskName) {
				var task = model.saveTask(topicId, newTaskName)
				tag.opts.tasks.push(task)
				tag.update()
 			}

 			tag.update()

 			tag.root.querySelector('.add-new-task').focus()
 		}
	})

	stateRouter.addState({
		name: 'app.topics.no-task',
		route: '',
 		template: 'no-task-selected'
	})
}
