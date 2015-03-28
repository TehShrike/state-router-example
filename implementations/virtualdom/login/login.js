var fs = require('fs')
var model = require('model.js')
var template = require('./login-template')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'login',
		route: '/login',
		template: template,
		resolve: function resolve(data, parameters, cb) {
			cb(null, {
				model: model,
				stateRouter: stateRouter
			})
		},
		activate: function activate(context) {
			context.domApi.emitter.on('login', function (username) {
				model.saveCurrentUser(username)
				stateRouter.go('app')
			})
		}
	})
}
