import React from 'react';
import * as difficulties from '../constants/difficulty-types';

export default function DifficultyPicker(props) {

  const wrapper = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const inner = {
    margin: 20,
    display: 'flex',
    width: 400,
    justifyContent: 'center'
  };

  const button = {
    flex: 1,
    margin: 10,
    padding: 5,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    height: 60
  };

  const selected = Object.assign({}, button, {
    border: '10px solid RGB(0, 146, 69)'
  });

  const unselected = Object.assign({}, button, {
    border: '10px solid RGB(0, 113, 188)'
  });

  return (
    <div style={wrapper}>
      <h3 className="difficulty-heading">How hard do you want it to be?</h3>
      <div style={inner}>
        <label style={props.difficulty === difficulties.EASY ? selected : unselected} className="difficulty-button">
          <span>EASY</span>
          <input
            hidden={true}
            type="radio"
            name="difficulty"
            onChange={() => props.setDifficulty(difficulties.EASY)}
            checked={props.difficulty === difficulties.EASY}
          />
        </label>
        <label style={props.difficulty === difficulties.MEDIUM ? selected : unselected} className="difficulty-button">
          <span>MEDIUM</span>
          <input
            hidden={true}
            type="radio"
            name="difficulty"
            onChange={() => props.setDifficulty(difficulties.MEDIUM)}
            checked={props.difficulty === difficulties.MEDIUM}
          />
        </label>
        <label style={props.difficulty === difficulties.HARD ? selected : unselected} className="difficulty-button">
          <span>HARD</span>
          <input
            hidden={true}
            type="radio"
            name="difficulty"
            onChange={() => props.setDifficulty(difficulties.HARD)}
            checked={props.difficulty === difficulties.HARD}
          />
        </label>
      </div>
    </div>
  );
}
