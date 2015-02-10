module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.about',
		route: '/about',
 		template: require('fs').readFileSync('app/about/about.html', { encoding: 'utf8' }),
 		activate: function noop() {}
	})
}
