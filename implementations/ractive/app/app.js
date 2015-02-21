require('array.prototype.findindex')
var fs = require('fs')
var model = require('model.js')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		defaultChild: 'topics',
		template: fs.readFileSync('implementations/ractive/app/app.html').toString(),
		resolve: function resolve(data, parameters, cb) {
			if (!model.getCurrentUser().name) {
				cb.redirect('login')
			} else {
				cb(null, {})
			}
		},
		activate: function(context) {
			var ractive = context.domApi

			ractive.set('currentUser', model.getCurrentUser())

			ractive.on('logout', function() {
				model.saveCurrentUser(null)
				stateRouter.go('login')
			})
		}
	})

	require('./about/about')(stateRouter)
	require('./topics/topics')(stateRouter)
}
