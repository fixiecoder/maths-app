import { connect } from 'react-redux';
import MessagesIndex from '../../components/messages';
import { sendMessage } from '../../actions/messages';

function mapStateToProps(state) {
  return {
    open: state.getIn(['messages', 'open']),
    conversations: state.getIn(['messages', 'conversations']),
    currentConversation: state.getIn(['messages', 'conversations']).keySeq().first(),
    userId: state.getIn(['user', 'id'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: (message, conversation) => dispatch(sendMessage(message, conversation))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesIndex);
