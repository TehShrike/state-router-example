var model = require('model.js')
var template = require('./topics-template')
var activate = require('./topics-activate')
var tasksState = require('./tasks/tasks')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
		template: template,
		resolve: function resolve(data, parameters, cb) {
			model.getTopics(function(err, topics) {
				cb(err, {
					topics: topics
				})
			})
		},
		activate: activate.bind(null, stateRouter)
	})

	tasksState(stateRouter)
}
