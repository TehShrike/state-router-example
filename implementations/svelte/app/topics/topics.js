const component = require(`./Topics.html`)
const model = require(`model.js`)
const all = require(`async-all`)

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: `app.topics`,
		route: `/topics`,
		defaultChild: `no-task`,
		template: component,
		resolve(data, parameters, cb) {
			all({
				topics: model.getTopics,
				tasks: model.getTasks,
			}, cb)
		},
		activate(context) {
			const svelte = context.domApi

			function setFocusOnAddTopicEdit() {
				process.nextTick(() => {
					svelte.mountedToTarget.querySelector(`.new-topic-name`).focus()
				})
			}

			function recalculateTasksLeftToDoInTopic(topicId) {
				model.getTasks(topicId, (err, tasks) => {
					const leftToDo = tasks.reduce((toDo, task) => toDo + (task.done ? 0 : 1), 0)

					svelte.set({
						tasksUndone: Object.assign({}, svelte.get().tasksUndone, {
							[topicId]: leftToDo,
						}),
					})
				})
			}

			model.on(`tasks saved`, recalculateTasksLeftToDoInTopic)

			context.content.topics.forEach(topic => {
				recalculateTasksLeftToDoInTopic(topic.id)
			})

			svelte.on(`add-topic`, () => {
				const addingTopic = svelte.get().addingTopic
				const newTopicName = svelte.get().newTopic

				if (addingTopic && newTopicName) {
					const newTopic = model.addTopic(newTopicName)

					svelte.set({
						topics: svelte.get().topics.concat(newTopic),
						newTopic: ``,
					})

					recalculateTasksLeftToDoInTopic(newTopic.id)
					stateRouter.go(`app.topics.tasks`, {
						topicId: newTopic.id,
					})
				} else if (!addingTopic) {
					setFocusOnAddTopicEdit()
				}

				svelte.set({
					addingTopic: !addingTopic,
				})

				return false
			})

			context.on(`destroy`, () => {
				model.removeListener(`tasks saved`, recalculateTasksLeftToDoInTopic)
			})
		},
	})

	require(`./tasks/tasks`)(stateRouter)
}
