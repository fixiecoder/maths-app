import { connect } from 'react-redux'
import Modal from '../components/modal'
import { logout } from '../actions/auth'
import { setShowModal } from '../actions/app'

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    setShowModal: () => dispatch(setShowModal()),
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
