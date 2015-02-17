var model = require('../../model.js')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
 		template: require('fs').readFileSync('app/topics/topics.html', { encoding: 'utf8' }),
 		activate: function(context) {
 			var ractive = context.domApi

 			ractive.set({
 				topics: model.getTopics(),
 				tasks: model.getTasks()
 			})

 		}
	})

	require('./tasks/tasks')(stateRouter)
}
