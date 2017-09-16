import React from 'react';
import { List, fromJS, Map } from 'immutable';
import uuid from 'uuid';

export default class MessagesIndex extends React.PureComponent {
  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      inputValue: 'test value',
      messages: fromJS([
        { id: 1, from: 'Layla', content: 'This is a message from me to someone else, it is not very long', me: true },
        { id: 2, from: 'Daddy', content: 'Rich in heavy atoms two ghostly white figures in coveralls and helmets are soflty dancing quasar explorations', me: false },
        { id: 3, from: 'Layla', content: 'This is a message from me to someone else, it is not very long', me: true },
        { id: 4, from: 'Daddy', content: 'Rich in heavy atoms two ghostly white figures in coveralls and helmets are soflty dancing quasar explorations', me: false },
        { id: 5, from: 'Layla', content: 'This is a message from me to someone else, it is not very long', me: true },
        { id: 6, from: 'Daddy', content: 'Rich in heavy atoms two ghostly white figures in coveralls and helmets are soflty dancing quasar explorations', me: false },
        { id: 7, from: 'Layla', content: 'This is a message from me to someone else, it is not very long', me: true },
        { id: 8, from: 'Daddy', content: 'Rich in heavy atoms two ghostly white figures in coveralls and helmets are soflty dancing quasar explorations', me: false },
        { id: 9, from: 'Layla', content: 'This is a message from me to someone else, it is not very long', me: true },
        { id: 10, from: 'Daddy', content: 'Rich in heavy atoms two ghostly white figures in coveralls and helmets are soflty dancing quasar explorations', me: false },
        { id: 11, from: 'Layla', content: 'This is a message from me to someone else, it is not very long', me: true },
        { id: 12, from: 'Daddy', content: 'Rich in heavy atoms two ghostly white figures in coveralls and helmets are soflty dancing quasar explorations', me: false },
        { id: 13, from: 'Layla', content: 'This is a message from me to someone else, it is not very long', me: true },
        { id: 14, from: 'Daddy', content: 'Rich in heavy atoms two ghostly white figures in coveralls and helmets are soflty dancing quasar explorations', me: false },
        { id: 15, from: 'Layla', content: 'This is a message from me to someone else, it is not very long', me: true },
        { id: 16, from: 'Daddy', content: 'Rich in heavy atoms two ghostly white figures in coveralls and helmets are soflty dancing quasar explorations', me: false },
      ])
    };
  }

  scrollToBottom() {
    var objDiv = document.getElementById("your_div");
    this.elem.scrollTop = this.elem.scrollHeight;
  }

  inputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  sendMessage() {
    const message = Map({
      id: uuid.v4(),
      from: 'Layla',
      content: this.state.inputValue,
      me: true 
    });
    
    this.setState({
      inputValue: '',
      messages: this.state.messages.push(message)
    });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  render() {
    const messageItems = this.state.messages.map(message => {
      return (
        <li key={message.get('id')} className={`messages-list-item ${message.get('me') === true ? 'message-from-me' : 'message-from-them'}`}>
          <div className="message-from-name">{message.get('from')}</div>
          <div>{message.get('content')}</div>
        </li>
      )
    })
    return (
      <div className="messages-wrapper">
        <ul ref={(elem) => this.elem = elem} className="messages-list">
          {messageItems}
        </ul>
        <div className="messages-input-wrapper">
          <textarea value={this.state.inputValue} className="messages-input" onChange={this.inputChange} />
          <button onClick={this.sendMessage} className="messages-input-send">send</button>
        </div>
      </div>
    );
  }
}