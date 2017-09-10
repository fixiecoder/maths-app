import React from 'react';
import Trophy from 'react-icons/lib/fa/trophy';
import { CHALLENGE_MENU } from '../constants/pages';
import { fSwitch } from '../libs/utils';

export default class Challenges extends React.PureComponent {
  componentDidMount() {
    this.props.setCurrentPage(CHALLENGE_MENU);
  }

  render() {
    const challenges = this.props.challenges
      .toList()
      .sort((a, b) => (a.get('order') - b.get('order')))
      .map(challenge => {
        const trophyColor = fSwitch(challenge.get('trophy'))
          .case('GOLD', 'gold')
          .case('SILVER', 'silver')
          .case('BRONZE', 'brown')
          .default('#ededed')
          .value();

        return (
          <div
            key={challenge.get('challengeId')}
            className="challenges-item"
            onClick={() => this.props.initChallenge(challenge)}
          >
            <span>{challenge.get('name')}</span>
            <Trophy fill={trophyColor} size={50} />
          </div>
        );
      });


    return (
      <div className="challenges-wrapper">
        <h2>Challenges</h2>
        <div className="challenges-inner drop-shaddow">
          {challenges}
        </div>
      </div>
    );
  }
}
