import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import Challenges from '../components/challenges';
import {
  setDifficulty,
} from '../actions/questions';
import { setCurrentPage } from '../actions/app';
import { initChallenge } from '../actions/challenges';

function mapStateToProps(state) {
  let bestTimes = Map();
  state.getIn(['questions', 'challengeHistory']).forEach(challenge => {
    bestTimes = bestTimes.updateIn([challenge.get('challengeId')], times =>
      (!times ? List([challenge.get('endTime') - challenge.get('startTime')]) : times.push(challenge.get('endTime') - challenge.get('startTime'))));
  });
  bestTimes = bestTimes.map(challengeTimes => challengeTimes.reduce((bestTime, time) => time < bestTime ? time : bestTime, 10000000000));
  console.log(bestTimes.toJS())
  return {
    difficulty: state.getIn(['questions', 'difficulty']),
    challenges: state.get('challenges')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDifficulty: difficulty => dispatch(setDifficulty(difficulty)),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
    initChallenge: challengeId => dispatch(initChallenge(challengeId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);


