import React from 'react';
import { FORMAT1, FORMAT2, FORMAT3 } from '../../constants/question-formats';
import { UNANSWERED, CORRECT, INCORRECT } from '../../constants/question-status';
import Input from './question-input';
import Stats from '../../containers/stats';
import { PRACTICE_QUESTION, CHALLENGE_QUESTION } from '../../constants/pages';
import { PRACTICE } from '../../constants/game-types';

const symbolMap = {
  MULTIPLY: 'x',
  ADD: '+',
  SUBTRACT: '-',
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

// const wrapperStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-around'
// };

// const messageStyle = {
//   display: 'flex',
//   justifyContent: 'center',
// };

const speedStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: 40
};

export default class ThreePartEquation extends React.Component {
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
    if(!isNaN(value)) {
      this.setState({
        answer: value
      });
    }
  }

  render() {
    const status = this.props.question.get('status');
    const answered = status !== UNANSWERED;
    const resultDisplayWord = status === CORRECT ? 'correctly' : 'incorrectly';
    const val1 = this.props.question.get('questionType') === FORMAT2 ?
      <Input value={this.state.answer} onChange={this.answerChange} question={this.props.question} /> :
      <span style={styles.value} >{this.props.question.get('qValue1')}</span>;

    const val2 = this.props.question.get('questionType') === FORMAT3 ?
      <Input value={this.state.answer} onChange={this.answerChange} question={this.props.question} /> :
      <span style={styles.value} >{this.props.question.get('qValue2')}</span>;

    const answer = this.props.question.get('questionType') === FORMAT1 ?
      <Input value={this.state.answer} onChange={this.answerChange} question={this.props.question} /> :
      <span style={styles.value} >{this.props.question.get('answer')}</span>;


    const callToActionButton = answered ? (
      <button
        className="menu-play-button fixed-width"
        disabled={status === UNANSWERED}
        onClick={this.props.generateQuestion}
      >
        <span style={{ width: '100%' }}>Next</span>
      </button>
    ) : (
      <button
        className="menu-play-button fixed-width"
        disabled={status !== UNANSWERED}
        type="button"
        onClick={() => this.props.answerQuestion(this.props.question, this.state.answer)}
      >
        <span style={{ width: '100%' }}>Am I right?</span>
      </button>
    );

    let stats = null;
    if(this.props.gameType === PRACTICE) {
      stats = <Stats />
    }

    let resultText = null;

    switch(status) {
      // case CORRECT:
      
      case INCORRECT:
        resultText = <div className="question-incorrect-result">The correct answer was <span className="correct-answer">{this.props.question.get('answer')}</span></div>
        break;

    } 

    return (
      <div className="three-part-equation-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if(answered === false) {
              this.props.answerQuestion(this.props.question, this.state.answer);
            } else {
              this.props.generateQuestion();
            }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }} >
            {val1}
            <span style={styles.symbol}>{symbolMap[this.props.question.get('method')]}</span>
            {val2}
            <span style={styles.symbol}>=</span>
            {answer}
          </div>
        </form>
        <div className="page-section">
          <p className={`result-message${status === INCORRECT ? ' incorrect-answer' : ' correct-answer'}`}>{this.props.question.get('message')}</p>
        </div>
        <div className="page-section">
          {resultText}
        </div>
        <div style={buttonsWrapper}>
          {callToActionButton}
        </div>
          {/*stats*/}
      </div>
    );
  }
}
