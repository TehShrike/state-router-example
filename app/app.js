require('array.prototype.findindex')
var fs = require('fs')

module.exports = function(stateRouter, currentUser) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		defaultChild: 'topics',
		template: fs.readFileSync('./app/app.html').toString(),
		resolve: function resolve(data, parameters, cb) {
			if (!currentUser.name) {
				cb.redirect('login')
			} else {
				cb(null, {})
			}
		},
		activate: function(context) {
			var ractive = context.domApi

			ractive.set('username', currentUser.name)

			ractive.on('logout', function() {
				currentUser.name = null
				stateRouter.go('login')
			})
		}
	})

	require('./about/about')(stateRouter, currentUser)
	require('./topics/topics')(stateRouter, currentUser)
}
