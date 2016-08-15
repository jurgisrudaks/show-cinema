import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class MovieCard extends Component {
    render() {
        const { movie } = this.props

        return (
            <div className="col-sm-6 col-md-6">
                <Link to={`/movie/${movie._id}`}>
                    <div className="movie-card">
                        <img src={'http://image.tmdb.org/t/p/w600/' + movie.backdrop_path} />
                        <div className="movie-card-details animate">
                            <div className="movie-card-header">
                                <h1>{movie.title}</h1>
                                <h3>{new Date(movie.release_date).toLocaleDateString('en-UK')}</h3>
                            </div>
                            <div className="movie-card-detail">
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired
}
