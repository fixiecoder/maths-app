import { Map } from 'immutable';
import * as actionTypes from '../actions/types/app';
import * as pages from '../constants/pages';

const initialState = Map({
  currentPage: pages.LOGIN,
  loading: false,
});

export default function test(state = initialState, action) {
  switch(action.type) {

    case actionTypes.SET_CURRENT_PAGE:
      return state.set('currentPage', action.page);

    case actionTypes.SET_LOADING:
      return state.set('loading', action.loading);

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}
