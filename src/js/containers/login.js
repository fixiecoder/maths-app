import { connect } from 'react-redux'
import Login from '../components/login'
import { attemptLogin } from '../actions/auth'
import { setCurrentPage } from '../actions/app'

function mapStateToProps(state) {
  return {
    loading: state.getIn(['app', 'loading']),
    loginError: state.getIn(['auth', 'loginError'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: (username, password) => dispatch(attemptLogin(username, password)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
