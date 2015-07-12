module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.about',
		route: '/about',
 		template: require('fs').readFileSync('implementations/knockout/app/about/about.html', 'utf8'),
 		activate: function noop() {}
	})
};
