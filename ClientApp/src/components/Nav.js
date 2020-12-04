import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/Nav.scss';

export default class NavMenu extends Component {

  render() {
      return (
      !this.props.loggedIn ?
      <header>
        <ul id="navbar">
          <li className="navbar-item"><Link to="/">Home</Link></li>
          <li className="navbar-item-right"><Link to="/signup">Sign Up</Link></li>
          <li className="navbar-item-right"><Link to="/login">Login</Link></li>
        </ul>
      </header>
    :
    <header>
      <ul id="navbar">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/view-grades">View Grades</Link></li>
        <li className="navbar-item-right" id="user">
          <Link to="/profile">{JSON.parse(localStorage.getItem('credentials')).username}</Link>
        </li>
      </ul>
    </header>
    );
  }
}
