var nbsp = String.fromCharCode(160)

module.exports = function (h, resolveContext, helpers) {
	var topic = resolveContext.topic
	var tasks = resolveContext.tasks

	function setTaskDone(index, done) {
		return function () {
			tasks[index].done = done
			helpers.emitter.emit('saveTasks')
		}
	}

	function remove(taskIndex) {
		return function () {
			tasks.splice(taskIndex, 1)
			helpers.emitter.emit('saveTasks')
		}
	}

	function newTaskKeyup(e) {
		var newTaskName = e.srcElement.value
		if (e.keyCode === 13 && newTaskName) {
			e.srcElement.value = ''
			helpers.emitter.emit('newTask', newTaskName)
			setTimeout(function () {
				document.querySelector('.add-new-task').focus()
			}, 0)
		}
		helpers.killEvent(e)
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
						h('td.center-y' + (done ? '.text-muted' : ''), [
							h('span.center-y', [
								name
							].concat(
								done ? [nbsp, h('span.glyphicon.glyphicon-ok.text-success')] : null
							))
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
