import auth from './reducers/auth';
import questions from './reducers/questions';
import challenge from './reducers/challenge';
import challenges from './reducers/challenges';
import practice from './reducers/practice';
import messages from './reducers/messages';
import app from './reducers/app';
import user from './reducers/user';
import { combineReducers } from "redux-immutable";


export default combineReducers({
  auth,
  messages,
  challenges,
  challenge,
  practice,
  questions,
  app,
  user
});