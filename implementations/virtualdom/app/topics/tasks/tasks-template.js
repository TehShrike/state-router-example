module.exports = function (h, context) {
	var model = context.model
	var topicId = context.topicId

	function setTaskDone(index, done) {
		ractive.set('tasks.' + index + '.done', done)
		model.saveTasks(topicId)
	}

	function complete(taskIndex) {
		setTaskDone(taskIndex, true)
	}
	function restore(taskIndex) {
		setTaskDone(taskIndex, false)
	}
	function remove(taskIndex) {
		ractive.data.tasks.splice(taskIndex, 1)
		model.saveTasks(topicId)
	}

	function newTaskKeyup(e) { // PRETTY SURE THIS WON'T WORK YET
		var newTaskName = e.key //figure this out
		if (e.original.keyCode === 13 && newTaskName) {
			createNewTask(newTaskName)
			ractive.set('newTaskName', '')
		}
	}

	function createNewTask(taskName) {
		model.saveTask(topicId, taskName)
	}


	return h('div', [
		h('h1', [ '{{topic.name}}' ]),

		h('table.table.table-striped', [
			h('thead', [
				h('tr', [
					h('th', 'Task name'),
					h('th', {
						'style': 'width: 100px'
					}, 'Complete'),
					h('th', {
						'style': 'width: 87px'
					}, 'Remove')
				])
			]),
			h('tbody',
				context.tasks.map(function (task, i) {
					var done = task.done
					var name = task.name
					h('tr', [
						h('td.center-y' + done ? '.text-muted' : '', [
							h('span.center-y', [
								name, done ? h('span.glyphicon.glyphicon-ok.text-success') : null
							])
						]),
						h('td', done ?
							h('button.btn.btn-primary.full-width', {
								'on-click': restore(i)
							}, 'Restore')
						:
							h('button.btn.btn-success.full-width', {
								'on-click': complete(i)
							}, 'Complete')
						),
						h('td', [
							h('button.btn.btn-danger.full-width', {
								'on-click': remove(i)
							}, 'Remove')
						])
					])
				}),

				h('tr', [
					h('td', [
						h('input.form-control.add-new-task', {
							'type': 'text',
							'placeholder': 'New task',
							'value': '{{newTaskName}}',
							'on-keyup': newTaskKeyup
						})
					])
				])
			)
		])
	])
}
