var fs = require('fs')
var model = require('model.js')
var template = require('./login-template')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'login',
		route: '/login',
		template: template
	})
}
