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
				model: model,
				stateRouter: stateRouter
			})
		}
	})

	require('./tasks/tasks')(stateRouter)
}
