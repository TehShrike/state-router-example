var StateRouter = require('abstract-state-router')
var SvelteRenderer = require('svelte-state-renderer')
var domready = require('domready')

domready(function() {
	var stateRouter = StateRouter(SvelteRenderer(), document.querySelector('body'))

	stateRouter.setMaxListeners(20)

	require('./login/login')(stateRouter)
	require('./app/app')(stateRouter)

	stateRouter.evaluateCurrentRoute('login')
})
