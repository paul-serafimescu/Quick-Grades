import React, { Component } from 'react';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            error: ''
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handlePass2Change = this.handlePass2Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(event) {
        this.setState({username: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value});
    }

    handlePass2Change(event) {
        this.setState({password2: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.password !== this.state.password2) {
            this.setState({error: 'passwords do not match'});
            return;
        }
        fetch('users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(response => {
            if(response.ok) {
                response.json().then(result => {
                    localStorage.setItem('credentials', JSON.stringify(result));
                    console.log(localStorage);
                    this.props.toggleLogin();
                    this.props.history.push('/');
                });
            }
            else this.setState({error: 'invalid credentials'});
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="login" style={{padding: "10px"}}>
                <h1>Welcome</h1>
                <form onSubmit={this.handleSubmit}>
                <label>Username</label>
                <input required style={{"display": "block"}} type="text" value={this.state.username} onChange={this.handleUserChange} />
                <label>Password</label>
                <input required style={{"display": "block"}} type="password" value={this.state.password} onChange={this.handlePassChange} />
                <label>Confirm Password</label>
                <input required style={{"display": "block"}} type="password" value={this.state.password2} onChange={this.handlePass2Change} />
                <p style={{color: "red"}}>{this.state.error}</p>
                <input type="submit" value="Log In" />
                </form>
            </div>
        );
    }
}