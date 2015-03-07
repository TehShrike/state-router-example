module.exports = function (h) {
	return h('div#no-task-selected-template',
		h("p", "This is a very basic todo app\tto show off route states."),
		h("p",
			"Click on one of the topics on the left, and watch both the url and this" +
			" half of the screen change, without anything else in the dom changing!"
		)
	)
}
