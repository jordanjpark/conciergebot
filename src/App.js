import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Routes from "./Routes";
import logo from './assets/robot.png';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isAuthenticated: false
        };
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };

        return (
            <div className="App">
                <Navbar>
                    <h1>
                        <b>Concierge Bot</b>
                        <img src={logo} alt="logo" width="50" height="50"></img>
                        <Link to="/login">Login</Link>
                    </h1>
                </Navbar>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default App;
