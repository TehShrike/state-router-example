const StateRouter = require(`abstract-state-router`)
const SvelteRenderer = require(`svelte-state-renderer`)
const domready = require(`domready`)

domready(() => {
	const stateRouter = StateRouter(SvelteRenderer(), document.querySelector(`body`))

	require(`./login/login.js`)(stateRouter)
	require(`./app/app.js`)(stateRouter)

	stateRouter.evaluateCurrentRoute(`login`)
})
