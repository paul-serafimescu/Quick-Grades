import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(event) {
        this.setState({username: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
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
                <p style={{color: "red"}}>{this.state.error}</p>
                <input type="submit" value="Log In" />
                </form>
            </div>
        );
    }
}