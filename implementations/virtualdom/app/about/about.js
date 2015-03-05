module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.about',
		route: '/about',
		template: require('./about-template')
	})
}
