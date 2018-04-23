const component = require('./Login.html')
const model = require('model.js')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'login',
		route: '/login',
		template: component,
		activate: function({ domApi: svelte }) {
			svelte.on('login', function() {
				const username = svelte.get().username
				if (username) {
					model.saveCurrentUser(username)
					stateRouter.go('app')
				}
				return false
			})
		},
	})
}
