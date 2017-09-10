import { connect } from 'react-redux';
import Menu from '../components/stats';
import {
  resetQuestionHistoryByType
} from '../actions/questions';

function mapStateToProps(state) {
  const gameType = state.getIn(['questions', 'gameType']);
  const reducer = gameType === 'PRACTICE' ? 'practice' : 'challenge';
  const history = state.getIn([reducer, 'history']);
  return {
    history,
    gameType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetQuestionHistoryByType: (gameType) => dispatch(resetQuestionHistoryByType(gameType)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
