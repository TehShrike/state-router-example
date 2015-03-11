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
		},
		activate: function (context) {
			console.log('topics activate')
			var update = context.domApi.update

			model.on('tasks saved', update)

			context.on('destroy', function () {
				model.removeListener('tasks saved', update)
			})
		}
	})

	require('./tasks/tasks')(stateRouter)
}
