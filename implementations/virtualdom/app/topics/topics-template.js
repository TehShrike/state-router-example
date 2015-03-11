var addingTopic = false

module.exports = function (h, context, helpers) {
	var model = context.model
	var stateRouter = context.stateRouter
	var tasksUndone = {}

	function setFocusOnAddTopicEdit() {
		process.nextTick(function() {
			document.getElementById('new-topic-name').focus()
		})
	}

	function recalculateTasksLeftToDoInTopic(topicId) {
		var tasks = model.getTasks(topicId)

		var sumOfNotDoneTasks = tasks.reduce(function(sum, task) {
			return sum + Number(!task.done)
		}, 0)

		tasksUndone[topicId] = sumOfNotDoneTasks
	}

	model.getTopics().forEach(function(topic) {
		recalculateTasksLeftToDoInTopic(topic.id)
	})

	function addTopic(e) {
		console.log('e:', e)
		var inputEl = e.target.querySelector('input')
		var newTopic = inputEl.value

		if (addingTopic && newTopic) {
			var newTopicObject = model.addTopic(newTopic)
			inputEl.value = ''
			model.saveTopics()
			recalculateTasksLeftToDoInTopic(newTopicObject.id)
			stateRouter.go('app.topics.tasks', {
				topicId: newTopicObject.id
			})
		} else if (!addingTopic) {
			setFocusOnAddTopicEdit()
		}
		addingTopic = !addingTopic

		helpers.killEvent(e)
		helpers.update()
	}

	return h('div.container#topics-template', [
		h('div.row', [
			h('div.col-sm-4', [
				h('div.list-group',
					model.getTopics().map(function (topic) {
						return h('a.list-group-item', {
								href: helpers.makePath('app.topics.tasks', { topicId: topic.id }),
								class: helpers.active('app.topics.tasks', { topicId: topic.id })
							}, [
								topic.name,
								h('span.badge', tasksUndone[topic.id].toString() ) // was topics.tasksUndone[id]
							]
						)
					})
				),
				h('form', { action: "", onsubmit: addTopic }, [
					h('div.table', [
						h('div.table-row-group', [
							h('div.table-row', [
								h('div.table-cell', [
									h('input', {
										type: "text",
										id: 'new-topic-name',
										class: "form-control" +
											addingTopic ? " hidden" : "",
										placeholder: "Topic name"
									})
								]),
								h('div', {
										class: "table-cell",
										style: "width: 60px; vertical-align: top"
									},
									h('button', {
										type: "submit",
										class: "btn btn-default pull-right"
									}, "Add" )
								)
							])
						])
					])
				])
			]),
			h('div.col-sm-8', [
				h('ui-view')
			])
		])
	])
}
