var model = require('model.js')

var UUID_V4_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'

module.exports = function(stateRouter) {
	require('./no-task-selected.tag')
	require('./tasks.tag')

	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId(' + UUID_V4_REGEX + ')',
 		template: 'tasks',
 		activate: function(context) {
 			var tag = context.domApi
 			var topicId = context.parameters.topicId

 			function setTaskDone(index, done) {
 				tag.tasks[index].done = done
 				// ractive.set('tasks.' + index + '.done', done)
 				model.saveTasks(topicId)
 			}

  			tag.complete = function complete(taskIndex) {
  				setTaskDone(taskIndex, true)
 			}
 			tag.restore = function restore(taskIndex) {
 				setTaskDone(taskIndex, false)
 			}
 			tag.remove = function remove(taskIndex) {
 				tag.opts.tasks.splice(taskIndex, 1)
 				model.saveTasks(topicId)
 				tag.update()
 			}

 			tag.newTask = function(newTaskName) {
				createNewTask(newTaskName)
				tag.newTaskName = ''
				tag.update()
 			}

 			function createNewTask(taskName) {
 				model.saveTask(topicId, taskName)
 			}

 			tag.topic = model.getTopic(topicId)
 			tag.tasks = model.getTasks(topicId)
 			tag.update()

 			tag.root.querySelector('.add-new-task').focus()
 		}
	})

	stateRouter.addState({
		name: 'app.topics.no-task',
		route: '',
 		template: 'no-task-selected',
 		activate: function noop(context) {
 		}
	})
}
