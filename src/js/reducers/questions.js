import { Map, List, Range } from 'immutable';
import * as actionTypes from '../actions/types/questions';
import * as methods from '../constants/methods';
import * as difficuty from '../constants/difficulty-types';
import { PRACTICE, gameTypeMap } from '../constants/game-types';

const initialState = Map({
  practiceHistory: List(),
  challengeHistory: Map(),
  difficulty: difficuty.EASY,
  methods: Map({
    [methods.MULTIPLY]: Map({
      method: methods.MULTIPLY,
      included: true
    }),
    [methods.PLUS]: Map({
      method: methods.PLUS,
      included: false
    })
  }),
  currentChallenge: Map({
    id: null,
    questionCount: 10,
    currentQuestion: 0,
    questions: List(),
    includedTables: List()
  }),
  practice: Map(),
  current: Map(),
  gameType: PRACTICE,
});

function removeFactor(state, action) {
  let factorList = state.getIn(['timesTables', action.table, 'factors', action.factorType]);

  // if(action.factor === undefined) {
  //   factorList = Range(0, 11).toList();
  // }

  if(action.table === 'zero' || !action.table) {
    return state;
  }

  factorList = factorList.filter(factor => factor !== action.factor);

  const newState = state.setIn(['timesTables', action.table, 'factors', action.factorType], factorList);
  return newState;
}

export default function questions(state = initialState, action) {
  switch(action.type) {

    case actionTypes.SET_CHALLENGE_HISTORY:
      return state.set('challengeHistory', action.challengeHistory);

    case actionTypes.ADD_TO_CHALLENGE_HISTORY:
      return state.updateIn(['challengeHistory'], (history) => history.push(action.challenge));

    // case actionTypes.SET_CURRENT_CHALLENGE:
    //   return state.set('currentChallenge', action.currentChallenge);

    // case actionTypes.RESET_QUESTION_HISTORY:
    //   return state.set(gameTypeMap[action.gameType], List());

    // case actionTypes.ADD_QUESTION_TO_HISTORY:
    //   return state.updateIn([gameTypeMap[action.gameType]], questions => questions.push(action.question))

    // case actionTypes.ADD_QUESTION_TO_CHALLENGE:
    //   return state.updateIn(['callenge', 'questions'], history => history.push(action.question))

    // case actionTypes.SET_INCLUDED_TABLE:
    //   return state.setIn(['timesTables', action.table, 'included'], action.included);

    // case actionTypes.SET_INCLUDED_METHOD:
    //   return state.setIn(['methods', action.method, 'included'], action.included);

    // case actionTypes.RESET_FACTOR:
    //   return state.setIn(['timesTables', action.table, 'factors', action.factorType], Range(0, 11).toList());

    // case actionTypes.REMOVE_FACTOR:
    //   return removeFactor(state, action);

    case actionTypes.SET_CURRENT_QUESTION:
      return state.set('current', action.question);

    // case actionTypes.SET_DIFFICULTY:
    //   return state.set('difficulty', action.difficulty);

    case actionTypes.SET_GAME_TYPE:
      return state.set('gameType', action.gameType);

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}
