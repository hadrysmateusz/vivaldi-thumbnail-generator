// const types = {
// 	EXPORT_INIT: () => ({
// 		isLoading: true,
// 		isError: false,
// 		archives: []
// 	}),
// 	EXPORT_SUCCESS: ({ payload }) => ({
// 		isLoading: false,
// 		isError: false,
// 		archives: payload
// 	}),
// 	EXPORT_FAILURE: ({ error }) => {
// 		console.error(error)
// 		return {
// 			isLoading: false,
// 			isError: true,
// 			archives: []
// 		}
// 	}
// }

// const createStore = (types) => {
// 	const dispatch = {}
// 	Object.entries(types).forEach(([key, value]) => {
// 		dispatch[key] = () => reducer({type: key, payload:})
// 	})
// }

// const reducer = (state, action) => {
// 	// define action types

// 	// call the correct reducer
// 	types[action.type](...action, state)
// }
