import {
  FETCH_FEED_COMMENTS, FETCH_FEED_COMMENTS_SUCCESS, FETCH_FEED_COMMENTS_FAILURE, RESET_COMMENTS,
  CREATE_FEED_COMMENT, CREATE_FEED_COMMENT_SUCCESS, CREATE_FEED_COMMENT_FAILURE, RESET_NEW_COMMENT,
  DELETE_FEED_COMMENT, DELETE_FEED_COMMENT_SUCCESS, DELETE_FEED_COMMENT_FAILURE, RESET_DELETED_FEED_COMMENT
} from "../actions/comments";


const INITIAL_STATE = { 
  feedCommentList: { comments: [], error: null, loading: false },  
  newComment: { comment: null, error: null, loading: false }, 
  deletedComment: { comment: null, error :null, loading: false },
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case FETCH_FEED_COMMENTS:
      return { ...state, feedCommentList: { comments: [], error: null, loading: true } }; 
    case FETCH_FEED_COMMENTS_SUCCESS:
      return { ...state, feedCommentList: { comments: action.payload, error: null, loading: false } };
    case FETCH_FEED_COMMENTS_FAILURE:
      error = action.payload || { message: action.payload.message };
      return { ...state, feedCommentList: { comments: [], error: error, loading: false } };
    case RESET_COMMENTS:
      return { ...state, feedCommentList: { comments: [], error: null, loading: false } };

    case CREATE_FEED_COMMENT:
      return { ...state, newComment: { ...state.newComment, loading: true } };
    case CREATE_FEED_COMMENT_SUCCESS:
      return { ...state, newComment: { comment: action.payload, error: null, loading: false } };
    case CREATE_FEED_COMMENT_FAILURE:
      error = action.payload || { message: action.payload.message };
      return { ...state, newComment: { comment: null, error: error, loading: false } };
    case RESET_NEW_COMMENT:
      return { ...state, newComment: { comment: null, error: null, loading: false } };
      
    case DELETE_FEED_COMMENT:
      return { ...state, deletedFeed: { ...state.deletedFeed, loading: true } };
    case DELETE_FEED_COMMENT_SUCCESS: 
      return { ...state, deletedFeed: { comment: action.payload, error: null, loading: false } };
    case DELETE_FEED_COMMENT_FAILURE:
      error = action.payload || { message: action.payload.message };
      return { ...state, deletedFeed: { comment: null, error:error, loading: false } };
    case RESET_DELETED_FEED_COMMENT:
      return { ...state, deletedFeed: { comment: null, error:null, loading: false } };

    default:
      return state;
  }
}