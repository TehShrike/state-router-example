module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.todo',
		route: '/todo',
 		template: require('fs').readFileSync('app/todo/todo.html', { encoding: 'utf8' }),
 		activate: function(context) {

 		}
	})
}
