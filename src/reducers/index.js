import * as ActionTypes from '../constants/ActionTypes'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import store from './store'

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
    const { type, error } = action

    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return action.error
    }

    return state
}

// Updates the pagination data for different actions.
const storage = combineReducers({
    movie: store({
        key: 'movie',
        types: [
            ActionTypes.MOVIE_REQUEST,
            ActionTypes.MOVIE_SUCCESS,
            ActionTypes.MOVIE_FAILURE
        ]
    }),
    movies: store({
        key: 'movies',
        types: [
            ActionTypes.MOVIES_REQUEST,
            ActionTypes.MOVIES_SUCCESS,
            ActionTypes.MOVIES_FAILURE
        ]
    }),
    comments: store({
        key: 'comments',
        types: [
            ActionTypes.COMMENTS_REQUEST,
            ActionTypes.COMMENTS_SUCCESS,
            ActionTypes.COMMENTS_FAILURE
        ]
    })
})

const rootReducer = combineReducers({
    storage,
    errorMessage,
    routing
})

export default rootReducer
