import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

import { resetErrorMessage } from '../actions'

import bootstrap from 'bootstrap'
import style from '../assets/scss/style.scss'

class App extends Component {
    constructor(props) {
        super(props)
        this.handleDismissClick = this.handleDismissClick.bind(this)
    }

    handleDismissClick(e) {
        this.props.resetErrorMessage()
        e.preventDefault()
    }
    
    renderErrorMessage() {
        const { errorMessage } = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
                <b>{errorMessage}</b>
                {' '}
                (<a href="#"
                     onClick={this.handleDismissClick}>
                Dismiss
                </a>)
            </p>
        )
    }

    render() {
        const { children, inputValue } = this.props
        return (
            <div className="app">
                <div className="container">
                    <div className="row">
                        <Link to={'/explore'}>
                            <div className="logo">
                                <span className="logo-icon glyphicon glyphicon-film" aria-hidden="true"></span>
                                <div className="sitename">
                                    <span className="title">Show</span>
                                    <span className="slogan">The best Movies in the world</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                {this.renderErrorMessage()}
                {children}
            </div>
        )
    }
}

App.propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
    return {
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps, {
    resetErrorMessage
})(App)
