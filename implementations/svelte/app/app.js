const component = require(`./App.svelte`)
const model = require(`model.js`)

module.exports = stateRouter => {
	stateRouter.addState({
		name: `app`,
		route: `/app`,
		defaultChild: `topics`,
		template: component,
		resolve(data, parameters, cb) {
			const currentUser = model.getCurrentUser()

			if (currentUser.name) {
				cb(null, {
					currentUser,
				})
			} else {
				cb.redirect(`login`)
			}
		},
		activate({ domApi: svelte }) {
			console.log(`huh`)
			svelte.$on(`logout`, () => {
				model.saveCurrentUser(null)
				stateRouter.go(`login`)
			})
		},
	})

	require(`./about/about`)(stateRouter)
	require(`./topics/topics`)(stateRouter)
}
