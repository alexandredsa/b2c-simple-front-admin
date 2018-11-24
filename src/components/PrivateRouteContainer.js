import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux'

// Actions



const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

const mapStateToProps = state => {
    return {
        auth: state.loginStore.auth
    }
}

class PrivateRouteContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    isAuthenticated() {
        const { auth } = this.props
        return auth.token && Object.keys(auth.token).length > 0
    }


    renderComponent(isAuthenticated, component) {
        return isAuthenticated
            ? component
            : null
    }

    render() {
        const isAuthenticated = this.isAuthenticated()
        const {
            component: Component,
            ...props
        } = this.props

        if (!isAuthenticated) {
            this.props.history.push('/login')
        }
        return (
            <Route
                {...props}
                render={props => this.renderComponent(isAuthenticated, <Component {...props} />)
                }
            />
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteContainer));