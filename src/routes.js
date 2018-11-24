import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, History } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
import { connect, Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory';
import PrivateRouteContainer from './components/PrivateRouteContainer';

import Login from './login/Page';
import Student from './student/Page';
import NotFoundContainer from './components/NotFoundContainer';

const history = createHistory({ basename: '/admin' })

// Pages

class Routes extends Component {

    renderRoutes = () => {
        return <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" render={() => (
                    <Redirect to="/login" />
                )} />
                <Route path="/login" component={Login} />
                <PrivateRouteContainer path="/alunos" component={Student} />
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

