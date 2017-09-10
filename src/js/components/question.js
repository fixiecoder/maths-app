import React from 'react';
import { TYPE1, TYPE2, TYPE3 } from '../constants/question-types';
import { UNANSWERED, CORRECT } from '../constants/question-status';
import Input from './question-input';
import Stats from '../containers/stats';
import { PRACTICE_QUESTION, CHALLENGE_QUESTION } from '../constants/pages';
import { PRACTICE } from '../constants/game-types';

const symbolMap = {
  MULTIPLY: 'x',
  PLUS: '+',
  MINUS: '-',
};

const styles = {
  symbol: {
    height: '100%',
    fontSize: 60,
    margin: 5,
    display: 'flex',
  },

  value: {
    height: '100%',
    display: 'flex',
    fontSize: 60,
    margin: 5,
  }
};

const buttonsWrapper = {
  display: 'flex',
  justifyContent: 'center'
};

const button = {
  borderRadius: 5,
  outline: 'none',
  height: 50,
  width: 100,
  margin: 10,
  backgroundColor: 'white',
};

const answerButtonStyle = Object.assign({}, button, {
  border: '4px solid green',
});

const nextQuestionButtonStyle = Object.assign({}, button, {
  border: '4px solid blue',
});

const wrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
};

const messageStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: 40
};

const speedStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: 40
};

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.answerChange = this.answerChange.bind(this);
    this.state = {
      answer: ''
    };
  }

  componentDidMount() {
    this.props.generateQuestion();
    const screen = this.props.gameType === PRACTICE ? PRACTICE_QUESTION : CHALLENGE_QUESTION;
    this.props.setCurrentPage(screen);
  }

  componentDidUpdate(prevProps) {
    if(this.props.question && this.props.question.get('questionRef') !== prevProps.question.get('questionRef')) {
      this.setState({
        answer: ''
      });
    }
  }

  answerChange(value) {
    this.setState({
      answer: value
    });
  }

  render() {
    const result = this.props.question.get('status') === CORRECT ? 'correctly' : 'incorrectly';
    const val1 = this.props.question.get('questionType') === TYPE2 ?
      <Input value={this.state.answer} onChange={this.answerChange} question={this.props.question} /> :
      <span style={styles.value} >{this.props.question.get('qValue1')}</span>;

    const val2 = this.props.question.get('questionType') === TYPE3 ?
      <Input value={this.state.answer} onChange={this.answerChange} question={this.props.question} /> :
      <span style={styles.value} >{this.props.question.get('qValue2')}</span>;

    const answer = this.props.question.get('questionType') === TYPE1 ?
      <Input value={this.state.answer} onChange={this.answerChange} question={this.props.question} /> :
      <span style={styles.value} >{this.props.question.get('answer')}</span>;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if(this.props.question.get('status') === UNANSWERED) {
            this.props.answerQuestion(this.props.question, this.state.answer);
          } else {
            this.props.generateQuestion();
          }
        }} style={wrapperStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }} >
            {val1}
            <span style={styles.symbol}>{symbolMap[this.props.question.get('method')]}</span>
            {val2}
            <span style={styles.symbol}>=</span>
            {answer}
          </div>
        </form>
        <div style={messageStyle}>
          <p>{this.props.question.get('message')}</p>
        </div>
        <div style={buttonsWrapper}>
          <button
            style={
              this.props.question.get('status') === UNANSWERED ?
                answerButtonStyle :
                Object.assign({}, answerButtonStyle, {
                  border: '4px solid lightgrey',
                  color: 'lightgrey',
                })
            }
            disabled={this.props.question.get('status') !== UNANSWERED}
            type="button"
            onClick={() => this.props.answerQuestion(this.props.question, this.state.answer)}
          >
            Check my answer
          </button>
          <button
            style={
              this.props.question.get('status') !== UNANSWERED ?
                nextQuestionButtonStyle :
                Object.assign({}, nextQuestionButtonStyle, {
                  border: '4px solid lightgrey',
                  color: 'lightgrey',
                })
            }
            disabled={this.props.question.get('status') === UNANSWERED}
            onClick={this.props.generateQuestion}
          >
            Next Question
          </button>
        </div>
        <div style={speedStyle}>{
            this.props.question.get('status') !== UNANSWERED ? (
               <span>
                You answered in {result} {(this.props.question.get('duration') / 1000).toFixed(1)} seconds
              </span>
            ) : null
          }</div>
        <Stats />
      </div>
    );
  }
}
