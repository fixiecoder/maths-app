import { connect } from 'react-redux'
import Practices from '../components/practices';
import {
  setDifficulty,
} from '../actions/questions'
import { setCurrentPage } from '../actions/app';
import { initPractice } from '../actions/practice';

function mapStateToProps(state) {
  return {
    difficulty: state.getIn(['questions', 'difficulty']),
    methods: state.getIn(['questions', 'methods'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDifficulty: (difficulty) => dispatch(setDifficulty(difficulty)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    initPractice: (difficulty, methods, tables) => dispatch(initPractice(difficulty, methods, tables)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Practices);
