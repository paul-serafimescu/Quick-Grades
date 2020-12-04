import React, { Component } from 'react';
import './style/Home.scss';
import logo from './assets/ucla_logo.png';

export default class Home extends Component {
    render() {
        return (
            <div style={{padding: "10px"}}>
                <h1 style={{fontSize: "300%", textAlign: "center"}}>QuickGrades</h1>
                {this.props.toggleLogin ? null : <p style={{color: "red", margin: "10px"}}>You are not logged in.</p>}
                <div style={{margin: "10px"}} className="home-container">
                    <p style={{fontSize: "125%", lineHeight: "200%"}} className="column">
                        This is a grade-calculating app which can fill the void of a grade management widget in CCLE.
                        This application consists of a <strong>.NET Core MVC Web API backend</strong> consumed by a React-managed frontend.
                        Being my first experience with <strong>ReactJS</strong> in a project, I attempted to keep it as simple, yet functional, as possible.
                        I also familiarized myself with <strong>Microsoft EF Core</strong> as a backend ORM to a sqlite database.
                        <br/>~Paul Serafimescu 10/22/2020
                    </p>
                    <div style={{textAlign: "right"}} className="column">
                        <img style={{float: "right"}} src={logo} alt="UCLA" width="75%"></img>
                    </div>
                </div>
            </div>
        );
    }
}