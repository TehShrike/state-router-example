const component = require(`./About.svelte`)

module.exports = stateRouter => {
	stateRouter.addState({
		name: `app.about`,
		route: `/about`,
		template: component,
	})
}
