var model = require('model.js')

var UUID_V4_REGEX = '[a-f0-9-]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId(' + UUID_V4_REGEX + ')',
		template: require('./tasks-template'),
		resolve: function(data, parameters, cb) {
			cb(null, {
				model: model,
				topicId: parameters.topicId
			})
		},
		activate: function(context) {
			var el = document.querySelector('.add-new-task')
			el && el.focus()
		}
	})

	stateRouter.addState({
		name: 'app.topics.no-task',
		template: require('./no-task-selected-template')
	})
}
