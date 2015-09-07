var model = require('model.js')
var each = require('async-each')

function activate(stateRouter, context) {
	var domApi = context.domApi

	domApi.emitter.on('new topic', function (newTopicName) {
		var newTopicObject = model.addTopic(newTopicName)
		domApi.sharedState.topics.push(newTopicObject)
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

	function recalculateTasksLeftToDoInTopic(topicId, cb) {
		model.getTasks(topicId, function(err, tasks) {
			var sumOfNotDoneTasks = tasks.filter(function(task) {
				return !task.done
			}).length

			var sharedState = domApi.sharedState
			sharedState.tasksUndone = sharedState.tasksUndone || {}
			sharedState.tasksUndone[topicId] = sumOfNotDoneTasks
			cb && cb()
		})
	}

	function recalculateAndUpdate(topicId) {
		recalculateTasksLeftToDoInTopic(topicId, function() {
			domApi.update(topicId)
		})
	}

	domApi.sharedState.topics.forEach(function(topic) {
		recalculateTasksLeftToDoInTopic(topic.id)
	})

	var topicIds = domApi.sharedState.topics.map(function(topic) {
		return topic.id
	})
	each(topicIds, recalculateTasksLeftToDoInTopic, function() {
		domApi.update()
	})
}

module.exports = activate
