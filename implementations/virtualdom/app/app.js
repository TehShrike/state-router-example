require('array.prototype.findindex')
var model = require('model.js')
var template = require('./app-template.js')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		defaultChild: 'topics',
		template: template,
		resolve: function resolve(data, parameters, cb) {
			if (!model.getCurrentUser().name) {
				cb.redirect('login')
			} else {
				cb(null, {
					model: model,
					stateRouter: stateRouter
				})
			}
		}
	})

	require('./about/about')(stateRouter)
	require('./topics/topics')(stateRouter)
}
