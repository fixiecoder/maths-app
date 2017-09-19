import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// import './index.css';
import App from './containers/app';
// import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import Question from './containers/question';
import Login from './containers/login';
import Menu from './containers/menu';
import Learn from './containers/learn';
import Practices from './containers/practices';
import Challenges from './containers/challenges';
import CompleteChallenge from './containers/completed-challenge';
import store from './store';

import '../styles/index.scss';
import '../html/robots.txt';
import '../html/favicon.ico';
import '../html/mathsfavicon.ico';

function requireNoAuth(mextState, replace, callback) {
  const loggedIn = store.getState().getIn(['auth', 'tokenValue']);
  if(loggedIn) {
    replace('/app');
  }
  callback();
}

function requireAuth(mextState, replace, callback) {
  const loggedIn = store.getState().getIn(['auth', 'tokenValue']);
  if(!loggedIn) {
    replace('/login');
  }
  callback();
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRedirect to="login" />
        <Route path="login" component={Login} onEnter={requireNoAuth} />
        <Route path="app" component={App} onEnter={requireAuth}>
          <IndexRedirect to="Menu" />
          <Route path="menu" component={Menu} />
          <Route path="practice" component={Practices} />
          <Route path="challenge" component={Challenges} />
          <Route path="completed" component={CompleteChallenge} />
          <Route path="questions" component={Question} />
          <Route path="learn" component={Learn} />
        </Route>
      </Route>
    </Router>
    </Provider>
), document.getElementById('root'));
