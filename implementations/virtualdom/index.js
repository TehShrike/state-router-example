var StateRouter = require('abstract-state-router')
var ractiveRenderer = require('ractive-state-router')
var domready = require('domready')

var stateRouter = StateRouter(ractiveRenderer({
}), 'body')

require('./login/login')(stateRouter)
require('./app/app')(stateRouter)

domready(function() {
	stateRouter.evaluateCurrentRoute('login')
})
