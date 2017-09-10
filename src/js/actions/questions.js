import uuid from 'uuid';
import { Map } from 'immutable';
import {
  getRandomNumberBetween,
  getRandomCorrectMessage,
  getRandomIncorrectMessage
} from '../libs/helpers';
import * as actionTypes from './types/questions';
import {
  MULTIPLY,
  PLUS,
  MINUS,
  DIVIDE
} from '../constants/methods';
import * as statusTypes from '../constants/question-status';
import {
  TYPE1,
  TYPE2,
  TYPE3
} from '../constants/question-types';
import { REMOVE_PRACTICE_FACTOR, RESET_PRACTICE_FACTOR } from './types/practice';
import { REMOVE_CHALLENGE_FACTOR, RESET_CHALLENGE_FACTOR } from './types/challenge';
import * as difficulties from '../constants/difficulty-types';
import { PRACTICE, CHALLENGE } from '../constants/game-types';
import { endChallenge } from './challenges';

export const setChallengeHistory = (challengeHistory) => {
  return { type: actionTypes.SET_CHALLENGE_HISTORY, challengeHistory };
};

export const generateQuestion = () => (dispatch, getState) => {
  const gameType = getState().getIn(['questions', 'gameType']);
  const isPractice = gameType === PRACTICE;
  const reducer = isPractice === true ? 'practice' : 'challenge';
  const methods = getState().getIn([reducer, 'methods']).toList();
  let method = methods.get(getRandomNumberBetween(0, methods.size - 1)).get('method');
  const difficulty = getState().getIn([reducer, 'difficulty']);
  let includedTablesList = getState().getIn([reducer, 'includedTables']).toList();
  if(gameType === CHALLENGE) {
    includedTablesList = getState().getIn([reducer, 'includedTables']).toList();
  }

  const tableIndex = getRandomNumberBetween(0, includedTablesList.size - 1);
  let table = includedTablesList.get(tableIndex);

  let qValue1;
  let qValue2;

  let addSubractRangeLimit = 20;
  if(difficulty === difficulties.MEDIUM) {
    addSubractRangeLimit = 100;
  } else if(difficulty === difficulties.HARD) {
    addSubractRangeLimit = 999;
  }

  let refreshTable = false;
  const resetFactorActonType = isPractice ? RESET_PRACTICE_FACTOR : RESET_CHALLENGE_FACTOR;

  if(table) {
    if(table.getIn(['factors', 'qV2']).size === 0) {
      dispatch({ type: resetFactorActonType, factorType: 'qV2', table: table.get('key') });
      refreshTable = true;
    }

    if(table.getIn(['factors', 'qV1']).size === 0) {
      dispatch({ type: resetFactorActonType, factorType: 'qV1', table: table.get('key') });
      refreshTable = true;
    }

    if(refreshTable === true) {
      table = getState().getIn([reducer, 'includedTables', table.get('key')]);
    }
  }


  let customType;
  let factor;
  let factorType;

  if(Math.random() > 0.5) {
    customType = [TYPE1, TYPE3][getRandomNumberBetween(0, 1)];
    const val2Index = table ? getRandomNumberBetween(0, table.getIn(['factors', 'qV2']).size - 1) : 0;
    qValue1 = method === MULTIPLY ?
      table.get('value') : getRandomNumberBetween(0, addSubractRangeLimit);
    qValue2 = method === MULTIPLY ?
      table.getIn(['factors', 'qV2', val2Index]) : getRandomNumberBetween(0, addSubractRangeLimit);
    factor = qValue2;
    factorType = 'qV2';
  } else {
    customType = [TYPE1, TYPE2][getRandomNumberBetween(0, 1)];
    const val1Index = table ? getRandomNumberBetween(0, table.getIn(['factors', 'qV1']).size - 1) : 0;
    qValue1 = method === MULTIPLY ?
      table.getIn(['factors', 'qV1', val1Index]) : getRandomNumberBetween(0, addSubractRangeLimit);
    qValue2 = method === MULTIPLY ?
      table.get('value') : getRandomNumberBetween(0, addSubractRangeLimit);
    factor = qValue1;
    factorType = 'qV1';
  }

  if(method === MULTIPLY) {
    const removeFactorActionType = isPractice === true ? REMOVE_PRACTICE_FACTOR : REMOVE_CHALLENGE_FACTOR;
    dispatch({ type: removeFactorActionType, table: table.get('key'), factor, factorType });
  }

  let answer;
  switch(method) {
    case MULTIPLY:
      answer = qValue1 * qValue2;
      break;

    case PLUS:
      answer = qValue1 + qValue2;
      break;

    case MINUS:
      answer = qValue1 - qValue2;
      break;

    case DIVIDE:
      answer = qValue1 / qValue2;
      break;

    default:
      answer = qValue1 + qValue2;
      method = PLUS;
      break;
  }

  const question = Map({
    questionRef: uuid.v4(),
    qValue1,
    qValue2,
    method,
    answer,
    startTime: Date.now(),
    questionType: difficulty === difficulties.EASY ? TYPE1 : customType,
    status: statusTypes.UNANSWERED,
  });

  dispatch({ type: actionTypes.SET_CURRENT_QUESTION, question });
};

