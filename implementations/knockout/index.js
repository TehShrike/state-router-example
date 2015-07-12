var StateRouter = require('abstract-state-router')
var makeRenderer = require('knockout-state-renderer')
var domready = require('domready')

var stateRouter = StateRouter(makeRenderer(), 'body')

require('./login/login')(stateRouter)
require('./app/app')(stateRouter)

domready(function() {
	stateRouter.evaluateCurrentRoute('login')
})
