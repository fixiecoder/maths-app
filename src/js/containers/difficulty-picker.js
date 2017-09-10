import { connect } from 'react-redux';
import DifficultyPicker from '../components/difficulty-picker';
import {
  setDifficulty,
} from '../actions/questions';

function mapStateToProps(state) {
  return {
    difficulty: state.getIn(['questions', 'difficulty'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDifficulty: (difficulty) => dispatch(setDifficulty(difficulty))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DifficultyPicker);
