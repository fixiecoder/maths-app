import { connect } from 'react-redux'
import { fromJS } from 'immutable';
import NumberStructure from '../../components/question-types/number-structure';

function mapStateToProps(state) {
  const question = fromJS({
    questionElements: [
      {
        order: 1000,
        value: 8,
      },
      {
        order: 100,
        value: 6,
      },
      {
        order: 10,
        value: 4,
      },
      {
        order: 1,
        value: 2,
      }
    ]
  });

  return {
    question
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NumberStructure);
