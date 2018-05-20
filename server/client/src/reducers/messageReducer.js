import {
  FETCH_FEED_MESSAGES, FETCH_FEED_MESSAGES_SUCCESS, FETCH_FEED_MESSAGES_FAILURE, RESET_MESSAGES,
} from "../actions/messages";
  
const INITIAL_STATE = { 
  feedMessageList: { messages: [], error: null, loading: false },  
};
  
export default function (state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case FETCH_FEED_MESSAGES:
      return { ...state, feedMessageList: { messages: [], error: null, loading: true } }; 
    case FETCH_FEED_MESSAGES_SUCCESS:
      return { ...state, feedMessageList: { messages: action.payload, error: null, loading: false } };
    case FETCH_FEED_MESSAGES_FAILURE:
      error = action.payload || { message: action.payload.message };
      return { ...state, feedMessageList: { messages: [], error: error, loading: false } };
    case RESET_MESSAGES:
      return { ...state, feedMessageList: { messages: [], error: null, loading: false } };
    default:
      return state;
  }
}