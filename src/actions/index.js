import * as types from '../constants/ActionTypes'
import * as apiConfig from '../constants/Api'
import { CALL_API } from '../middleware/api'

function getMovie(movieId) {
    return {
        [CALL_API]: {
            types: [ types.MOVIE_REQUEST, types.MOVIE_SUCCESS, types.MOVIE_FAILURE ],
            endpoint: `movies/${movieId}`
        }
    }
}

export function loadMovie(movieId) {
    return (dispatch, getState) => {
        return dispatch(getMovie(movieId))
    }
}

function getMovies(nextPageUrl) {
    return {
        [CALL_API]: {
            types: [ types.MOVIES_REQUEST, types.MOVIES_SUCCESS, types.MOVIES_FAILURE ],
            endpoint: nextPageUrl
        }
    }
}

export function loadMovies() {
    return (dispatch, getState) => {
        let currentPage = (getState().storage.movies.data ? getState().storage.movies.data.page : 0)
        let nextPageUrl = `movies?page=${currentPage + 1}`

        return dispatch(getMovies(nextPageUrl))
    }
}

function getComments(nextPageUrl) {
    return {
        [CALL_API]: {
            types: [ types.COMMENTS_REQUEST, types.COMMENTS_SUCCESS, types.COMMENTS_FAILURE ],
            endpoint: nextPageUrl
        }
    }
}

export function loadComments(movieId, resetPageCount) {
    return (dispatch, getState) => {
        let state = getState();
        let currentPage = (state.storage.comments.data ? state.storage.comments.data.page : 0)
        let nextPageUrl = `movies/${movieId}/comments?page=${resetPageCount ? 1 : currentPage + 1}`

        if (resetPageCount) {
            state.storage.comments = {};
        }

        return dispatch(getComments(nextPageUrl))
    }
}

function addCommentRequest(endpoint, commentData) {
    return {
        [CALL_API]: {
            types: [ types.ADD_COMMENT_REQUEST, types.ADD_COMMENT_SUCCESS, types.ADD_COMMENT_FAILURE ],
            endpoint: endpoint,
            options: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(commentData)
            }
        }
    }
}

export function addComment(movieId, commentData) {
    return (dispatch, getState) => {
        const endpoint = `movies/${movieId}/comments`
        return dispatch(addCommentRequest(endpoint, commentData))
    }
}

export function resetErrorMessage() {
    return {
        type: types.RESET_ERROR_MESSAGE
    }
}
