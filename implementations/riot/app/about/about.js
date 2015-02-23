require('./about.tag')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.about',
		route: '/about',
 		template: 'about',
 		activate: function noop() {}
	})
}
