var createStore = require('redux').createStore
var value = require('dom-value')

module.exports = function(stateRouter) {
	var unsubscribes = {}
	var domApis = {}

	function attachToState(state, domApi, initialState) {
		if (state.data && state.data.reducer) {
			var store = createStore(state.data.reducer, { ...initialState, ...state.data.initialState })
			domApi.on('dispatch', actionType => store.dispatch({ type: actionType }))
			domApi.on('dispatchInput', (event, actionType) => {
				store.dispatch({ type: actionType, payload: value(event.node) })
			})

			domApi.store = store
			domApis[state.name] = domApi
			unsubscribes[state.name] = store.subscribe(() => {
				domApi.set(store.getState())
			})
		}
	}
	function detatchFromState(stateName) {
		if (unsubscribes[stateName]) {
			unsubscribes[stateName]()
			delete unsubscribes[stateName]

			delete domApis[stateName].store
			delete domApis[stateName]
		}
	}
	stateRouter.on('afterCreateState', context => attachToState(context.state, context.domApi, context.content))

	stateRouter.on('beforeResetState', context => detatchFromState(context.state.name))
	stateRouter.on('afterResetState', context => attachToState(context.state, context.domApi, context.content))

	stateRouter.on('beforeDestroyState', context => detatchFromState(context.state.name))
}
