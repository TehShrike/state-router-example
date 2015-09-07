var addingTopic = false

module.exports = function (h, resolveContext, helpers) {
	var topics = resolveContext.topics
	var tasksUndone = resolveContext.tasksUndone || {}
	//var addingTopic = resolveContext.addingTopic

	function addTopic(e) {
		var inputEl = e.srcElement.querySelector('input')
		var newTopic = inputEl && inputEl.value

		if (addingTopic && newTopic) {
			helpers.emitter.emit('new topic', newTopic)
			inputEl.value = ''
		} else if (!addingTopic) {
			setTimeout(function () {
				inputEl.focus()
			}, 0)
		}
		addingTopic = !addingTopic

		helpers.killEvent(e)
		helpers.emitter.emit('refresh')
	}

	return h('div.container', [
		h('div.row', [
			h('div.col-sm-4', [
				h('div.list-group',
					topics.map(function (topic) {
						var undone = tasksUndone[topic.id]
						var active =  helpers.active('app.topics.tasks', { topicId: topic.id })
						return h('a.list-group-item.' + active, {
								href: helpers.makePath('app.topics.tasks', { topicId: topic.id })
							}, [
								topic.name,
								h('span.badge', undone ? undone.toString() : '0' )
							]
						)
					})
				),
				h('form', { action: '', onsubmit: addTopic }, [
					h('div.table', [
						h('div.table-row-group', [
							h('div.table-row', [
								h('div.table-cell', [
									h('input.form-control' + (addingTopic ? '' : '.hidden'), {
										type: 'text',
										id: 'new-topic-name',
										placeholder: 'Topic name'
									})
								]),
								h('div.table-cell', {
										style: { width: '60px', 'vertical-align': 'top' }
									},
									h('button.btn.btn-default.pull-right', {
										type: 'submit'
									}, 'Add' )
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
