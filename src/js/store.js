import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers';
import thunk from 'redux-thunk';
import persistMiddleware from './middleware/persist';

let state = localStorage.getItem('state');

if(state) {
  state = Immutable.fromJS(JSON.parse(state));
} else {
  state = Immutable.Map();
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, state, composeEnhancers(
  applyMiddleware(thunk, persistMiddleware)
));

// const store = createStore(reducers, Immutable.Map(), applyMiddleware(thunk, persistMiddleware));

// const store = createStore(reducers,
//   applyMiddleware(thunk)
// );

window.DEBUG = {
  store
};

export default store;

// const store = createStore(reducers, Immutable.Map(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
//   serialize: {
//     immutable: Immutable
//   },
// }));