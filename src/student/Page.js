import React, { Component } from "react";
import { Table, Navbar } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { load, clear } from './Actions';

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(load()),
        clear: () => dispatch(clear())
    }
}

const mapStateToProps = state => {
    return {
        students: state.studentStore.students,
        username: state.loginStore.auth.user
    }
}


class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.props.load();
    }

    logout() {
        this.props.history.push('/login');
        this.props.clear();
    }


    goToUsers() {
        this.props.history.push('/usuarios');
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
                            <Navbar.Link href="#" onClick={() => this.goToUsers()}>Usuários</Navbar.Link>
                        </Navbar.Text>
                        <Navbar.Text pullRight>
                            <Navbar.Link href="#" onClick={() => this.logout()}>Sair</Navbar.Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>;

                <div style={{ backgroundColor: "#fff", margin: 80, padding: 10 }}>
                    <center><h2>Alunos</h2></center>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Próximo de:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.students.map(student => {
                                return (
                                    <tr key={student._id}>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.liveNear}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Student));
