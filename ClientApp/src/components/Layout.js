import React, { Component } from 'react';
import Nav from './Nav';

export default class Layout extends Component {
  render () {
    return (
      <div>
        <Nav loggedIn={this.props.toggleLogin}/>
        {this.props.children}
      </div>
    );
  }
}
