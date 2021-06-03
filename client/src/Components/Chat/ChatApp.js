import "./ChatApp.css";

import React from "react";
import io from "socket.io-client";

import Messages from "./Messages";
import ChatInput from "./ChatInput";

class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);

    this.uname = Math.random(10).toString();

    // Connect to the server
    this.socket = io("http://localhost:4001", {
      query: `username=${this.uname}`,
    }).connect();

    let usernameObject = {
      username: this.uname,
    };
    this.socket.emit("change_username", usernameObject);

    // Listen for messages from the server
    this.socket.on("server:message", (message) => {
      if (message.username === this.uname) return;
      this.addMessage(message);
    });
  }

  sendHandler(message) {
    const messageObject = {
      username: this.uname,
      message,
    };

    // Emit the message to the server
    this.socket.emit("client:message", messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div className="container">
        <h3>React Chat App</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }
}
ChatApp.defaultProps = {
  username: "Anonymous",
};

export default ChatApp;
