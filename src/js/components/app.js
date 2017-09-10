import React from 'react';
import Toolbar from '../containers/toolbar';

class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Toolbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
