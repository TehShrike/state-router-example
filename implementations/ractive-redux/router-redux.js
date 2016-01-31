var value = require('dom-value')

module.exports = function(stateRouter, redux) {
	var unsubscribes = {}
	var domApis = {}

	function attachToState(routerState, ractive, initialState) {
		if (routerState.data && routerState.data.reducer) {
			var causeDomEffects
			if (routerState.data.afterAction) {
				causeDomEffects = makeChangeListener(routerState, ractive)
			}

			var store = redux.createStore(routerState.data.reducer,
					{ ...initialState, ...routerState.data.initialState },
					redux.applyMiddleware(causeDomEffects))

			ractive.on('dispatch', (actionType, payload) => {
				var action = {}
				if (payload && typeof payload === 'object') {
					action = payload
				}
				action.type = actionType

				store.dispatch(action)
			})
			ractive.on('dispatchInput', (actionType, node) => {
				store.dispatch({ type: actionType, payload: value(node) })
			})

			ractive.store = store
			domApis[routerState.name] = ractive
			unsubscribes[routerState.name] = store.subscribe(() => ractive.set(store.getState()))

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

function makeChangeListener(routerState, ractive) {
	return function causeDomEffects({ getState, dispatch }) {
		return next => action => {
			var finalAction = next(action)

			routerState.data.afterAction({
				state: getState(),
				dispatch,
				domApi: ractive,
				action
			})

			return finalAction
		}
	}
}