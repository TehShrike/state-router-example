const component = require(`./Login.svelte`)
const model = require(`model.js`)

module.exports = stateRouter => {
	stateRouter.addState({
		name: `login`,
		route: `/login`,
		template: component,
		activate({ domApi: svelte }) {
			svelte.$on(`login`, event => {
				const username = event.detail
				model.saveCurrentUser(username)
				stateRouter.go(`app`)
			})
		},
	})
}
