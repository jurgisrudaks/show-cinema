import React, { Component, PropTypes } from 'react'

export default class List extends Component {
    renderLoadMore() {
        const { isFetching, onLoadMoreClick } = this.props
        return (
            <div className="row">
                <div className="col-sm-12 text-center">
                    <button type="button" data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" onClick={onLoadMoreClick}>
                        {'Load More'}
                    </button>
                </div>
            </div>
        )
    }

    render() {
        const {
            isFetching, page, totalPages,
            items, renderItem, loadingLabel,
            onLoadMoreClick
        } = this.props

        const isEmpty = items.length === 0
        if (isEmpty && isFetching) {
            return <h2><i>{loadingLabel}</i></h2>
        }

        const isLastPage = (page >= totalPages)
        if (isEmpty && isLastPage) {
            return <h4>Nothing here.</h4>
        }

        return (
            <div>
                <div className="row">
                    {items.map(renderItem)}
                </div>
                {onLoadMoreClick && totalPages > 0 && !isLastPage && this.renderLoadMore()}
            </div>
        )
    }
}

List.propTypes = {
    loadingLabel: PropTypes.string.isRequired,
    totalPages: PropTypes.number,
    page: PropTypes.number,
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func
}

List.defaultProps = {
    isFetching: true,
    loadingLabel: 'Loading...'
}
