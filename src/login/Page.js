import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Image } from "react-bootstrap";
import "./Style.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { authUser, clear } from './Actions';

const mapDispatchToProps = dispatch => {
    return {
        authUser: (username, password) => dispatch(authUser(username, password)),
        clear: () => dispatch(clear())
    }
}


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: ""
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clear();
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        const { login, password } = this.state;
        this.props.authUser(login, password)
            .then(() => {
                this.props.history.push('/alunos')
            })
            .catch(err => { });
        event.preventDefault();
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <Image src={require('./res/images/logo.png')} circle responsive />
                    <FormGroup controlId="login" bsSize="large">
                        <ControlLabel>Usuário</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.login}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Senha</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
          </Button>
                </form>
            </div>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
