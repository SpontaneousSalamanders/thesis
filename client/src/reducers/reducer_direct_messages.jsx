import {
  GET_DIRECT_MESSAGES,
  MESSAGE_SENT,
  FIELD_INPUT,
  GET_NEW_CONVERSATION
} from '../actions/directMessageActions.jsx';

const initialState = {
  directMessages: [],
  fetchingInbox: false,
  messageError: null,
  messageText: '',
  newConversation: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DIRECT_MESSAGES:
      return Object.assign({}, state, { directMessages: action.payload.data });
    case MESSAGE_SENT:
      return Object.assign({}, state, {
        messageText: ''
      })
    case FIELD_INPUT:
    console.log('action.field', action.field)
      return Object.assign({}, state, {
        messageText: action.field
      })
    case GET_NEW_CONVERSATION:
      return Object.assign({}, state, { newConversation: action.payload.data });
  }
    return state;
}
