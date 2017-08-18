import React from 'react';
import io from 'socket.io-client';

const chat = io.connect('http://192.168.1.8:8080/chat');

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      msg: '',
      isTyping: false,
      messages: [],
      typer: [],
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    chat.on('load', (messages) => {
      this.setState({
        ...this.state,
        messages: [...messages],
      });
    });

    chat.on('message-update', (message) => {
      this.setState({
        ...this.state,
        messages: [...this.state.messages, message],
      });
    });

    chat.on('user-typing', (data) => {
      if (data.isTyping === true) {
        if (this.state.typer.indexOf(`${data.name} is typing`) === -1) {
          this.setState({
            ...this.state,
            typer: [...this.state.typer, `${data.name} is typing`],
          });
        }
      } else {
        const temp = this.state.typer;
        const index = temp.indexOf(`${data.name} is typing`);
        delete temp[index];

        this.setState({
          ...this.state,
          typer: [...temp],
        });
      }
    });
  }

  submit() {
    const { name, msg } = this.state;

    chat.emit('typing', {
      name,
      isTyping: false,
    });

    chat.emit('chat', {
      name,
      msg,
    });

    this.setState({
      ...this.state,
      isTyping: false,
      name: '',
      msg: '',
      typer: [],
    });
  }

  render() {
    const { typer, name, msg, messages } = this.state;
    const messageList = messages.map(message =>
      (<li key={message}>
        {message.message || ''}
      </li>),
    );
    return (
      <div>
        <p>
          {typer.join(', ')}
        </p>
        <input
          type="text"
          value={name}
          placeholder="write your name"
          onChange={(e) => {
            this.setState({
              ...this.state,
              name: e.target.value,
              isTyping: true,
            });
            chat.emit('typing', {
              name,
              isTyping: true,
            });
          }}
        />
        <div />
        <textarea
          value={msg}
          placeholder="write your message"
          onChange={(e) => {
            this.setState({
              ...this.state,
              msg: e.target.value,
              isTyping: true,
            });
            chat.emit('typing', {
              name,
              isTyping: true,
            });
          }}
        />
        <button onClick={this.submit}>submit</button>
        <ul>
          {messageList}
        </ul>
      </div>
    );
  }
}
