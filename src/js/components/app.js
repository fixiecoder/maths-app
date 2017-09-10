import React from 'react';
import Toolbar from '../containers/toolbar';
import Modal from '../containers/modal';

class App extends React.Component {
  render() {
    const modal = this.props.showModal ? <Modal /> : null;
    return (
      <div className="app-wrapper">
        {modal}
        <Toolbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
