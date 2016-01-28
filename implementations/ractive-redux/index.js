var StateRouter = require('abstract-state-router')
var ractiveRenderer = require('ractive-state-router')
var domready = require('domready')
var routerRedux = require('./router-redux')

var decorator = require('./decorator')
var Ractive = require('ractive')

var stateRouter = StateRouter(ractiveRenderer(Ractive, {
	decorators: {
		setValue: decorator
	}
}), 'body')

routerRedux(stateRouter)

stateRouter.setMaxListeners(20)

require('./login/login')(stateRouter)
require('./app/app')(stateRouter)

domready(function() {
	stateRouter.evaluateCurrentRoute('login')
})
