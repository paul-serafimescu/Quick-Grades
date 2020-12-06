import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style/Profile.scss';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.toggleLogin();
        localStorage.removeItem('credentials');
        this.props.history.push('/');
    }

    render() {
        if(localStorage.getItem('credentials') === null) return <Redirect to='/' />;
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}