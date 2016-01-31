var model = require('model.js')
var fs = require('fs')
var all = require('async-all')
import { switchForNamedArgs, makeReducer } from 'action-helpers.js'

var UUID_V4_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'

var reducer = makeReducer({
	SET_NEW_TASK: (state, action) => {
		return {
			...state,
			newTaskName: action.payload
		}
	},
	ADD_NEW_TASK: (state, action) => {
		 var task = model.saveTask(state.topicId, state.newTaskName)

		return {
			...state,
			newTaskName: '',
			tasks: [
				...state.tasks,
				task
			]
		}
	},
	REMOVE_TASK: (state, action) => {
		return {
			...state,
			tasks: [
				...state.tasks.slice(0, action.index),
				...state.tasks.slice(action.index + 1)
			]
		}
	},
	SET_TASK_DONE: (state, action) => {
		var task = state.tasks[action.index]
		return {
			...state,
			tasks: [
				...state.tasks.slice(0, action.index), {
					...task,
					done: action.done
				},
				...state.tasks.slice(action.index + 1)
			]
		}
	}
})

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app.topics.tasks',
		route: '/:topicId(' + UUID_V4_REGEX + ')',
 		template: {
 			template: fs.readFileSync('implementations/ractive-redux/app/topics/tasks/tasks.html', { encoding: 'utf8' }),
 			twoway: false
 		},
 		data: {
 			reducer: reducer,
 			afterAction: function({ state, action }) {
 				switch (action.type) {
 					case 'ADD_NEW_TASK':
 					case 'REMOVE_TASK':
 					case 'SET_TASK_DONE':
 					model.saveTasks(state.topicId, state.tasks)
 				}
 			}
 		},
 		resolve: function(data, parameters, cb) {
 			all({
 				topic: model.getTopic.bind(null, parameters.topicId),
 				tasks: model.getTasks.bind(null, parameters.topicId),
 				topicId: parameters.topicId
 			}, cb)
 		},
 		activate: function(context) {
 			context.domApi.find('.add-new-task').focus()
 		}
	})

	stateRouter.addState({
		name: 'app.topics.no-task',
		route: '',
 		template: fs.readFileSync('implementations/ractive-redux/app/topics/tasks/no-task-selected.html', { encoding: 'utf8' })
	})
}
