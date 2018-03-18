import axios from 'axios';

//Feed list
export const FETCH_FEEDS = 'FETCH_FEEDS';
export const FETCH_FEEDS_SUCCESS = 'FETCH_FEEDS_SUCCESS';
export const FETCH_FEEDS_FAILURE = 'FETCH_FEEDS_FAILURE';
export const RESET_FEEDS = 'RESET_FEEDS';

export const FETCH_ALL_FEEDS = 'FETCH_ALL_FEEDS';
export const FETCH_ALL_FEEDS_SUCCESS = 'FETCH_ALL_FEEDS_SUCCESS';
export const FETCH_ALL_FEEDS_FAILURE = 'FETCH_ALL_FEEDS_FAILURE';
export const RESET_ALL_FEEDS = 'RESET_ALL_FEEDS';

//Create new feed
export const CREATE_FEED = 'CREATE_FEED';
export const CREATE_FEED_SUCCESS = 'CREATE_FEED_SUCCESS';
export const CREATE_FEED_FAILURE = 'CREATE_FEED_FAILURE';
export const RESET_NEW_FEED = 'RESET_NEW_FEED';

//Validate feed fields like Title, Categries on the server
export const VALIDATE_FEED_FIELDS = 'VALIDATE_FEED_FIELDS';
export const VALIDATE_FEED_FIELDS_SUCCESS = 'VALIDATE_FEED_FIELDS_SUCCESS';
export const VALIDATE_FEED_FIELDS_FAILURE = 'VALIDATE_FEED_FIELDS_FAILURE';
export const RESET_FEED_FIELDS = 'RESET_FEED_FIELDS';

//Update
export const UPDATE_FEED = 'UPDATE_FEED';
export const UPDATE_FEED_SUCCESS = 'UPDATE_FEED_SUCCESS';
export const UPDATE_FEED_FAILURE = 'UPDATE_FEED_FAILURE';
export const RESET_UPDATE_FEED_STATE = 'RESET_UPDATE_FEED_STATE';

//Fetch feed
export const FETCH_FEED = 'FETCH_FEED';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE';
export const RESET_ACTIVE_FEED = 'RESET_ACTIVE_FEED';

//Delete feed
export const DELETE_FEED = 'DELETE_FEED';
export const DELETE_FEED_SUCCESS = 'DELETE_FEED_SUCCESS';
export const DELETE_FEED_FAILURE = 'DELETE_FEED_FAILURE';
export const RESET_DELETED_FEED = 'RESET_DELETED_FEED';

//LIKE feed
export const LIKE_FEED = 'LIKE_FEED';
export const LIKE_FEED_SUCCESS = 'LIKE_FEED_SUCCESS';
export const LIKE_FEED_FAILURE = 'LIKE_FEED_FAILURE';
export const RESET_LIKED_FEED_STATE = 'RESET_LIKED_FEED_STATE';

//UNLIKE feed
export const UNLIKE_FEED = 'UNLIKE_FEED';
export const UNLIKE_FEED_SUCCESS = 'UNLIKE_FEED_SUCCESS';
export const UNLIKE_FEED_FAILURE = 'UNLIKE_FEED_FAILURE';
export const RESET_UNLIKED_FEED_STATE = 'RESET_UNLIKED_FEED_STATE';



//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
export  function fetchFeeds() {
    const request =  axios({
        method: 'get',
        url: '/api/feed',
        headers: []
    });

    return {
        type: FETCH_FEEDS,
        payload: request
    };
}

export function fetchFeedsSuccess(feeds) {
    return {
        type: FETCH_FEEDS_SUCCESS,
        payload: feeds
    };
}

export function fetchFeedsFailure(error) {
    return {
        type: FETCH_FEEDS_FAILURE,
        payload: error
    };
}

export function resetFeeds() {
    return {
      type: RESET_FEEDS
    };
}

export  function fetchAllFeeds() {
    const request =  axios({
        method: 'get',
        url: '/api/feedAll',
    });

    return {
        type: FETCH_ALL_FEEDS,
        payload: request
    };
}

export function fetchAllFeedsSuccess(feeds) {
    return {
        type: FETCH_ALL_FEEDS_SUCCESS,
        payload: feeds
    };
}

export function fetchAllFeedsFailure(error) {
    return {
        type: FETCH_ALL_FEEDS_FAILURE,
        payload: error
    };
}

