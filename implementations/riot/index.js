var StateRouter = require('abstract-state-router')
var riotRenderer = require('riot-state-renderer')
var domready = require('domready')

var stateRouter = StateRouter(riotRenderer(), 'body')

require('./login/login')(stateRouter)
require('./app/app')(stateRouter)

domready(function() {
	stateRouter.evaluateCurrentRoute('login')
})
