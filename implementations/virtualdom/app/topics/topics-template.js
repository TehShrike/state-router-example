module.exports = function (h, context) {
	var model = context.model
	var tasksUndone = {}
	var addingTopic = false
	var newTopic = ''

	function setFocusOnAddTopicEdit() {
		process.nextTick(function() {
			document.querySelector('.new-topic-name').focus()
		})
	}

	function recalculateTasksLeftToDoInTopic(topicId) {
		var tasks = model.getTasks(topicId)

		var sumOfNotDoneTasks = tasks.reduce(function(sum, task) {
			return sum + Number(!task.done)
		}, 0)

		tasksUndone[topicId] = sumOfNotDoneTasks
	}

	model.on('tasks saved', recalculateTasksLeftToDoInTopic)

	context.topics.forEach(function(topic) {
		recalculateTasksLeftToDoInTopic(topic.id)
	})

	function addTopic() {
		if (addingTopic && newTopic) {
			var newTopicObject = model.addTopic(newTopic)
			newTopic = ''
			model.saveTopics()
			recalculateTasksLeftToDoInTopic(newTopicObject.id)
			stateRouter.go('app.topics.tasks', {
				topicId: newTopicObject.id
			})
		} else if (!addingTopic) {
			setFocusOnAddTopicEdit()
		}

		addingTopic = !addingTopic

		return false
	}

	return h('div.container',
		h('div.row',
			h('div.col-sm-4',
				h('div.list-group',
					context.topics.map(function (topic) {
						h('a.list-group-item', {
								href: context.makePath('app.topics.tasks', { topicId: topic.id }),
								decorator: "active:'app.topics.tasks','topicId:{{id}}'"
							},
							topic.name,
							h('span.badge', topic.tasksUndone[id] )
						)
					})
				),
				h('form', { action: "", 'on-submit': addTopic },
					h('div.table',
						h('div.table-row-group',
							h('div.table-row',
								h('div.table-cell',
									h('input', {
										type: "text",
										class: "new-topic-name form-control" +
											addingTopic ? "hidden" : "",
										placeholder: "Topic name",
										value: newTopic
									})
								),
								h('div', {
										class: "table-cell",
										style: "width: 60px; vertical-align: top"
									},
									h('button', {
											type: "submit",
											class: "btn btn-default pull-right"
										}, "Add"
									)
								)
							)
						)
					)
				)
			),
			h('div.col-sm-8',
				h('ui-view')
			)
		)
	)
}
