const component = require(`./Tasks.html`)
const model = require(`model.js`)
const all = require(`async-all`)

const UUID_V4_REGEX = `[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}`

module.exports = function(stateRouter) {
	stateRouter.addState({
		name: `app.topics.tasks`,
		route: `/:topicId(` + UUID_V4_REGEX + `)`,
		template: {
			component,
			options: {
				methods: {
					setTaskDone(index, done) {
						const { topicId, tasks } = this.get()

						// This should be done inside the component
						tasks[index].done = done
						this.set({ tasks })

						// this should be done via an event
						model.saveTasks(topicId, tasks)
					},
				},
			},
		},
		resolve(data, parameters, cb) {
			all({
				topic: model.getTopic.bind(null, parameters.topicId),
				tasks: model.getTasks.bind(null, parameters.topicId),
				topicId: parameters.topicId,
			}, cb)
		},
		activate(context) {
			const svelte = context.domApi
			const topicId = context.parameters.topicId

			svelte.on(`newTaskKeyup`, e => {
				const { newTaskName } = svelte.get()
				if (e.keyCode === 13 && newTaskName) {
					createNewTask(newTaskName)
					svelte.set({
						newTaskName: ``,
					})
				}
			})

			svelte.on(`remove`, function(taskIndex) {
				const topicId = this.get().topicId
				const tasksWithIndexElementRemoved = this.get().tasks.slice()

				tasksWithIndexElementRemoved.splice(taskIndex, 1)

				this.set({
					tasks: tasksWithIndexElementRemoved,
				})

				model.saveTasks(topicId, tasksWithIndexElementRemoved)
			})

			function createNewTask(taskName) {
				const task = model.saveTask(topicId, taskName)
				const newTasks = svelte.get().tasks.concat(task)
				svelte.set({
					tasks: newTasks,
				})
			}

			svelte.mountedToTarget.querySelector(`.add-new-task`).focus()
		},
	})

	stateRouter.addState({
		name: `app.topics.no-task`,
		route: ``,
		template: require(`./NoTaskSelected.html`),
	})
}
