import React, { Component, PropTypes } from 'react'

export default class MovieCard extends Component {
    render() {
        const { credit } = this.props

        return (
            <div className="col-sm-6 col-md-6">
                <h4>{credit.name}</h4>
                <h5>{credit.character}</h5>
            </div>
        )
    }
}

MovieCard.propTypes = {
    credit: PropTypes.shape({
        name: PropTypes.string.isRequired,
        character: PropTypes.string
    }).isRequired
}
