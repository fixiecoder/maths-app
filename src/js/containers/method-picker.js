import { connect } from 'react-redux'
import MethodPicker from '../components/method-picker'
import {
  setMethodIncluded,
} from '../actions/questions'

function mapStateToProps(state) {
  return {
    // methods: state.getIn(['questions', 'methods']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMethodIncluded: (method, include) => dispatch(setMethodIncluded(method, include))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MethodPicker);
