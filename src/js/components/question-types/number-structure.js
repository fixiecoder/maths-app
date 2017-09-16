import React from 'react';

export default function NumberStructure(props) {

  return (
    <div className="question-number-structure-wrapper">
      <div>
        <p>Click on the number that represents the tens</p>
      </div>
      <div className="question-number-structure-question">
        <div className="question-number-structure-question-part">1</div>
        <div className="question-number-structure-question-part">0</div>
        <div className="question-number-structure-question-part correct">2</div>
        <div className="question-number-structure-question-part">4</div>
      </div>
    </div>
  );
}