import React, { Component } from 'react';
import { Button, Jumbotron } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

class NotFoundContainer extends Component {

    goToLogin() {
        this.props.history.push('/login');
     }

    render() {
        return (
            <Jumbotron style={{ margin: 30, padding: 150, backgroundColor: "rgb(255, 174, 168)" }}>
                <h1>404</h1>
                <h2>Ooops! Parece que você achou uma página que não existe</h2>
                <p>
                    Se eu fosse você voltaria para o login. Vamos fingir que nada disso aconteceu, ok?
            </p>
                <p>
                    <Button bsStyle="primary" onClick={() => this.goToLogin()}>Ir para Login</Button>
                </p>
            </Jumbotron>
        )
    }
}

export default withRouter(NotFoundContainer);