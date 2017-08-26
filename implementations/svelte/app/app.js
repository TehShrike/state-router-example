const component = require('./App.html')
const model = require('model.js')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		defaultChild: 'topics',
		template: component,
		resolve: function resolve(data, parameters, cb) {
			const currentUser = model.getCurrentUser()

			if (currentUser.name) {
				cb(null, {
					currentUser,
				})
			} else {
				cb.redirect('login')
			}
		},
		activate: function({ domApi: svelte }) {
			svelte.on('logout', function() {
				model.saveCurrentUser(null)
				stateRouter.go('login')
			})
		},
	})

	require('./about/about')(stateRouter)
	require('./topics/topics')(stateRouter)
}
