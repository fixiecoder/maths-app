import { Map, List } from 'immutable';
import * as actionTypes from '../actions/types/messages';

const initialState = Map({
  open: false,
  conversations: Map()
});

export default function challenges(state = initialState, action) {
  switch(action.type) {

    case actionTypes.SET_CONVERSATION:
      return state.setIn(['conversations', action.id], action.conversation);

    case actionTypes.SET_CONVERSATION_MESSAGE:
      return state.updateIn(['conversations', action.id], (messages) => messages.push(action.message));

    case actionTypes.SET_MESSAGES_OPEN:
      return state.set('open', !state.get('open'));

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}
