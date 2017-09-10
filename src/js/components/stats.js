import React from 'react';
import { CORRECT, INCORRECT } from '../constants/question-status';

const statsWrapperStyle = {
  display: 'flex',
  maxWidth: 500,
  width: '100%',
  margin: 'auto'
};

const statStyle = {
  flex: 1
};

export default function Stats(props) {
  const totalQuestionCount = props.history.size;
  const correctQuestionCount = props.history.filter(question => question.get('status') === CORRECT).size;
  const incorrectQuestionCount = props.history.filter(question => question.get('status') === INCORRECT).size;

  return (
    <div>
      <div style={statsWrapperStyle}>
        <div style={statStyle}>Total answered {totalQuestionCount}</div>
        <div style={statStyle} className="">Answered correctly {correctQuestionCount}</div>
        <div style={statStyle} className="">Answered incorrectly {incorrectQuestionCount}</div>
      </div>
      <button onClick={() => props.resetQuestionHistoryByType(props.gameType)}>Reset</button>
    </div>
  );
}
