import React, { Component } from "react";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import logo from '../assets/robot.png';
import '../css/Main.css';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    handleNewMessage = (input, data) => {
        this.setState({
            messages: [...this.state.messages,
                { me: true, author: "Me", body: input },
                {me: false, author: "Bot", body: data}],
        })
    }

    render() {
        return (
            <div className="Main">
                <h1><b>Concierge Bot</b><img src={logo} alt="logo" width="50" height="50"></img></h1>
                <MessageList messages={this.state.messages} />
                <MessageForm onMessageSend={this.handleNewMessage} />
            </div>
        );
    }
}

export default Main;