import React, { Component } from 'react';
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';
import logo from './assets/robot.png';
import './css/App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    handleNewMessage = (text) => {
        this.setState({
            messages: [...this.state.messages, { me: true, author: "Me", body: text }],
        })
    }

    render() {
        return (
            <div className="App">
                <h1><b>Concierge Bot</b><img src={logo} alt="logo" width="50" height="50"></img></h1>
                <MessageList messages={this.state.messages} />
                <MessageForm onMessageSend={this.handleNewMessage} />
            </div>
        );
    }
}

export default App;
