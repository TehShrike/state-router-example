var model = require('model.js')

var UUID_V4_REGEX = '[a-f0-9-]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId(' + UUID_V4_REGEX + ')',
		template: require('./tasks-template'),
		resolve: function(data, parameters, cb) {
			var topicId = parameters.topicId
			cb(null, {
				topicId: topicId,
				topic: model.getTopic(topicId),
				tasks: model.getTasks(topicId)
			})
		},
		activate: function(context) {
			var domApi = context.domApi
			var el = domApi.el.querySelector('.add-new-task')
			el && el.focus()

			var resolveContent = context.content

			domApi.on('saveTasks', function () {
				model.saveTasks(resolveContent.topicId)
				domApi.update()
			})

			domApi.on('newTask', function (taskName) {
				model.saveTask(resolveContent.topicId, taskName)
				domApi.update()
			})
		}
	})

	stateRouter.addState({
		name: 'app.topics.no-task',
		template: require('./no-task-selected-template')
	})
}
