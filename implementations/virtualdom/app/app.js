require('array.prototype.findindex')
var model = require('model.js')
var aboutState = require('./about/about')
var topicsState = require('./topics/topics')
var template = require('./app-template.js')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		defaultChild: 'topics',
		template: template,
		resolve: function resolve(data, parameters, cb) {
			var username = model.getCurrentUser().name
			if (!username) {
				cb.redirect('login')
			} else {
				cb(null, { username: username })
			}
		},
		activate: function activate(context) {
			context.domApi.emitter.on('save', function () {
				model.saveCurrentUser(null)
			})
		}
	})

	aboutState(stateRouter)
	topicsState(stateRouter)
}
