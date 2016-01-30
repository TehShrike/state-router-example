var model = require('model.js')
var all = require('async-all')

function makeReducer(reducerFunctions) {
	return function(state, action) {
		if (reducerFunctions[action.type]) {
			return reducerFunctions[action.type](state, action)
		} else {
			return state
		}
	}
}

function recalculateTasksLeftToDoInTopic(topicId, dispatch) {
	model.getTasks(topicId, function(err, tasks) {
		var leftToDo = tasks.reduce(function(toDo, task) {
			return toDo + (task.done ? 0 : 1)
		}, 0)

		dispatch({
			type: 'UPDATE_UNDONE_TASKS',
			topicId,
			leftToDo
		})
	})
}

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
		template: {
			template: require('fs').readFileSync('implementations/ractive-redux/app/topics/topics.html', { encoding: 'utf8' }),
			toway: false
		},
		resolve: function(data, parameters, cb) {
			all({
				topics: model.getTopics,
				tasks: model.getTasks
			}, cb)
		},
		data: {
			initialState: {
				tasksUndone: {},
				addingTopic: false
			},
			reducer: makeReducer({
				START_ADDING_TOPIC: (state, action) => {
					return {
						...state,
						addingTopic: true
					}
				},
				ADD_TOPIC: (state, action) => {
					var newTopicName = state.newTopic

					if (newTopicName) {
						var newTopic = model.addTopic(newTopicName)

						stateRouter.go('app.topics.tasks', {
							topicId: newTopic.id
						})

						return {
							...state,
							newTopic: '',
							addingTopic: false,
							topics: [
								...state.topics,
								newTopic
							]
						}
					} else {
						return {
							...state,
							addingTopic: false
						}
					}
				},
				SET_NEW_TOPIC: (state, action) => {
					return {
						...state,
						newTopic: action.payload
					}
				},
				UPDATE_UNDONE_TASKS: (state, action) => {
					return {
						...state,
						tasksUndone: {
							...state.tasksUndone,
							[action.topicId]: action.leftToDo
						}
					}
				}
			})
		},
		activate: function(context) {
			var ractive = context.domApi
			var dispatch = ractive.store.dispatch

			ractive.on('dispatch', function(action) {
				if (action === 'START_ADDING_TOPIC') {
					ractive.find('.new-topic-name').focus()
				}
			})

			var recalculateTasks = topicId => recalculateTasksLeftToDoInTopic(topicId, dispatch)

			ractive.observe('topics', (newValue, oldValue) => {
				if (newValue !== oldValue) {
					newValue.forEach(recalculateTasks)
				}
			})

			model.on('tasks saved', recalculateTasks)

			context.content.topics.forEach(function(topic) {
				recalculateTasks(topic.id)
			})

			context.on('destroy', function() {
				model.removeListener('tasks saved', recalculateTasks)
			})
		}
	})

	require('./tasks/tasks')(stateRouter)
}
