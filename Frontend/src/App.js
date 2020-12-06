import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Profile from './components/Profile';
import Grades from './components/Grades';
import Signup from './components/Signup';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage['credentials'] !== undefined,
    };
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    const current = this.state.loggedIn;
    this.setState({loggedIn: !current});
  }

  render() {
    return (
      <Router>
        <Layout toggleLogin={this.state.loggedIn}>
          <Route exact path='/' render={(props) => (<Home {...props} toggleLogin={this.state.loggedIn} />)} />
          <Route exact path='/view-grades' component={Grades} />
          <Route path='/profile' render={(props) => (<Profile {...props} toggleLogin={this.toggleLogin} />)} />
          {this.state.loggedIn ? <Redirect to="/"/> :
          <Route path='/signup' render={(props) => (<Signup {...props} toggleLogin={this.toggleLogin} />)} />}
          {this.state.loggedIn ? <Redirect to="/"/> :
          <Route path='/login' render={(props) => (<Login {...props} toggleLogin={this.toggleLogin} />)} />}
        </Layout>
      </Router>
    );
  }
}
