import React from 'react';
import * as statusTypes from '../constants/question-status';

export default class QuestionInput extends React.Component {
  componentDidMount() {
    this.answerInput.focus();
  }

  render() {
    const inputStyle = {
      fontSize: 50,
      minWidth: 60,
      width: '100%',
      color: 'black',
      outline: 'none',
      border: '4px solid blue',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      borderRadius: 5,
      textAlign: 'right',
      display: 'flex',
      alignItems: 'center'
    };

    const spacerStyle = {
      position: 'relative',
      color: 'white',
      display: 'inline-block',
      alignItems: 'center',
      minWidth: 50,
      fontSize: 60,
      paddingRight: 20,
      paddingLeft: 20,
      letterSpacing: 1.5,
    };

    if(this.props.question.get('status') === statusTypes.CORRECT) {
      inputStyle.border = '4px solid green';
    } else if(this.props.question.get('status') === statusTypes.INCORRECT) {
      inputStyle.border = '4px solid red';
    }

    return (
      <label style={{ height: '100%', display: 'inline-block' }}>
        <span style={spacerStyle}>
          {this.props.value || '#'}
          <input
            ref={(input) => { this.answerInput = input; }}
            type="number"
            style={inputStyle}
            value={this.props.value}
            onChange={e => this.props.onChange(e.target.value)}
            placeholder="?"
          />
        </span>
      </label>
    );
  }
}
