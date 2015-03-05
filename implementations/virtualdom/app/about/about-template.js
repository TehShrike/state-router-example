module.exports = function (h, context) {
	return h("div.container", [
		h("div.row", [
			h("div.col-sm-offset-2.col-sm-8", [
				h("div.jumbotron", [
					h("h1", [ "About this example" ])
				])
			])
		]),
		h("div.row", [
			h("div.col-sm-offset-3.col-sm-6", [
				h("p", [
					"Pretty sweet, isn't it?  Here, let me give some examples or something."
				])
			])
		])
	])
}
