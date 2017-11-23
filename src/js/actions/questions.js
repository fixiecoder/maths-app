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
  ADD,
  SUBTRACT,
  DIVIDE,
  methodsQuestionTypeMap,
} from '../constants/methods';
import * as statusTypes from '../constants/question-status';
import {
  FORMAT1,
  FORMAT2,
  FORMAT3
} from '../constants/question-formats';
import { REMOVE_PRACTICE_FACTOR, RESET_PRACTICE_FACTOR } from './types/practice';
import { REMOVE_CHALLENGE_FACTOR, RESET_CHALLENGE_FACTOR } from './types/challenge';
import * as difficulties from '../constants/difficulty-types';
import { PRACTICE, CHALLENGE } from '../constants/game-types';
import { endChallenge } from './challenges';
import store from '../store';
import { NUMBER_STRUCTURE, THREE_PART_EQUATION } from '../constants/question-types';
export const setChallengeHistory = (challengeHistory) => {
  return { type: actionTypes.SET_CHALLENGE_HISTORY, challengeHistory };
};

function getQuestionReducer() {
  const gameType = store.getState().getIn(['questions', 'gameType']);
  const isPractice = gameType === PRACTICE;
  return isPractice === true ? 'practice' : 'challenge';
}

function generateMultiplicationQuestion(difficulty) {
  const reducer = getQuestionReducer();
  const isPractice = reducer === 'practice';
  const includedTablesList = store.getState().getIn([reducer, 'includedTables']).toList();

  const tableIndex = getRandomNumberBetween(0, includedTablesList.size - 1);
  let table = includedTablesList.get(tableIndex);
  const qValue2 = table.get('value');

  let refreshTable = false;
  const resetFactorActonType = isPractice ? RESET_PRACTICE_FACTOR : RESET_CHALLENGE_FACTOR;

  if(table.getIn(['factors', 'qV2']).size === 0) {
    store.dispatch({ type: resetFactorActonType, factorType: 'qV2', table: table.get('key') });
    refreshTable = true;
  }

  if(refreshTable === true) {
    table = store.getState().getIn([reducer, 'includedTables', table.get('key')]);
  }

  const customType = [FORMAT1, FORMAT3][getRandomNumberBetween(0, 1)];

  const val2Index = table ? getRandomNumberBetween(0, table.getIn(['factors', 'qV2']).size - 1) : 0;
  const qValue1 = table.getIn(['factors', 'qV2', val2Index]);
  const factor = qValue1;
  const factorType = 'qV2';

  const removeFactorActionType = isPractice === true ? REMOVE_PRACTICE_FACTOR : REMOVE_CHALLENGE_FACTOR;
  store.dispatch({ type: removeFactorActionType, table: table.get('key'), factor, factorType });

  const answer = qValue2 * qValue1;

  console.log(customType, qValue2, qValue1, 'answer:', answer);

  return Map({
    questionRef: uuid.v4(),
    qValue1,
    qValue2,
    method: MULTIPLY,
    answer,
    startTime: Date.now(),
    questionFormat: difficulty === difficulties.EASY ? FORMAT1 : customType,
    questionType: methodsQuestionTypeMap[MULTIPLY],
    status: statusTypes.UNANSWERED,
  });
}

function generateAdditionQuesion(difficulty) {
  let addSubractRangeLimit = 20;
  if(difficulty === difficulties.MEDIUM) {
    addSubractRangeLimit = 100;
  } else if(difficulty === difficulties.HARD) {
    addSubractRangeLimit = 999;
  }
  const customType = [FORMAT1, FORMAT3][getRandomNumberBetween(0, 1)];
  const qValue1 = getRandomNumberBetween(0, addSubractRangeLimit);
  const qValue2 = getRandomNumberBetween(0, addSubractRangeLimit);
  const answer = qValue1 + qValue2;
  return Map({
    questionRef: uuid.v4(),
    qValue1,
    qValue2,
    method: ADD,
    answer,
    startTime: Date.now(),
    questionFormat: difficulty === difficulties.EASY ? FORMAT1 : customType,
    questionType: THREE_PART_EQUATION,
    status: statusTypes.UNANSWERED,
  });
}

function generateSubtractionQuesion(difficulty) {
  let addSubractRangeLimit = 20;
  if(difficulty === difficulties.MEDIUM) {
    addSubractRangeLimit = 100;
  } else if(difficulty === difficulties.HARD) {
    addSubractRangeLimit = 999;
  }
  const customType = [FORMAT1, FORMAT3][getRandomNumberBetween(0, 1)];
  const qValue1 = getRandomNumberBetween(0, addSubractRangeLimit);
  const qValue2 = getRandomNumberBetween(0, addSubractRangeLimit);
  const answer = qValue1 - qValue2;
  return Map({
    questionRef: uuid.v4(),
    qValue1,
    qValue2,
    method: SUBTRACT,
    answer,
    startTime: Date.now(),
    questionFormat: difficulty === difficulties.EASY ? FORMAT1 : customType,
    questionType: THREE_PART_EQUATION,
    status: statusTypes.UNANSWERED,
  });
}

export const generateQuestion = () => (dispatch, getState) => {
  const reducer = getQuestionReducer();
  const methods = getState().getIn([reducer, 'methods']).toList();
  const method = methods.get(getRandomNumberBetween(0, methods.size - 1)).get('method');
  const difficulty = getState().getIn([reducer, 'difficulty']);

  let question;
  switch(method) {
    case MULTIPLY:
      question = generateMultiplicationQuestion(difficulty);
      break;

    case ADD:
      question = generateAdditionQuesion(difficulty);
      break;

    case SUBTRACT:
      question = generateSubtractionQuesion(difficulty);
      break;

  }

  dispatch({ type: actionTypes.SET_CURRENT_QUESTION, question });
};

function answerThreePartEquation(question, answer) {
  let status;
  answer = Number(answer);
  const gameType = store.getState().getIn(['questions', 'gameType']);
  const isPractice = gameType === PRACTICE;
  const reducer = isPractice === true ? 'practice' : 'challenge';
  const currentQuestion = store.getState().getIn([reducer, 'currentQuestion']);
  const questionCount = store.getState().getIn([reducer, 'questionCount']);
  switch(question.get('questionFormat')) {
    case FORMAT1:
      status = question.get('answer') === answer ? statusTypes.CORRECT : statusTypes.INCORRECT;
      break;

    case FORMAT2:
      status = question.get('qValue2') === answer ? statusTypes.CORRECT : statusTypes.INCORRECT;
      break;

    case FORMAT3:
      status = question.get('qValue1') === answer ? statusTypes.CORRECT : statusTypes.INCORRECT;
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

  store.dispatch({ type: actionTypes.SET_CURRENT_QUESTION, question });

  if(gameType === CHALLENGE) {
    store.dispatch({ type: actionTypes.ADD_QUESTION_TO_CHALLENGE, question, gameType });
    if(currentQuestion === questionCount) {
      store.dispatch(endChallenge());
      return;
    }
    store.dispatch({ type: actionTypes.INCREMENT_CURRENT_QUESTION });
  } else {
    store.dispatch({ type: actionTypes.ADD_QUESTION_TO_HISTORY, question, gameType });
  }
}

export function answerNumberStructureQuestion(question, answer) {
  
}

export const answerQuestion = (question, answer) => (dispatch, getState) => {
  switch(question.get('questionType')) {
    case THREE_PART_EQUATION:
      answerThreePartEquation(question, answer);
      break;
    case NUMBER_STRUCTURE:
      answerNumberStructureQuestion(question, answer);
      break;
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
