import { connect } from 'react-redux'
import Question from '../components/question'

function mapStateToProps(state) {
  return {
    question: state.getIn(['questions', 'current']),
  };
}

export default connect(mapStateToProps)(Question);
