var StateRouter = require('abstract-state-router')
var ractiveRenderer = require('ractive-state-router')
var domready = require('domready')

var stateRouter = StateRouter(ractiveRenderer({
	magic: true
}), 'body')

var currentUser = {}

require('./login/login')(stateRouter, currentUser)
require('./app/app')(stateRouter, currentUser)

domready(function() {
	stateRouter.evaluateCurrentRoute('login')
})
