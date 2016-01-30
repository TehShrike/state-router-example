var value = require('dom-value')

module.exports = function(stateRouter, createStore) {
	var unsubscribes = {}
	var domApis = {}

	function attachToState(state, ractive, initialState) {
		if (state.data && state.data.reducer) {
			var store = createStore(state.data.reducer, { ...initialState, ...state.data.initialState })
			ractive.on('dispatch', actionType => store.dispatch({ type: actionType }))
			ractive.on('dispatchInput', (actionType, node) => {
				store.dispatch({ type: actionType, payload: value(node) })
			})

			ractive.store = store
			domApis[state.name] = ractive
			unsubscribes[state.name] = store.subscribe(() => ractive.set(store.getState()))
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
