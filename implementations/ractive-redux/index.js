var StateRouter = require('abstract-state-router')
var ractiveRenderer = require('ractive-state-router')
var domready = require('domready')

var routerRedux = require('state-router-redux-ractive')
var Ractive = require('ractive')

var stateRouter = StateRouter(ractiveRenderer(Ractive, {}), 'body')

routerRedux(stateRouter)

stateRouter.setMaxListeners(20)

require('./login/login')(stateRouter)
require('./app/app')(stateRouter)

domready(function() {
	stateRouter.evaluateCurrentRoute('login')
})
