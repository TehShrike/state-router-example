var fs = require('fs')

module.exports = function(stateRouter, data) {
	stateRouter.addState({
		name: 'login',
		data: data,
		route: '/login',
		template: fs.readFileSync('./login/login.html').toString(),
		activate: function(context) {
			var ractive = context.domApi

			ractive.on('login', function() {
				context.data.username = ractive.get('username')
				stateRouter.go('app')
			})
		}
	})
}
