import React, { Component, PropTypes } from 'react'

export default class AddComment extends Component {

    onSubmitComment(event) {
        event.preventDefault()
        this.props.onSubmit({
            author: this.refs.newCommentAuthor.value,
            text: this.refs.newComment.value
        })
        this.refs.newCommentAuthor.value = ''
        this.refs.newComment.value = ''
    }

    render() {
        return (
            <div className="add-comment">
                <form onSubmit={this.onSubmitComment.bind(this)}>
                    <div className="form-group">
                        <div className="name input-group">
                            <span className="input-group-addon">Name</span>
                            <input ref="newCommentAuthor" type="text" className="form-control" id="commentAuthor" aria-describedby="commentAuthorStatus" required />
                        </div>
                        <textarea ref="newComment" className="comment" placeholder="Have you seen it? What do you think of it?" required ></textarea>
                        <button type="submit" className="btn btn-success green"><i className="glyphicon glyphicon-share"></i> Done</button>
                    </div>
                </form>
            </div>
        )
    }
}

AddComment.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
