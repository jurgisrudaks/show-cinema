import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadMovie, loadComments, addComment } from '../actions'

import Movie from '../components/Movie'
import List from '../components/List'
import AddComment from '../components/AddComment'
import Comment from '../components/Comment'

function loadData(props) {
    let { movie, id, params, comments } = props
    id = (id || params.id)

    if (!Object.keys(movie).length) {
        props.loadMovie(id)
    }

    if (!comments.length || comments.length > 0 && id !== comments[0].movie_id) {
        props.loadComments(id, true)
    }
}

class MoviePage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        loadData(this.props)
    }

    handleAddComment(commentData) {
        this.props.addComment(this.props.params.id, commentData).then(
            response => this.props.loadComments(this.props.params.id, true)
        )
    }

    handleLoadMoreCommentsClick() {
        this.props.loadComments(this.props.params.id)
    }

    renderComment(comment, i) {
        return (
            <Comment comment={comment}
                key={'movie-comment-' + i + '-' + comment._id} />
        )
    }

    render() {
        const { movie, comments, isFetching, params, extraParams } = this.props

        if (isFetching || !Object.keys(movie).length) {
            return (
                <div className="container main-container movie-page">
                    <h1><i>Loading movie...</i></h1>
                </div>
            )
        }

        return (
            <div className="container main-container movie-page">
                <Movie
                    movie={movie}
                    isFetching={extraParams.isFetching}
                    />
                <hr className="divider" />
                <h3>Add Comment</h3>
                <AddComment onSubmit={this.handleAddComment.bind(this)} />
                <h3>Comments</h3>
                <List renderItem={this.renderComment}
                    items={comments}
                    onLoadMoreClick={this.handleLoadMoreCommentsClick.bind(this)}
                    loadingLabel={'Loading comments...'}
                    isFetching={extraParams.isFetching}
                    page={extraParams.commentsPage}
                    totalPages={extraParams.totalCommentsPages}
                    />
            </div>
        )
    }
}

MoviePage.propTypes = {
    movie: PropTypes.object.isRequired,
    loadMovie: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    comments: PropTypes.array
}

function mapStateToProps(state, ownProps) {
    const {
        storage: { movie, movies, comments }
    } = state

    const extraParams = {
        isFetching: movie.isFetching || comments.isFetching,
        commentsPage: (comments.data ? comments.data.page : 1),
        totalCommentsPages: (comments.data ? comments.data.total_pages : 0)
    }

    let cachedMovieData = null;

    if(Object.keys(movies).length) {
        cachedMovieData = movies.data.results.find((m) => {
            return m._id === ownProps.params.id;
        });
    }

    return {
        movie: cachedMovieData ? cachedMovieData : movie.data ? movie.data : {},
        comments: comments.data ? comments.data.results : [],
        extraParams
    }
}

export default connect(mapStateToProps, {
    loadMovie,
    loadComments,
    addComment
})(MoviePage)
