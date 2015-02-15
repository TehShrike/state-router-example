var model = require('../../model.js')
var fs = require('fs')

module.exports = function(stateRouter, currentUser) {
	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})',
 		template: fs.readFileSync('app/topics/tasks/tasks.html', { encoding: 'utf8' }),
 		activate: function(context) {
 			var ractive = context.domApi
 			var topicId = context.parameters.topicId

 			ractive.set('topic', model.getTopic(topicId))
 			ractive.set('tasks', model.getTasks(topicId))
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
