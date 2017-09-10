import { Map } from 'immutable';
import * as actionTypes from '../actions/types/user';

const initialState = Map();

export default function user(state = initialState, action) {
  switch(action.type) {

    case actionTypes.SET_USER:
      return action.user;

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}
