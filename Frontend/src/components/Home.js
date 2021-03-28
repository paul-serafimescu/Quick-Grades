import React, { Component } from 'react';
import './style/Home.scss';
import logo from './assets/gradebook.png';

export default class Home extends Component {
    render() {
        return (
            <div style={{padding: "10px"}}>
                <h1 style={{fontSize: "300%", textAlign: "center"}}>QuickGrades</h1>
                {this.props.toggleLogin ? null : <p style={{color: "red", margin: "10px"}}>You are not logged in.</p>}
                <div style={{margin: "10px"}} className="home-container">
                    <div style={{textAlign: "center"}} className="column">
                        <img src={logo} alt="app logo" width="500px"></img>
                    </div>
                </div>
            </div>
        );
    }
}