import React from 'react';
import { CORRECT, INCORRECT } from '../constants/question-status';

const statsWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
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
    <div className="stats-wrapper">
      <div className="stats-inner">
        <div className="stat-item"><span>{totalQuestionCount}</span> questions answered in total.</div>
        <div className="stat-item"><span className="answer-green">{correctQuestionCount}</span> questions answered correctly.</div>
        <div className="stat-item"><span className="answer-red">{incorrectQuestionCount}</span> questions answered incorrectly.</div>
      </div>
    </div>
  );
}
