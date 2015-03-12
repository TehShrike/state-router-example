module.exports = function (h, context, helpers) {
	var model = context.model
	var topicId = context.topicId
	var topic = model.getTopic(topicId)
	var tasks = model.getTasks(topicId)

	function setTaskDone(index, done) {
		return function () {
			tasks[index].done = done
			model.saveTasks(topicId)
			helpers.update()
		}
	}

	function remove(taskIndex) {
		return function () {
			tasks.splice(taskIndex, 1)
			model.saveTasks(topicId)
			helpers.update()
		}
	}

	function newTaskKeyup(e) {
		var newTaskName = e.srcElement.value
		if (e.keyCode === 13 && newTaskName) {
			e.srcElement.value = ''
			createNewTask(newTaskName)
			helpers.update()
			setTimeout(function () {
				document.querySelector('.add-new-task').focus()
			}, 0)
		}
		helpers.killEvent(e)
	}

	function createNewTask(taskName) {
		model.saveTask(topicId, taskName)
	}

	return h('div', [
		h('h1', [ topic.name ]),

		h('table.table.table-striped', [
			h('thead', [
				h('tr', [
					h('th', 'Task name'),
					h('th', { style: { width: '100px' } }, 'Complete'),
					h('th', { style: { width: '87px' } }, 'Remove')
				])
			]),
			h('tbody',
				tasks.map(function (task, i) {
					var done = task.done
					var name = task.name
					return h('tr', [
						h('td.center-y' + done ? '.text-muted' : '', [
							h('span.center-y', [
								name, (done ? h('span.glyphicon.glyphicon-ok.text-success') : null)
							])
						]),
						h('td',
							h('button.full-width.btn.btn-' + (done ? 'primary' : 'success'), {
								onclick: setTaskDone(i, !done)
							}, done ? 'Restore' : 'Complete')
						),
						h('td', [
							h('button.full-width.btn.btn-danger', {
								onclick: remove(i)
							}, 'Remove')
						])
					])
				}).concat(
					h('tr', [
						h('td', [
							h('input.form-control.add-new-task', {
								'type': 'text',
								'placeholder': 'New task',
								onkeyup: newTaskKeyup
							})
						])
					])
				)
			)
		])
	])
}
