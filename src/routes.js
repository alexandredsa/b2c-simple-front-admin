import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import PrivateRouteContainer from './components/PrivateRouteContainer';

import Login from './login/Page';
import Student from './student/Page';
import User from './users/Page';

import NotFoundContainer from './components/NotFoundContainer';

const history = createHistory({ basename: '/admin' })

// Pages

class Routes extends Component {

    renderRoutes() {
        return <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" render={() => (
                    <Redirect to="/login" />
                )} />
                <Route path="/login" component={Login} />
                <PrivateRouteContainer path="/alunos" component={Student} />
                <PrivateRouteContainer path="/usuarios" component={User} />
                <Route component={NotFoundContainer} />
            </Switch>
        </ConnectedRouter>
    }


    render() {
        return (
            this.renderRoutes()
        );
    }
}

export default Routes;

