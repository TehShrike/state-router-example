module.exports = function (h, context, helpers) {
	var model = context.model
	var stateRouter = context.stateRouter

	return h("div.container-fluid", [
		h("div.row", [
			h("div.col-sm-offset-3.col-sm-6", [
				h("h1", [ "Welcome to the abstract-state-router demo!" ])
			])
		]),
		h("div.row.margin-top-20", [
			h("div.col-sm-offset-3.col-sm-6", [
				h("div.well", [
					h("p.lead", [
						"This is a demo webapp showing off basic usage of the ",
						h("a", {
							href: "https://github.com/TehShrike/abstract-state-router"
						}, [ "abstract-state-router" ]), " library using a few different templating libraries."
					])
				])
			])
		]),
		h("div.row.margin-top-20", [
			h("div.col-sm-offset-4.col-sm-4", [
				h("div.form-group.panel", [
					h("form.panel-body", {
						onsubmit: login,
						action: ""
					}, [
						h("label", [
							"Put in whatever username you feel like:",
							h("input.form-control", {
								type: "text",
								value: ""
							})
						]),
						h("button.btn.btn-primary", {
							type: "submit"
						}, [ "\"Log in\"" ])
					])
				])
			])
		])
	])

	function login(e) {
		var username = e.srcElement.querySelector('input').value
		if (username) {
			model.saveCurrentUser(username)
			stateRouter.go('app')
		}
		helpers.killEvent(e)
	}
}
