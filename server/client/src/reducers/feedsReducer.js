import {
    FETCH_FEEDS, FETCH_FEEDS_SUCCESS, FETCH_FEEDS_FAILURE, RESET_FEEDS,
    FETCH_ALL_FEEDS, FETCH_ALL_FEEDS_SUCCESS, FETCH_ALL_FEEDS_FAILURE, RESET_ALL_FEEDS,
    FETCH_FEED, FETCH_FEED_SUCCESS,  FETCH_FEED_FAILURE, RESET_ACTIVE_FEED, 
    CREATE_FEED, CREATE_FEED_SUCCESS, CREATE_FEED_FAILURE, RESET_NEW_FEED,
    DELETE_FEED, DELETE_FEED_SUCCESS, DELETE_FEED_FAILURE, RESET_DELETED_FEED,
    VALIDATE_FEED_FIELDS,VALIDATE_FEED_FIELDS_SUCCESS, VALIDATE_FEED_FIELDS_FAILURE, RESET_FEED_FIELDS,
    UPDATE_FEED, UPDATE_FEED_SUCCESS, UPDATE_FEED_FAILURE, RESET_UPDATE_FEED_STATE,
    LIKE_FEED, LIKE_FEED_SUCCESS, LIKE_FEED_FAILURE, RESET_LIKED_FEED_STATE,
    UNLIKE_FEED, UNLIKE_FEED_SUCCESS, UNLIKE_FEED_FAILURE, RESET_UNLIKED_FEED_STATE,
} from '../actions/feeds';


const INITIAL_STATE = { 
              feedsList: {feeds: [], error:null, loading: false},  
              allFeedsList: {feeds: [], error:null, loading: false},  
							newFeed:{feed:null, error: null, loading: false}, 
							activeFeed:{feed:null, error:null, loading: false}, 
							deletedFeed: {feed: null, error:null, loading: false},
          };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_FEEDS:// start fetching feeds and set loading = true
  	return { ...state, feedsList: {feeds:[], error: null, loading: true} }; 
  case FETCH_FEEDS_SUCCESS:// return list of posts and make loading = false
    return { ...state, feedsList: {feeds: action.payload, error:null, loading: false} };
  case FETCH_FEEDS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, feedsList: {feeds: [], error: error, loading: false} };
  case RESET_FEEDS:// reset postList to initial state
    return { ...state, feedsList: {feeds: [], error:null, loading: false} };

  case FETCH_ALL_FEEDS:// start fetching feeds and set loading = true
  	return { ...state, allFeedsList: {feeds:[], error: null, loading: true} }; 
  case FETCH_ALL_FEEDS_SUCCESS:// return list of posts and make loading = false
    return { ...state, allFeedsList: {feeds: action.payload, error:null, loading: false} };
  case FETCH_ALL_FEEDS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, allFeedsList: {feeds: [], error: error, loading: false} };
  case RESET_ALL_FEEDS:// reset postList to initial state
    return { ...state, allFeedsList: {feeds: [], error:null, loading: false} };

  case FETCH_FEED:
    return { ...state, activeFeed:{...state.activeFeed, loading: true}};
  case FETCH_FEED_SUCCESS:
    return { ...state, activeFeed: {feed: action.payload, error:null, loading: false}};
  case FETCH_FEED_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activeFeed: {feed: null, error:error, loading:false}};
  case RESET_ACTIVE_FEED:
    return { ...state, activeFeed: {feed: null, error:null, loading: false}};

  case CREATE_FEED:
  	return {...state, newFeed: {...state.newFeed, loading: true}}
  case CREATE_FEED_SUCCESS:
  	return {...state, newFeed: {feed:action.payload, error:null, loading: false}}
  case CREATE_FEED_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, newFeed: {feed:null, error:error, loading: false}}
  case RESET_NEW_FEED:
    return {...state,  newFeed:{feed:null, error:null, loading: false}}
    
  case UPDATE_FEED:
    return { ...state, feedUpdated: false, error: null, loading: true};
  case UPDATE_FEED_SUCCESS:
    return { ...state, feedUpdated: true, error: null, loading: false};
  case UPDATE_FEED_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return { ...state, feedUpdated: false, error: error, loading: false};
  case RESET_UPDATE_FEED_STATE:
  	return { ...state, feedUpdated: false, error: null, loading: false};

  case DELETE_FEED:
   	return {...state, deletedFeed: {...state.deletedFeed, loading: true}}
  case DELETE_FEED_SUCCESS:{
  	return {...state, deletedFeed: {feed:action.payload, error:null, loading: false}}}
  case DELETE_FEED_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, deletedFeed: {feed:null, error:error, loading: false}}
  case RESET_DELETED_FEED:
    return {...state,  deletedFeed:{feed:null, error:null, loading: false}}
    
  case LIKE_FEED:
    return { ...state, likedFeed: false, error: null, loading: true};
  case LIKE_FEED_SUCCESS:
    return { ...state, likedFeed: true, error: null, loading: false};
  case LIKE_FEED_FAILURE:
    error = action.payload || {message: action.payload.message};
  	return { ...state, likedFeed: false, error: error, loading: false};
  case RESET_LIKED_FEED_STATE:
    return { ...state, likedFeed: false, error: null, loading: false};
    
  case UNLIKE_FEED:
    return { ...state, unlikedFeed: false, error: null, loading: true};
  case UNLIKE_FEED_SUCCESS:
    return { ...state, unlikedFeed: true, error: null, loading: false};
  case UNLIKE_FEED_FAILURE:
    error = action.payload || {message: action.payload.message};
  	return { ...state, unlikedFeed: false, error: error, loading: false};
  case RESET_UNLIKED_FEED_STATE:
  	return { ...state, unlikedFeed: false, error: null, loading: false};

  // case VALIDATE_POST_FIELDS:
  //   return {...state, newPost:{...state.newPost, error: null, loading: true}}
  // case VALIDATE_POST_FIELDS_SUCCESS:
  //   return {...state, newPost:{...state.newPost, error: null, loading: false}}
  // case VALIDATE_POST_FIELDS_FAILURE:
  //   let result = action.payload;
  //   if(!result) {
  //     error = {message: action.payload.message};
  //   } else {
  //     error = {title: result.title, categories: result.categories, description: result.description};
  //   }
  //   return {...state, newPost:{...state.newPost, error: error, loading: false}}
  // case RESET_POST_FIELDS:
  //   return {...state, newPost:{...state.newPost, error: null, loading: null}}
   default:
     return state;
  }
}
