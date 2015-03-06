var StateRouter = require('abstract-state-router')
var virtualdomRenderer = require('virtualdom-state-renderer')
var domready = require('domready')

var stateRouter = StateRouter(virtualdomRenderer(), 'body')

require('./login/login')(stateRouter)
require('./app/app')(stateRouter)

domready(function() {
	stateRouter.evaluateCurrentRoute('login')
})
