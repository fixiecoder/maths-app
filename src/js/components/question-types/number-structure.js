import React from 'react';

export default class NumberStructure extends React.PureComponent {

  submitAnswer(e) {
    console.log(e.target.id);
  }

  render() {
    const questionElements = this.props.question.get('questionElements').map(questionObj => (
      <div
        id={questionObj.get('order')}
        key={questionObj.get('order')}
        className="question-number-structure-question-part"
        onClick={this.submitAnswer}
      >
        {questionObj.get('value')}
      </div>
    ));

    return (
      <div className="question-number-structure-wrapper">
        <div>
          <p>Click on the number that represents the tens</p>
        </div>
        <div className="question-number-structure-question">
          {questionElements}
        </div>
      </div>
    );
  }
}
