import { connect } from 'react-redux';
import Menu from '../components/toolbar';
import { logout } from '../actions/auth';
import { setShowModal } from '../actions/app';
import { toggleMessagesOpen } from '../actions/messages';

function mapStateToProps(state) {
  return {
    methods: state.getIn(['questions', 'methods']),
    currentPage: state.getIn(['app', 'currentPage']),
    user: state.get('user'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleMessagesOpen: () => dispatch(toggleMessagesOpen()),
    setShowModal: (showModal) => dispatch(setShowModal(showModal)),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
