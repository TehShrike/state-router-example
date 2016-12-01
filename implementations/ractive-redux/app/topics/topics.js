var model = require('model.js')
var all = require('async-all')
import { switchForNamedArgs, makeReducer } from 'action-helpers.js'

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
	var reducer = makeReducer({
		START_ADDING_TOPIC: (state) => {
			return {
				...state,
				addingTopic: true
			}
		},
		ADD_TOPIC: (state) => {
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
			reducer: reducer,
			afterAction: switchForNamedArgs({
				START_ADDING_TOPIC: ({ domApi: ractive }) => ractive.find('.new-topic-name').focus(),
				ADD_TOPIC: ({ state, dispatch }) => state.topics.forEach(
						topicId => recalculateTasksLeftToDoInTopic(topicId, dispatch))
			})
		},
		activate: function(context) {
			function dispatch(action) {
				context.domApi.fire('dispatch', action.type, action)
			}

			var recalculateTasks = topicId => recalculateTasksLeftToDoInTopic(topicId, dispatch)

			context.content.topics.forEach(topic => recalculateTasks(topic.id))

			model.on('tasks saved', recalculateTasks)
			context.on('destroy', () => model.removeListener('tasks saved', recalculateTasks))
		}
	})

	require('./tasks/tasks')(stateRouter)
}