export const checkQuestionIsUnique = quesion => (dispatch, getState) => {

};

export const checkAnswer = (question, answer) => dispatch => {

};


export const answerQuestion = (question, answer) => (dispatch, getState) => {
  let status;
  answer = Number(answer);
  const gameType = getState().getIn(['questions', 'gameType']);
  const isPractice = gameType === PRACTICE;
  const reducer = isPractice === true ? 'practice' : 'challenge';
  const currentQuestion = getState().getIn([reducer, 'currentQuestion']);
  const questionCount = getState().getIn([reducer, 'questionCount']);
  switch(question.get('questionType')) {
    case TYPE1:
      status = question.get('answer') === answer ? statusTypes.CORRECT : statusTypes.INCORRECT;
      break;

    case TYPE2:
      status = question.get('qValue1') === answer ? statusTypes.CORRECT : statusTypes.INCORRECT;
      break;

    case TYPE3:
      status = question.get('qValue2') === answer ? statusTypes.CORRECT : statusTypes.INCORRECT;
      break;

    default:
      status = statusTypes.UNANSWERED;
      break;

  }

  const message = status === statusTypes.CORRECT ?
    getRandomCorrectMessage() : getRandomIncorrectMessage();

  question = question.set('status', status);
  question = question.set('endTime', Date.now());
  question = question.set('duration', question.get('endTime') - question.get('startTime'));
  question = question.set('message', message);

  dispatch({ type: actionTypes.SET_CURRENT_QUESTION, question });

  if(gameType === CHALLENGE) {
    dispatch({ type: actionTypes.ADD_QUESTION_TO_CHALLENGE, question, gameType });
    if(currentQuestion === questionCount) {
      dispatch(endChallenge());
    }
  } else {
    dispatch({ type: actionTypes.ADD_QUESTION_TO_HISTORY, question, gameType });
  }

};

export function setTableIncluded(table, included) {
  return { type: actionTypes.SET_INCLUDED_TABLE, table, included };
}

export function setMethodIncluded(method, included) {
  return { type: actionTypes.SET_INCLUDED_METHOD, method, included };
}

export function setDifficulty(difficulty) {
  return { type: actionTypes.SET_DIFFICULTY, difficulty };
}

export function resetQuestionHistoryByType(gameType) {
  return { type: actionTypes.RESET_QUESTION_HISTORY, gameType };
}

export const setCurrentChallenge = (currentChallenge) => (dispatch, getState) => {
  dispatch({ type: actionTypes.SET_CURRENT_CHALLENGE, currentChallenge });
};

export const setGameType = (gameType) => (dispatch, getState) => {
  dispatch({ type: actionTypes.SET_GAME_TYPE, gameType });
};
