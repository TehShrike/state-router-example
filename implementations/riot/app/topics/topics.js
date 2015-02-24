var model = require('model.js')

require('./topics.tag')

module.exports = function(stateRouter) {

	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
 		template: 'topics',
 		activate: function(context) {
 			var tag = context.domApi
 			var topics = model.getTopics()

 			tag.topics = topics
 			tag.tasks = model.getTasks()
 			tag.tasksUndone = {}
 			tag.addingTopic = false
 			tag.update()

 			tag.setFocusOnAddTopicEdit = function() {
 				process.nextTick(function() {
 					tag.root.querySelector('.new-topic-name').focus()
 				})
 			}

 			function recalculateTasksLeftToDoInTopic(topicId) {
 				var tasks = model.getTasks(topicId)

 				var leftToDo =  tasks.reduce(function(toDo, task) {
 					return toDo + (task.done ? 0 : 1)
 				}, 0)

 				tag.tasksUndone[topicId] = leftToDo
 				tag.update()
 			}

 			model.on('tasks saved', recalculateTasksLeftToDoInTopic)

 			topics.forEach(function(topic) {
 				recalculateTasksLeftToDoInTopic(topic.id)
 			})

 			tag.addTopic = function addTopic(newTopicName) {
				var newTopic = model.addTopic(newTopicName)
				model.saveTopics()
				recalculateTasksLeftToDoInTopic(newTopic.id)
				stateRouter.go('app.topics.tasks', {
					topicId: newTopic.id
				})
 			}

 			context.on('destroy', function() {
 				model.removeListener('tasks saved', recalculateTasksLeftToDoInTopic)
 			})
 		}
	})

	require('./tasks/tasks')(stateRouter)
}
