var model = require('../model.js')

module.exports = function(stateRouter, currentUser) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
 		template: require('fs').readFileSync('app/topics/topics.html', { encoding: 'utf8' }),
 		activate: function(context) {
 			var ractive = context.domApi

 			ractive.set('topics', model.getTopics())

 			function handleStateChange(toState, toParameters) {
 				ractive.set('currentTopicId', toParameters.topicId)
 			}

 			stateRouter.on('stateChangeEnd', handleStateChange)

 			context.on('destroy', function() {
 				stateRouter.removeListeners('stateChangeEnd', handleStateChange)
 			})
 		}
	})

	require('./tasks/tasks')(stateRouter, currentUser)
}
