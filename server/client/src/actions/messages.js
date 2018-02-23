import axios from 'axios';

//Feed comment list
export const FETCH_FEED_MESSAGES = 'FETCH_FEED_MESSAGES';
export const FETCH_FEED_MESSAGES_SUCCESS = 'FETCH_FEEDS_MESSAGES_SUCCESS';
export const FETCH_FEED_MESSAGES_FAILURE = 'FETCH_FEEDS_MESSAGES_FAILURE';
export const RESET_MESSAGES = 'RESET_MESSAGES';

export  function fetchFeedMessages(feedId) {
    const request =  axios({
        method: 'get',
        url: `/api/feed/${feedId}/message`,
        headers: []
    });

    return {
        type: FETCH_FEED_MESSAGES,
        payload: request
    };
}

export function fetchFeedMessagesSuccess(messages) {
    return {
        type: FETCH_FEED_MESSAGES_SUCCESS,
        payload: messages
    };
}

export function fetchFeedMessagesFailure(error) {
    return {
        type: FETCH_FEED_MESSAGES_FAILURE,
        payload: error
    };
}

export function resetFeedMessages() {
    return {
      type: RESET_MESSAGES
    };
}