import { Map, List } from 'immutable';
import * as actionTypes from '../actions/types/challenge';

const initialState = Map({
  history: List()
});

export default function challenges(state = initialState, action) {
  switch(action.type) {

    case actionTypes.RESET_CHALLENGE_FACTOR:
      return state.setIn(['includedTables', action.table, 'factors', action.factorType], Range(1, 11).toList());

    case actionTypes.SET_TROPHY_ON_CURRENT_CHALLENGE:
      return state.set('trophy', action.trophy);

    case actionTypes.ADD_QUESTION_TO_CHALLENGE:
      return state.updateIn(['history'], history => history.push(action.question));

    case actionTypes.INCREMENT_CURRENT_QUESTION:
      return state.set('currentQuestion', state.get('currentQuestion') + 1);

    case actionTypes.SET_CHALLENGE:
      return action.challenge;

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}
