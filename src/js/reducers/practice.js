import { Map, Range } from 'immutable';
import * as actionTypes from '../actions/types/practice';

const initialState = Map();

function removeFactor(state, action) {
  let factorList = state.getIn(['includedTables', action.table, 'factors', action.factorType]);
  if(action.table === 'zero' || !action.table) {
    return state;
  }
  factorList = factorList.filter(factor => factor !== action.factor);

  const newState = state.setIn(['includedTables', action.table, 'factors', action.factorType], factorList);
  return newState;
}

export default function challenges(state = initialState, action) {
  switch(action.type) {

    case actionTypes.REMOVE_PRACTICE_FACTOR:
      return removeFactor(state, action);

    case 'ADD_QUESTION_TO_HISTORY':
      return state.updateIn(['history'], historyList => historyList.push(action.question));

    case actionTypes.RESET_PRACTICE_FACTOR:
      return state.setIn(['includedTables', action.table, 'factors', action.factorType], Range(1, 11).toList());

    case actionTypes.SET_PRACTICE:
      return action.practice;

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}
