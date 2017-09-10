import { connect } from 'react-redux';
import App from '../components/app';

function mapStateToProps(state) {
  return {
    showModal: state.getIn(['app', 'showModal'])
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
