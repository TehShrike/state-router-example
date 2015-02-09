var StateRouter = require('abstract-state-router')
var ractiveRenderer = require('ractive-state-router')
var domready = require('domready')

var stateRouter = StateRouter(ractiveRenderer, 'body')

var data = {}  // big ball 'o state

require('./login/login')(stateRouter, data)
require('./app/app')(stateRouter, data)

domready(function() {
	stateRouter.evaluateCurrentRoute('login')
})
