// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function store({ types, key }) {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be an array of three elements.')
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error('Expected types to be strings.')
    }
    if (typeof key !== 'string') {
        throw new Error('Expected key to be a string.')
    }

    const [ requestType, successType, failureType ] = types

    function updateStorage(state = {
        isFetching: false,
        data: {}
    }, action) {
        switch (action.type) {
            case requestType:
                return Object.assign({}, state, {
                    isFetching: true
                });
            case successType:
                if(state.data && state.data.results) {
                    let newResults = action.response.results
                    let currentResults = state.data.results

                    action.response.results = currentResults.concat(newResults);
                }

                return Object.assign({}, state, {
                    isFetching: false,
                    data: Object.assign({}, state.data, action.response)
                });
            case failureType:
                return Object.assign({}, state, {
                    isFetching: false
                });
            default:
                return state
        }
    }

    return function updateStorageByKey(state = {}, action) {
        switch (action.type) {
            case requestType:
            case successType:
            case failureType:
                return Object.assign({}, state, updateStorage(state, action));
            default:
                return state
        }
    }
}