var fs = require('fs')

module.exports = function(stateRouter, data) {
	stateRouter.addState({
		name: 'app',
		data: data,
		route: '/app',
		template: fs.readFileSync('./app/app.html').toString(),
		resolve: require('../require-username'),
		activate: function(context) {
			var ractive = context.domApi

			ractive.set('username', context.data.username)
		}
	})
}