export function resetAllFeeds() {
    return {
        type: RESET_ALL_FEEDS
    };
}


export function validateFeedFields(props) {
  //note: we cant have /feed/validateFields because it'll match /feed/:id path!
  const request = axios({
    method: 'post',
    data: props,
    url: '/api/feed/validate/fields',
});

  return {
    type: VALIDATE_FEED_FIELDS,
    payload: request
  };
}

export function validateFeedFieldsSuccess() {
  return {
    type: VALIDATE_FEED_FIELDS_SUCCESS
  };
}

export function validateFeedFieldsFailure(error) {
  return {
    type: VALIDATE_FEED_FIELDS_FAILURE,
    payload: error
  };
}

export function resetFeedFields() {
  return {
    type: RESET_FEED_FIELDS
  }
};

export function createFeed(props) {
    const request = axios({
        method: 'post',
        data: props,
        url: '/api/feed',
        // headers: {
        //   'Authorization': `Bearer ${tokenFromStorage}`
        // }
    });

    return {
        type: CREATE_FEED,
        payload: request
    };
}

export function createFeedSuccess(newFeed) {
    return {
        type: CREATE_FEED_SUCCESS,
        payload: newFeed
    };
}

export function createFeedFailure(error) {
    return {
        type: CREATE_FEED_FAILURE,
        payload: error
    };
}

export function resetNewFeed() {
  return {
    type: RESET_NEW_FEED
  };
}

export function updateFeed(id, feed) {
    const request = axios({
        method: 'put',
        data: feed,
        url: `/api/feed/${id}`,
    });
  
    return {
      type: UPDATE_FEED,
      payload: request
    };
}
 
export function updateFeedSuccess() {
    return {
        type: UPDATE_FEED_SUCCESS
    };
}
  
export function updateFeedFailure(error) {
    return {
        type: UPDATE_FEED_FAILURE,
        payload: error
    };
}
  
export function resetUpdateFeedState() {
    return {
        type: RESET_UPDATE_FEED_STATE
    };
}


export function resetDeletedFeed() {
    return {
        type: RESET_DELETED_FEED
    };
}


export function fetchFeed(id) {
    const request = axios.get(`/api/feed/${id}`);
    return {
        type: FETCH_FEED,
        payload: request
    };
}


export function fetchFeedSuccess(activeFeed) {
    return {
        type: FETCH_FEED_SUCCESS,
        payload: activeFeed
    };
}

export function fetchFeedFailure(error) {
  return {
    type: FETCH_FEED_FAILURE,
    payload: error
  };
}

export function resetActiveFeed() {
    return {
        type: RESET_ACTIVE_FEED
    };
}


export function deleteFeed(id) {
    const request = axios({
        method: 'delete',
        url: `/api/feed/${id}`,   
    });
    return {
        type: DELETE_FEED,
        payload: request
    };
}

export function deleteFeedSuccess(deletedFeed) {
    return {
        type: DELETE_FEED_SUCCESS,
        payload: deletedFeed
    };
}

export function deleteFeedFailure(response) {
    return {
        type: DELETE_FEED_FAILURE,
        payload: response
    };
}

export function likeFeed(id) {
    const request = axios({
        method: 'put',
        url: `/api/feed/${id}/like`,   
    });
    return {
        type: LIKE_FEED,
        payload: request
    };
}

export function likeFeedSuccess(likedFeed) {
    return {
        type: LIKE_FEED_SUCCESS,
        payload: likedFeed
    };
}

export function likeFeedFailure(response) {
    return {
        type: LIKE_FEED_FAILURE,
        payload: response
    };
}

export function resetLikedFeed() {
    return {
      type: RESET_LIKED_FEED_STATE
    };
}

export function unlikeFeed(id) {
    const request = axios({
        method: 'put',
        url: `/api/feed/${id}/unlike`,   
    });
    return {
        type: UNLIKE_FEED,
        payload: request
    };
}

export function unlikeFeedSuccess(likedFeed) {
    return {
        type: UNLIKE_FEED_SUCCESS,
        payload: likedFeed
    };
}

export function unlikeFeedFailure(response) {
    return {
        type: UNLIKE_FEED_FAILURE,
        payload: response
    };
}

export function resetUnlikedFeed() {
    return {
      type: RESET_UNLIKED_FEED_STATE
    };
}