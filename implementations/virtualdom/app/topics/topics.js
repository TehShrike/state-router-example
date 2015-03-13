var model = require('model.js')
var template = require('./topics-template')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
		template: template,
		resolve: function(data, parameters, cb) {
			cb(null, {
				topics: model.getTopics()
			})
		},
		activate: function (context) {
			var domApi = context.domApi
			var update = domApi.update

			domApi.on('new topic', function (newTopicName) {
				var newTopicObject = model.addTopic(newTopicName)
				model.saveTopics()
				recalculateTasksLeftToDoInTopic(newTopicObject.id)
				stateRouter.go('app.topics.tasks', {
					topicId: newTopicObject.id
				})
			})

			model.on('tasks saved', recalculateAndUpdate)

			context.on('destroy', function () {
				model.removeListener('tasks saved', recalculateAndUpdate)
			})

			function recalculateTasksLeftToDoInTopic(topicId) {
				var tasks = model.getTasks(topicId)

				var sumOfNotDoneTasks = tasks.reduce(function(sum, task) {
					return sum + Number(!task.done)
				}, 0)

				var sharedState = domApi.sharedState
				sharedState.tasksUndone = sharedState.tasksUndone || {}
				sharedState.tasksUndone[topicId] = sumOfNotDoneTasks
			}

			function recalculateAndUpdate(topicId) {
				recalculateTasksLeftToDoInTopic(topicId)
				model.saveTopics()
				update(topicId)
			}

			model.getTopics().forEach(function(topic) {
				recalculateTasksLeftToDoInTopic(topic.id)
			})
		}
	})

	require('./tasks/tasks')(stateRouter)
}
