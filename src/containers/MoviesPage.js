import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadMovies } from '../actions'

import MovieCard from '../components/MovieCard'
import List from '../components/List'

function loadData(props) {
    const { movies } = props

    if (!movies.length) {
        props.loadMovies()
    }
}

class MoviesPage extends Component {
    constructor(props) {
        super(props)
        this.renderMovie = this.renderMovie.bind(this)
        this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
    }

    componentWillMount() {
        loadData(this.props)
    }

    handleLoadMoreClick() {
        this.props.loadMovies()
    }

    renderMovie(movie) {
        return (
            <MovieCard movie={movie}
                key={'movie-card-' + movie._id} />
        )
    }

    render() {
        const { movies, extraParams } = this.props

        if (!movies) {
            return <h1><i>Loading movies...</i></h1>
        }

        return (
            <div className="container main-container movies-page">
                <List renderItem={this.renderMovie}
                    items={movies}
                    onLoadMoreClick={this.handleLoadMoreClick}
                    loadingLabel={'Loading movies...'}
                    {...extraParams}
                    />
            </div>
        )
    }
}

MoviesPage.propTypes = {
    movies: PropTypes.array
}

function mapStateToProps(state, ownProps) {
    const {
        storage: { movies }
    } = state

    const extraParams = {
        isFetching: movies.isFetching,
        page: (movies.data ? movies.data.page : 1),
        totalPages: (movies.data ? movies.data.total_pages : 0)
    }

    return {
        movies: movies.data ? movies.data.results : [],
        extraParams
    }
}

export default connect(mapStateToProps, {
    loadMovies
})(MoviesPage)
