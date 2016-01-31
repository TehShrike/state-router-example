var fs = require('fs')
var model = require('model.js')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		defaultChild: 'topics',
		template: fs.readFileSync('implementations/ractive-redux/app/app.html').toString(),
		resolve: function resolve(data, parameters, cb) {
			var currentUser = model.getCurrentUser()

			if (currentUser.name) {
				cb(null, {
					currentUser
				})
			} else {
				cb.redirect('login')
			}
		},
		activate: function(context) {
			var ractive = context.domApi

			ractive.on('logout', function() {
				model.saveCurrentUser(null)
				stateRouter.go('login')
			})
		}
	})

	require('./about/about')(stateRouter)
	require('./topics/topics')(stateRouter)
}
