var fs = require('fs')

module.exports = function(stateRouter, currentUser) {
	stateRouter.addState({
		name: 'login',
		route: '/login',
		template: fs.readFileSync('./login/login.html').toString(),
		activate: function(context) {
			var ractive = context.domApi

			ractive.on('login', function() {
				currentUser.name = ractive.get('username')
				stateRouter.go('app')
			})
		}
	})
}
