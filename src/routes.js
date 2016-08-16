import React from 'react'
import { Route } from 'react-router'

import App from './containers/App'
import MoviePage from './containers/MoviePage'
import MoviesPage from './containers/MoviesPage'

function redirectToIndex(nextState, replace) {
    if (nextState.location.pathname === '/') {
        replace('/explore')
    }
}

export default (
    <Route path="/" onEnter={redirectToIndex} component={App}>
        <Route path="/explore"
            component={MoviesPage} />
        <Route path="/movie/:id"
            component={MoviePage} />
    </Route>
)
