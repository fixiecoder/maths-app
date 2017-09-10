import React from 'react';
import { COMPLETED_CHALLENGE } from '../constants/pages';

export default class CompletedChallenge extends React.PureComponent {
  componentDidMount() {
    this.props.setCurrentPage(COMPLETED_CHALLENGE);
  }

  render() {
    return (
      <div>
       <h2>Completed Challenges</h2>
      </div>
    );
  }
}
