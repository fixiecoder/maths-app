import { Map } from 'immutable';
import * as actionTypes from '../actions/types/auth';

const initialState = Map({
  tokenKey: '',
  tokenValue: '',
  user: null
});

export default function test(state = initialState, action) {
  switch(action.type) {

    case actionTypes.SET_USER:
      return state.set('user', action.user);

    case actionTypes.SET_AUTH_TOKENS:
      return state.set('tokenKey', action.authTokens.get('tokenKey'))
        .set('tokenValue', action.authTokens.get('tokenValue'));

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}
