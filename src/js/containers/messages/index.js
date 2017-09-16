import { connect } from 'react-redux';
import MessagesIndex from '../../components/messages';

function mapStateToProps(state) {
  return {
    open: state.getIn(['messages', 'open'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesIndex);
