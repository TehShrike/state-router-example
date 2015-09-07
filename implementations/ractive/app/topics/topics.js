var model = require('model.js')
var all = require('async-all')

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
		template: require('fs').readFileSync('implementations/ractive/app/topics/topics.html', { encoding: 'utf8' }),
		resolve: function(data, parameters, cb) {
			all({
				topics: model.getTopics,
				tasks: model.getTasks
			}, cb)
		},
		activate: function(context) {
			var ractive = context.domApi

			ractive.set({
				tasksUndone: {},
				addingTopic: false
			})

			function setFocusOnAddTopicEdit() {
				process.nextTick(function() {
					ractive.find('.new-topic-name').focus()
				})
			}

			function updateTopicsAndTasksLeftToDo(topicId) {
				model.getTasks(topicId, function(err, tasks) {
					var leftToDo =  tasks.reduce(function(toDo, task) {
						return toDo + (task.done ? 0 : 1)
					}, 0)

					ractive.set('tasksUndone.' + topicId, leftToDo)
				})
				model.getTopics(function(err, topics) {
					ractive.set('topics', topics)
				})
			}

			model.on('tasks saved', updateTopicsAndTasksLeftToDo)

			context.content.topics.forEach(function(topic) {
				updateTopicsAndTasksLeftToDo(topic.id)
			})

			ractive.on('add-topic', function() {
				var addingTopic = ractive.get('addingTopic')
				var newTopicName = ractive.get('newTopic')

				if (addingTopic && newTopicName) {
					var newTopic = model.addTopic(newTopicName)
					ractive.set('newTopic', '')
					updateTopicsAndTasksLeftToDo(newTopic.id)
					stateRouter.go('app.topics.tasks', {
						topicId: newTopic.id
					})
				} else if (!addingTopic) {
					setFocusOnAddTopicEdit()
				}

				ractive.set('addingTopic', !addingTopic)

				return false
			})

			context.on('destroy', function() {
				model.removeListener('tasks saved', updateTopicsAndTasksLeftToDo)
			})
		}
	})

	require('./tasks/tasks')(stateRouter)
}
