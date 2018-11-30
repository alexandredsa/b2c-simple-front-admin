import React, { Component } from "react";
import Select from 'react-select';
import { Table, Navbar, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { load, clear, exportCsv } from './Actions';
import { list } from '../users/Actions';
import fileDownload from "js-file-download";


const mapDispatchToProps = dispatch => {
    return {
        load: (registeredBy) => dispatch(load(registeredBy)),
        exportCsv: (registeredBy) => dispatch(exportCsv(registeredBy)),
        listUsers: () => dispatch(list()),
        clear: () => dispatch(clear())
    }
}

const mapStateToProps = state => {
    return {
        students: state.studentStore.students,
        username: state.loginStore.auth.user,
        users: state.userStore.users
    }
}


class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.exportCsv = this.exportCsv.bind(this);
    }

    handleChange(selectedOption) {
        this.props.load(selectedOption.value)
        this.setState({ selectedOption });
    }

    exportCsv() {
        const { selectedOption } = this.state;
        this.props.exportCsv(selectedOption ? selectedOption.value : null)
        .then(data => {
            fileDownload(data, `${Date.now()}.csv`);
        })
    }


    componentDidMount() {
        this.props.load();
        this.props.listUsers();
    }

    logout() {
        this.props.history.push('/login');
        this.props.clear();
    }


    goToUsers() {
        this.props.history.push('/usuarios');
    }

    render() {
        const options = this.props.users.map(user => {
            return { value: user.login, label: user.login };
        });

        options.unshift({ value: this.props.username, label: this.props.username });

        const { selectedOption } = this.state;

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
                    <div style={{ width: "25%", marginBottom: 8, float: "right" }}>
                        <Select
                            value={selectedOption}
                            placeholder="Selecione um Usuário"
                            isSearchable={true}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <Button bsStyle="success" onClick={this.exportCsv} download>Exportar</Button>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Próximo de:</th>
                                <th>Cadastrado Por:</th>
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
                                        <td>{student.registeredBy}</td>
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
