var StateRouter = require('abstract-state-router')
var Ractive = require('ractive')
var ractiveRenderer = require('ractive-state-router')
var domready = require('domready')

var stateRouter = StateRouter(ractiveRenderer(Ractive, {}), 'body')

stateRouter.setMaxListeners(20)

require('./login/login')(stateRouter)
require('./app/app')(stateRouter)

domready(function() {
	stateRouter.evaluateCurrentRoute('login')
})
