const component = require('./About.html')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.about',
		route: '/about',
		template: component,
	})
}
