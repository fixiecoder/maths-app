import { setCurrentPage } from '../../actions/app'
import { connect } from 'react-redux'
import ThreePartEquation from '../../components/question-types/three-part-equation';
import {
  generateQuestion,
  answerQuestion,
} from '../../actions/questions';
import {
  resetQuestionHistoryByType
} from '../../actions/questions';

function mapStateToProps(state) {
  return {
    question: state.getIn(['questions', 'current']),
    gameType: state.getIn(['questions', 'gameType'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetQuestionHistoryByType: (gameType) => dispatch(resetQuestionHistoryByType(gameType)),
    generateQuestion: () => dispatch(generateQuestion()),
    answerQuestion: (question, answer) => dispatch(answerQuestion(question, answer)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreePartEquation);
