import React, { Component, PropTypes } from 'react'

export default class Comment extends Component {
    render() {
        const { comment } = this.props

        return (
            <div className="comment">
                <div className="col-xs-2 col-sm-1">
                    <div className="thumbnail">
                        <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                    </div>
                </div>

                <div className="col-xs-10 col-sm-5">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <strong>{comment.author}</strong> <span className="text-muted">{new Date(comment.date).toLocaleString('en-UK')}</span>
                        </div>
                        <div className="panel-body">
                            {comment.text}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}
