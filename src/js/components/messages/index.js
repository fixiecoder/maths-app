import React from 'react';
import moment from 'moment';

export default class MessagesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      inputValue: ''
    };
  }

  scrollToBottom() {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  inputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  sendMessage() {
    if(this.state.inputValue === '') {
      return;
    }
    this.props.sendMessage(this.state.inputValue, this.props.currentConversation);
    this.setState({
      inputValue: ''
    });
    this.inputElement.focus();
  }

  componentDidMount() {
    if(this.props.open) {
      this.scrollToBottom();
      this.inputElement.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }
  }

  componentDidUpdate() {
    if(this.props.open) {
      this.scrollToBottom();
    }
  }

  render() {
    if(!this.props.open) {
      return null;
    }
    const messageItems = this.props.conversations.first().map(message => (
      <li
        key={message.get('messageId')}
        className={
          `messages-list-item ${this.props.userId === message.get('userId') ?
          'message-from-me' : 'message-from-them'}`
        }
      >
        <div className="message-from-name">{message.get('fromName')}</div>
        <div className="message-content">{message.get('content')}</div>
        <div className="message-sent-time">{moment(message.get('sentDate')).fromNow()}</div>
      </li>
    ));
    return (
      <div className="messages-wrapper">
        <ul ref={(elem) => { this.scrollList = elem; }} className="messages-list">
          {messageItems}
        </ul>
        <div className="messages-input-wrapper">
          <textarea
            onSubmit={this.sendMessage}
            ref={elem => { this.inputElement = elem; }}
            value={this.state.inputValue}
            className="messages-input"
            onChange={this.inputChange}
          />
          <button type="button" onClick={this.sendMessage} className="messages-input-send">send</button>
        </div>
      </div>
    );
  }
}

