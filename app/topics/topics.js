var model = require('../../model.js')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
 		template: require('fs').readFileSync('app/topics/topics.html', { encoding: 'utf8' }),
 		activate: function(context) {
 			var ractive = context.domApi

 			function recalculateTasksLeftToDoInTopic(topicId) {
 				var tasks = model.getTasks(topicId)

 				var leftToDo =  tasks.reduce(function(toDo, task) {
 					return toDo + (task.done ? 0 : 1)
 				}, 0)

 				ractive.set('tasksUndone.' + topicId, leftToDo)
 			}

 			model.on('tasks saved', recalculateTasksLeftToDoInTopic)

 			ractive.set({
 				topics: model.getTopics(),
 				tasks: model.getTasks(),
 				tasksUndone: {}
 			})

 			ractive.data.topics.forEach(function(topic) {
 				recalculateTasksLeftToDoInTopic(topic.id)
 			})

 			context.on('destroy', function() {
 				model.removeListener('tasks saved', recalculateTasksLeftToDoInTopic)
 			})
 		}
	})

	require('./tasks/tasks')(stateRouter)
}
