import uuid from 'uuid';
import { browserHistory } from 'react-router';
import { Map, List, fromJS } from 'immutable';
import * as statusTypes from '../constants/question-status';
import { setGameType, setChallengeHistory } from './questions';
import { CHALLENGE } from '../constants/game-types';
import { TABLES } from '../constants/tables';
import * as actionTypes from './types/challenge';
import API from './api';

function trophyIsBetterThanCurrentTrophy(newTrophy, oldTrophy) {
  if(newTrophy === 'GOLD') {
    return true;
  } else if(newTrophy === 'SILVER' && oldTrophy !== 'GOLD') {
    return true;
  } else if(newTrophy === 'BRONZE' && (oldTrophy !== 'GOLD' || oldTrophy !== 'SILVER')) {
    return true;
  } else {
    return false;
  }
}

export const getChallengeHistory = (lastDateCreated = 0) => (dispatch, getState) => {
  const userId = getState().getIn(['user', 'id']);
  return dispatch(API.get(`/user/${userId}/history?datecreated=${lastDateCreated}`))
    .then(result => dispatch(setChallengeHistory(fromJS(result))));
};

export const uploadChallengeToHistory = (challenge) => (dispatch, getState) => {
  const userId = getState().getIn(['user', 'id']);
  dispatch(API.post(`/user/${userId}/history`, challenge.toJS()))
    .then(res => console.warn(JSON.stringify(res, null, '  ')));
};

export const setChallenge = challenge => dispatch => {
  dispatch({ type: actionTypes.SET_CHALLENGE, challenge });
};

export const setChallengeTrophy = (challengeId, trophy) => (dispatch, getState) => {
  console.log(trophy)
  const currentTrophy = getState().getIn(['challenges', challengeId, 'trophy']);
  const newTrophyIsBetter = trophyIsBetterThanCurrentTrophy(trophy, currentTrophy);
  if(newTrophyIsBetter) {
    dispatch({ type: actionTypes.SET_CHALLENGE_TROPHY, trophy, challengeId });
  }
};

export const initChallenge = (challenge) => dispatch => {
  let tables = Map();
  challenge.get('includedTables').forEach(tableKey => {
    tables = tables.set(tableKey, TABLES.get(tableKey));
  });

  let methods = Map();
  challenge.get('methods').forEach(method => {
    methods = methods.set(method, Map({ method }));
  });

  const currentChallenge = Map({
    startTime: Date.now(),
    challengeId: challenge.get('challengeId'),
    questionCount: challenge.get('questionCount'),
    currentQuestion: 1,
    history: List(),
    includedTables: tables,
    methods
  });

  dispatch(setChallenge(currentChallenge));
  dispatch(setGameType(CHALLENGE));
  browserHistory.push('/app/questions');

};

export const storeUserChallenges = () => (dispatch, getState) => {
  const userId = getState().getIn(['user', 'id']);
  const challenges = getState().get('challenges');
  return dispatch(API.post(`/user/${userId}/challenges`, challenges.toJS()));
};

export const getUserChallenges = () => (dispatch, getState) => {
  const userId = getState().getIn(['user', 'id']);
  dispatch(API.get(`/user/${userId}/challenges`))
    .then(result => {
      if(result) {
        dispatch({ type: actionTypes.SET_ALL_CHALLENGES, challenges: fromJS(result.challenges) });
      }
    });
};

export const endChallenge = () => (dispatch, getState) => {
  const id = uuid.v4();
  const challenge = getState().get('challenge');
  const correctAnswers = challenge.get('history')
    .filter(question => question.get('status') === statusTypes.CORRECT)
    .size;
  const percentage = (100 / challenge.get('questionCount')) * correctAnswers;

  const updatedChallenge = challenge
    .set('endTime', Date.now())
    .set('id', id)
    .set('percentCorrect', percentage);

  // save challenge to challengeHistory
  dispatch({ type: actionTypes.ADD_TO_CHALLENGE_HISTORY, id, challenge: updatedChallenge });

  if(percentage >= 100) {
    dispatch(setChallengeTrophy(challenge.get('challengeId'), 'GOLD'));
  } else if(percentage >= 75) {
    dispatch(setChallengeTrophy(challenge.get('challengeId'), 'SILVER'));
  } else if(percentage >= 50) {
    dispatch(setChallengeTrophy(challenge.get('challengeId'), 'BRONZE'));
  }

  dispatch(storeUserChallenges());
  dispatch(uploadChallengeToHistory(updatedChallenge));

  // upload challenge to server

  // show challenge result screen
  browserHistory.push('/app/completed');
};
