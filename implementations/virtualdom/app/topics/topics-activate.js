var model = require('model.js')

function activate(stateRouter, context) {
	var domApi = context.domApi
	var topicId = context.parameters.topicId

	domApi.emitter.on('new topic', function (newTopicName) {
		var newTopicObject = model.addTopic(newTopicName)
		model.saveTopics()
		recalculateTasksLeftToDoInTopic(newTopicObject.id)
		stateRouter.go('app.topics.tasks', {
			topicId: newTopicObject.id
		})
	})

	domApi.emitter.on('refresh', domApi.update)

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
		domApi.update(topicId)
	}

	model.getTopics().forEach(function(topic) {
		recalculateTasksLeftToDoInTopic(topic.id)
	})
}

module.exports = activate
