import { fromJS } from 'immutable';
import * as actionTypes from './types/messages';
import store from '../store';
import API from './api';

export function toggleMessagesOpen() {
  return { type: actionTypes.SET_MESSAGES_OPEN };
}

export const getConversation = (conversation, lastMessage = 0) => {
  const userId = store.getState().getIn(['user', 'id']);
  const url = `/user/${userId}/messages/conversation/${conversation}?sentDate=${lastMessage}`;
  return store.dispatch(API.get(url));
};

export const setConversationMessage = (conversationId, message) => {
  store.dispatch({
    type: actionTypes.SET_CONVERSATION_MESSAGE,
    id: conversationId,
    message
  });
};

const appendConversation = (conversation) => {
  fromJS(conversation.messages)
    .forEach(message => setConversationMessage(conversation.id, message));
};

export const getRecentMessages = () => {
  const conversationIds = store.getState().getIn(['user', 'conversations']);
  conversationIds.forEach(conversationId => {
    const lastRecievedMessageSentDate = store.getState()
      .getIn(['messages', 'conversations', conversationId])
      .last()
      .get('sentDate', 0);

    getConversation(conversationId, lastRecievedMessageSentDate)
      .then(conversation => appendConversation(conversation));
  });
};

let messagePollTimeout;
const pollForRecentMessages = () => {
  clearTimeout(messagePollTimeout);
  messagePollTimeout = setTimeout(() => {
    if(store.getState().get('user').size > 0) {
      getRecentMessages();
      pollForRecentMessages();
    }
  }, 10000);
};

export const sendMessage = (message, conversationId) => dispatch => {
  const body = {
    content: message
  };

  const userId = store.getState().getIn(['user', 'id']);
  store.dispatch(API.post(`/user/${userId}/messages/conversation/${conversationId}`, body))
    .then(() => {
      const lastRecievedMessageSentDate = store.getState()
        .getIn(['messages', 'conversations', conversationId])
        .last()
        .get('sentDate', 0);

      return getConversation(conversationId, lastRecievedMessageSentDate);
    })
    .then(conversation => appendConversation(conversation));
};

export const initConversations = () => {
  pollForRecentMessages();
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const conversationIds = store.getState().getIn(['user', 'conversations']);
  return Promise.all(conversationIds.map(conversationId =>
    getConversation(conversationId, Date.now() - oneMonth)
  ).toArray())
    .then(conversations => {
      fromJS(conversations).forEach(conversation => {
        store.dispatch({
          type: actionTypes.SET_CONVERSATION,
          id: conversation.get('id'),
          conversation: conversation.get('messages')
        });
      });
    });

};

pollForRecentMessages();
