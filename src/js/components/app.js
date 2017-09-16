import React from 'react';
import Toolbar from '../containers/toolbar';
import Modal from '../containers/modal';
import Messages from '../containers/messages';

class App extends React.Component {
  render() {
    const modal = this.props.showModal ? <Modal /> : null;
    return (
      <div className="app-wrapper">
        {modal}
        <Toolbar />
        <div className="main-content-wrapper">
          {this.props.children}
          <Messages />
        </div>
      </div>
    );
  }
}

export default App;
