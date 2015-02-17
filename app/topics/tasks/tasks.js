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

 			function task(index) {
 				return ractive.data.tasks[index]
 			}

  			ractive.complete = function complete(taskIndex) {
				task(taskIndex).done = true
				model.saveTasks(topicId)
 			}
 			ractive.restore = function restore(taskIndex) {
 				task(taskIndex).done = false
 				model.saveTasks(topicId)
 			}
 			ractive.remove = function remove(taskIndex) {
 				ractive.data.tasks.splice(taskIndex, 1)
 				model.saveTasks()
 			}

 			ractive.set({
 				topic: model.getTopic(topicId),
 				tasks: model.getTasks(topicId)
 			})
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
