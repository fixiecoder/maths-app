import { connect } from 'react-redux';
import CompletedChallenge from '../components/completed-challenge';
import { setCurrentPage } from '../actions/app';

function mapStateToProps(state) {
  return {
    difficulty: state.getIn(['questions', 'difficulty'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedChallenge);
