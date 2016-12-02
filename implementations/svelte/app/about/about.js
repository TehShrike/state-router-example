const component = require('./about.html')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.about',
		route: '/about',
 		template: component
	})
}
