import { Map, List } from 'immutable';
import * as actionTypes from '../actions/types/messages';

const initialState = Map({
  open: false
});

export default function challenges(state = initialState, action) {
  switch(action.type) {

    case actionTypes.SET_MESSAGES_OPEN:
      return state.set('open', !state.get('open'));

    default:
      return state;
  }
}
