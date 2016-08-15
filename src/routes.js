import React from 'react'
import { Route } from 'react-router'

import App from './containers/App'
import MoviePage from './containers/MoviePage'
import MoviesPage from './containers/MoviesPage'

export default (
    <Route path="/" component={App}>
        <Route path="/explore"
            component={MoviesPage} />
        <Route path="/movie/:id"
            component={MoviePage} />
    </Route>
)
