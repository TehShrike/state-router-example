var model = require('../../../model.js')
var fs = require('fs')

var UUID_V4_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId(' + UUID_V4_REGEX + ')',
 		template: fs.readFileSync('app/topics/tasks/tasks.html', { encoding: 'utf8' }),
 		activate: function(context) {
 			var ractive = context.domApi
 			var topicId = context.parameters.topicId

 			function setTaskDone(index, done) {
 				ractive.set('tasks.' + index + '.done', done)
 				model.saveTasks(topicId)
 			}

  			ractive.complete = function complete(taskIndex) {
  				setTaskDone(taskIndex, true)
 			}
 			ractive.restore = function restore(taskIndex) {
 				setTaskDone(taskIndex, false)
 			}
 			ractive.remove = function remove(taskIndex) {
 				ractive.data.tasks.splice(taskIndex, 1)
 				model.saveTasks(topicId)
 			}

 			ractive.on('newTaskKeyup', function(e) {
 				var newTaskName = ractive.get('newTaskName')
 				if (e.original.keyCode === 13 && newTaskName) {
 					createNewTask(newTaskName)
 					ractive.set('newTaskName', '')
 				}
 			})

 			function createNewTask(taskName) {
 				model.saveTask(topicId, taskName)
 			}

 			ractive.set({
 				topic: model.getTopic(topicId),
 				tasks: model.getTasks(topicId)
 			})

 			ractive.find('.add-new-task').focus()
 		}
	})

	stateRouter.addState({
		name: 'app.topics.no-task',
		route: '',
 		template: fs.readFileSync('app/topics/tasks/no-task-selected.html', { encoding: 'utf8' }),
 		activate: function(context) {
 			var ractive = context.domApi

 			ractive.set('topics', model.getTopics())
 		}
	})
}
