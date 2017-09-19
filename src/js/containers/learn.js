import { connect } from 'react-redux'
import Learn from '../components/learn';
import { setCurrentPage } from '../actions/app';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPage: page => dispatch(setCurrentPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn);
