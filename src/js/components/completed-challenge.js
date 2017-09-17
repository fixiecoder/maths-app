import React from 'react';
import { browserHistory } from 'react-router';
import { COMPLETED_CHALLENGE } from '../constants/pages';
import { UNANSWERED, CORRECT, INCORRECT } from '../constants/question-status';

export default class CompletedChallenge extends React.PureComponent {
  componentDidMount() {
    this.props.setCurrentPage(COMPLETED_CHALLENGE);
  }

  render() {
    const goToMainMenu = () => {
      browserHistory.push('/app/menu')
    };

    const trophy = this.props.challenge.get('trophy');
    let trophyText = 'Unfortunately you did not earn a trophy this time';
    if(trophy) {
      trophyText = <p className="trophy-text">Congratulations! you managed to earn a <span className={`trophy-${trophy.toLowerCase()}`}>{trophy.toLowerCase()}</span> trophy</p>
    }
    const correctAnswerCount = this.props.challenge.get('history')
      .reduce((count, question) => (question.get('status') === CORRECT ? count += 1 : count), 0);
    const incorrectAnswerCount = this.props.challenge.get('history').size - correctAnswerCount;
    return (
      <div className="completed-challenge-wrapper">
       <h2>Completed Challenge: <span className="challenge-name">{this.props.challenge.get('name')}</span></h2>
       {trophyText}
       <p className="summary-text">You answered a total of <span className="answer-count correct-green">{correctAnswerCount}</span> questions correctly <br /> and you got <span className="answer-count incorrect-red">{incorrectAnswerCount}</span> questions wrong</p>
       <button onClick={goToMainMenu} className="menu-play-button" style={{ flexBasis: 100 }}>Main Menu</button>
      </div>
    );
  }
}
