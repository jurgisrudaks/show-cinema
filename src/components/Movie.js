import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Credit from '../components/Credit'
import List from '../components/List'

export default class Movie extends Component {
    renderCredit(credit, i) {
        const { movie } = this.props
        return (
            <Credit credit={credit}
                key={'credit-' + i + '-' + credit.id + '-' + movie._id} />
        )
    }

    render() {
        const { movie } = this.props

        return (
            <div className="row">
                <div className="movie">
                    <div className="movie-sidebar col-sm-4 col-md-4">
                        <img className="poster" src={'http://image.tmdb.org/t/p/w650/' + movie.poster_path} />
                    </div>
                    <div className="movie-details col-sm-8 col-md-8">
                        <h1>{movie.title}</h1>
                        <h4>{movie.tagline}</h4>
                        <p>{movie.overview}</p>
                        <h2>Cast</h2>
                        <List renderItem={this.renderCredit.bind(this)}
                            items={movie.cast}
                            loadingLabel={'Loading credits...'}
                            />
                    </div>
                </div>
            </div>
        )
    }
}

Movie.propTypes = {
    movie: PropTypes.object.isRequired
}
