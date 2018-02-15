import axios from 'axios';

//Feed comment list
export const FETCH_FEED_COMMENTS = 'FETCH_FEED_COMMENTS';
export const FETCH_FEED_COMMENTS_SUCCESS = 'FETCH_FEEDS_COMMENTS_SUCCESS';
export const FETCH_FEED_COMMENTS_FAILURE = 'FETCH_FEEDS_COMMENTS_FAILURE';
export const RESET_COMMENTS = 'RESET_COMMENTS';

//Create new feed comment
export const CREATE_FEED_COMMENT = 'CREATE_FEED_COMMENT';
export const CREATE_FEED_COMMENT_SUCCESS = 'CREATE_FEED_COMMENT_SUCCESS';
export const CREATE_FEED_COMMENT_FAILURE = 'CREATE_FEED_COMMENT_FAILURE';
export const RESET_NEW_COMMENT = 'RESET_NEW_COMMENT';

//Delete feed comment
export const DELETE_FEED_COMMENT = 'DELETE_FEED_COMMENT';
export const DELETE_FEED_COMMENT_SUCCESS = 'DELETE_FEED_COMMENT_SUCCESS';
export const DELETE_FEED_COMMENT_FAILURE = 'DELETE_FEED_COMMENT_FAILURE';
export const RESET_DELETED_FEED_COMMENT = 'RESET_DELETED_FEED_COMMENT';

//-----fetching all feed comments-----
export  function fetchFeedComments(feedId) {
    const request =  axios({
        method: 'get',
        url: `/api/feed/${feedId}/comment`,
        headers: []
    });

    return {
        type: FETCH_FEED_COMMENTS,
        payload: request
    };
}

export function fetchFeedCommentsSuccess(comments) {
    return {
        type: FETCH_FEED_COMMENTS_SUCCESS,
        payload: comments
    };
}

export function fetchFeedCommentsFailure(error) {
    return {
        type: FETCH_FEED_COMMENTS_FAILURE,
        payload: error
    };
}

export function resetFeedComments() {
    return {
      type: RESET_COMMENTS
    };
}

//-----creating comment-----
export function createFeedComment(feedId, props) {
    const request = axios({
        method: 'post',
        data: props,
        url: `/api/feed/${feedId}/comment`,
    });

    return {
        type: CREATE_FEED_COMMENT,
        payload: request
    };
}

export function createFeedSuccess(newComment) {
    return {
        type: CREATE_FEED_COMMENT_SUCCESS,
        payload: newComment
    };
}

export function createFeedFailure(error) {
    return {
        type: CREATE_FEED_COMMENT_FAILURE,
        payload: error
    };
}

export function resetNewComment() {
    return {
        type: RESET_NEW_COMMENT
    };
}

//-----deleting comment-----
export function deleteFeedComment(feedId, commentId) {
    const request = axios({
        method: 'delete',
        url: `/api/feed/${feedId}/comment/${commentId}`,   
    });
    return {
        type: DELETE_FEED_COMMENT,
        payload: request
    };
}

export function deleteFeedCommentSuccess(deletedComment) {
    return {
        type: DELETE_FEED_COMMENT_SUCCESS,
        payload: deletedComment
    };
}

export function deleteFeedCommentFailure(response) {
    return {
        type: DELETE_FEED_COMMENT_FAILURE,
        payload: response
    };
}

export function resetDeletedFeedComment() {
    return {
        type: RESET_DELETED_FEED
    };
}