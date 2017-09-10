import { connect } from 'react-redux';
import Menu from '../components/toolbar';
import { logout } from '../actions/auth';

function mapStateToProps(state) {
  return {
    methods: state.getIn(['questions', 'methods']),
    currentPage: state.getIn(['app', 'currentPage'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
