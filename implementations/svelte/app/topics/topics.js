const component = require(`./Topics.svelte`)
const model = require(`model.js`)
const { value, computed } = require(`warg`)
const mapObject = require(`map-obj`)

const makeUndoneTasksComputed = tasks => computed({
	tasks,
}, ({ tasks }) =>
	mapObject(tasks, (taskId, tasks) => [ taskId, tasks.reduce((toDo, task) => toDo + (task.done ? 0 : 1), 0) ])
)

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: `app.topics`,
		route: `/topics`,
		defaultChild: `no-task`,
		template: component,
		resolve(data, parameters, cb) {
			model.getTopics((err, topics) => {
				const tasksStore = value({})
				const topicsStore = value(topics)
				cb(null, {
					topicsStore,
					tasksStore,
					tasksUndoneStore: makeUndoneTasksComputed(tasksStore),
				})
			})
		},
		activate(context) {
			const svelte = context.domApi
			const { tasksStore, topicsStore } = context.content

			const updateTasks = topicId => {
				model.getTasks(topicId, (err, tasks) => {
					tasksStore.set(
						Object.assign({}, tasksStore.get(), {
							[topicId]: tasks,
						})
					)
				})
			}

			topicsStore.get().forEach(({ id: topicId }) => updateTasks(topicId))

			model.on(`tasks saved`, updateTasks)

			svelte.$on(`add-topic`, ({ detail: newTopicName }) => {
				const newTopic = model.addTopic(newTopicName)

				topicsStore.set([ ...topicsStore.get(), newTopic ])
				updateTasks(newTopic.id)

				stateRouter.go(`app.topics.tasks`, {
					topicId: newTopic.id,
				})

				return false
			})

			context.on(`destroy`, () => {
				model.removeListener(`tasks saved`, updateTasks)
			})
		},
	})

	require(`./tasks/tasks`)(stateRouter)
}
