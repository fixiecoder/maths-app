import { connect } from 'react-redux';
import Challenges from '../components/challenges';
import {
  setDifficulty,
} from '../actions/questions';
import { setCurrentPage } from '../actions/app';
import { initChallenge } from '../actions/challenges';

function mapStateToProps(state) {
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
