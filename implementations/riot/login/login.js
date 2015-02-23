var model = require('model.js')

require('./login.tag')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'login',
		route: '/login',
		template: 'login',
		activate: function(context) {
			var tag = context.domApi

			tag.opts.login = function login(username) {
				if (username) {
					model.saveCurrentUser(username)
					stateRouter.go('app')
				}
			}
		}
	})
}
