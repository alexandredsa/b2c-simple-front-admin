import React, { Component } from "react";
import { Button, Table, Navbar, Checkbox, Label, Modal, Form, FormGroup, Col, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { list, add, update } from './Actions';
import NotificationSystem from 'react-notification-system';


const mapDispatchToProps = dispatch => {
    return {
        listUsers: () => dispatch(list()),
        add: (user) => dispatch(add(user)),
        update: (user) => dispatch(update(user))
    }
}

const mapStateToProps = state => {
    return {
        users: state.userStore.users,
        username: state.loginStore.auth.user
    }
}


class User extends Component {
    constructor(props) {
        super(props);

        this.showFormModal = this.showFormModal.bind(this);
        this.closeFormModal = this.closeFormModal.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.changeUserStatus = this.changeUserStatus.bind(this);
        this.editUser = this.editUser.bind(this);
        this.showSubmitError = this.showSubmitError.bind(this);

        this.state = {
            show: false,
            user: {},
            loginInput: {},
            passwordInput: {},
            userRole: "EMPLOYEE",
            userStatus: false,
            isSubmiting: false
        };

        this.notificationDOMRef = React.createRef();
    }

    closeFormModal() {
        this.setState({ show: false });
    }

    showFormModal() {
        this.setState({ show: true });
    }


    componentDidMount() {
        this.props.listUsers();
    }

    goToStudents() {
        this.props.history.push('/alunos');
    }

    logout() {
        this.props.history.push('/login');
    }

    saveUser(event) {
        event.preventDefault();
        this.state.user.login = this.state.loginInput.value;
        this.state.user.password = this.state.passwordInput.value;
        this.state.user.status = this.state.userStatus;
        this.state.user.role = this.state.userRole;
        this.setState({ isSubmiting: true })

        const { user } = this.state;
        let promise;
        if (user._id) {
            promise = this.props.update(user);
        } else {
            promise = this.props.add(user);
        }

        promise
            .then(() => {
                this.setState({ isSubmiting: false })
                this.closeFormModal();
            })
            .catch(() => {
                this.setState({ isSubmiting: false });
                this.showSubmitError();
            })
    }

    showSubmitError() {
        this._notificationSystem.addNotification({
            message: 'Erro ao criar usuário',
            level: 'error',
            position: 'bc'
        });
    }

    changeUserStatus(user) {
        this.props.update({
            _id: user._id,
            status: !user.status
        });
    }

    editUser(user) {
        this.setState({ user, userRole: user.role, userStatus: user.status });
        this.showFormModal();
    }


    render() {
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">Anglo</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Text>
                            Logado como: <Navbar.Link href="#">{this.props.username}</Navbar.Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Navbar.Link href="#" onClick={() => this.goToStudents()}>Alunos</Navbar.Link>
                        </Navbar.Text>
                        <Navbar.Text pullRight>
                            <Navbar.Link href="#" onClick={() => this.logout()}>Sair</Navbar.Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>;

                <div style={{ backgroundColor: "#fff", margin: 30, padding: 10 }}>
                    <center><h2>Usuários</h2></center>
                    <Button bsStyle="success" bsSize="large" onClick={this.showFormModal}>Novo</Button>

                    <Modal show={this.state.show} onHide={this.closeFormModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cadastro de Usuário</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form horizontal onSubmit={this.saveUser}>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Login
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl value={this.state.user.login} inputRef={input => this.state.loginInput = input} type="text" placeholder="Login" />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Senha
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl value={this.state.user.password} inputRef={input => this.state.passwordInput = input} type="password" placeholder="Senha" />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Checkbox checked={this.state.userRole === 'ADMIN'}
                                            onChange={evt => this.setState({ userRole: evt.target.checked ? 'ADMIN' : 'EMPLOYEE' })}>Administrador</Checkbox>
                                    </Col>
                                </FormGroup>


                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Checkbox checked={this.state.userStatus}
                                            onChange={evt => this.setState({ userStatus: evt.target.checked })}>Status</Checkbox>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button disabled={this.state.isSubmiting} bsStyle="success" type="submit">{this.state.isSubmiting ? "Salvando" : "Salvar"}</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeFormModal} bsStyle="danger">Fechar</Button>
                        </Modal.Footer>
                    </Modal>

                    <Table striped bordered condensed hover responsive style={{ marginTop: 10 }}>
                        <thead>
                            <tr>
                                <th>Login</th>
                                <th>Status</th>
                                <th>É Administrador?</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.users.map(user => {
                                return (
                                    <tr key={user._id}>
                                        <td><h4>{user.login}</h4></td>
                                        <td><h4><Label bsSize="large" bsStyle={user.status ? "success" : "warning"}>{user.status ? "Ativo" : "Inativo"}</Label></h4></td>
                                        <td>
                                            <Checkbox checked={user.role === "ADMIN"} readOnly></Checkbox>
                                        </td>
                                        <td><h4><Label style={{ cursor: "pointer" }} bsSize="large"
                                            onClick={() => this.editUser(user)}
                                            bsStyle="warning">Editar</Label></h4></td>
                                        <td><h4><Label onClick={() => this.changeUserStatus(user)}
                                            bsSize="large"
                                            style={{ cursor: "pointer" }}
                                            bsStyle={user.status ? "danger" : "success"}>{user.status ? "Inativar" : "Ativar"}</Label></h4></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
