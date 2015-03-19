var model = require('model.js')

function activate(context) {
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
	//domApi.on('update', recalculateAndUpdate)
	model.on('tasks saved', recalculateAndUpdate)

	context.on('destroy', function () {
		//domApi.removeListener('update', recalculateAndUpdate)
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
		console.log('recalculating ' + topicId.slice(-3))
		recalculateTasksLeftToDoInTopic(topicId)
		model.saveTopics()
		update(topicId)
	}

	model.getTopics().forEach(function(topic) {
		recalculateTasksLeftToDoInTopic(topic.id)
	})
}

module.exports = activate
