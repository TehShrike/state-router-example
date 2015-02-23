require('array.prototype.findindex')
var model = require('model.js')

require('./app.tag')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		// defaultChild: 'topics',
		template: 'app',
		resolve: function resolve(data, parameters, cb) {
			if (!model.getCurrentUser().name) {
				cb.redirect('login')
			} else {
				cb(null, {
					currentUser: model.getCurrentUser()
				})
			}
		},
		activate: function(context) {
			var tag = context.domApi

			tag.on('logout', function() {
				model.saveCurrentUser(null)
				stateRouter.go('login')
			})
		}
	})

	// require('./about/about')(stateRouter)
	// require('./topics/topics')(stateRouter)
}
