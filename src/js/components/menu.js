import React from 'react';
import { Link, browserHistory } from 'react-router';
import { MENU } from '../constants/pages';

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
  }

  componentDidMount() {
    this.props.setCurrentPage(MENU);
  }

  goTo(path) {
    browserHistory.push(path);
  }

  render() {
    const disable = !this.props.methods.reduce((res, method) =>
      res || method.get('included'), false
    );

    const disabledClass = disable ? 'disabled' : '';

    return (
      <div className="menu-play-buttons-wrapper">
        <div className="menu-play-buttons">
          <button className="menu-play-button" onClick={() => this.goTo('/app/practice')}>Practice</button>
          <button className="menu-play-button" onClick={() => this.goTo('/app/challenge')}>Challenge</button>
        </div>
      </div>
    );
  }
}
