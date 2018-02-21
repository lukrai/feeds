import CommentSegment from '../components/feeds/comments/CommentSegment.js';
import { fetchFeedComments, fetchFeedCommentsSuccess, fetchFeedCommentsFailure, resetFeedComments, 
    resetDeletedFeed, deleteFeedComment, deleteFeedCommentSuccess, deleteFeedCommentFailure,
    createFeedComment, createFeedCommentFailure, createFeedCommentSuccess, resetNewComment } 
    from '../actions/comments';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';



function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        user: state.auth,
        feedCommentList: state.comments.feedCommentList,
        // feedId: ownProps.id,
        // deletedFeed: state.feeds.deletedFeed
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => {
        var response = dispatch(fetchFeedComments(id));
        response.payload.then((payload)=> {
            console.log(payload);
            if (payload && payload.status == 200) {
                dispatch(fetchFeedCommentsSuccess(payload.data))                   
            } else {
                dispatch(fetchFeedCommentsFailure(payload.data));
            }
        }).catch (function(error){
            dispatch(fetchFeedCommentsFailure(error));
        });

    },
    onDeleteClick: (id, user) => {
        // if (!user) { 
        //     let data = {data: {message: 'Please Sign In'}};//axios like error
        //     dispatch(deleteFeedCommentFailure(data)); // but let other comps know
        //     return;
        // }
        // //console.log(dispatch(deleteFeed(id)));
        // dispatch(deleteFeedComment(id)).payload
        //     .then((response) => {             
        //         !response.error ? dispatch(deleteFeedCommentSuccess(response)) : dispatch(deleteFeedCommentFailure(response));
        //        // dispatch(resetActiveFeed());
        //     });
    },
    handleCommentSubmit: (id, user, values) => {
        // if (!user) { 
        //     let data = {data: {message: 'Please Sign In'}};//axios like error
        //     dispatch(deleteFeedCommentFailure(data)); // but let other comps know
        //     return;
        // }
        console.log(values);
        var response = dispatch(createFeedComment(id, values));
        response.payload.then((payload)=> {
            console.log(payload);
            if (payload && payload.status == 200) {
                dispatch(createFeedCommentSuccess(payload.data))                   
            } else {
                dispatch(createFeedCommentFailure(payload.data));
            }
        }).catch (function(error){
            dispatch(createFeedCommentFailure(error));
        });

    },

    resetMe: () => {
     // dispatch(resetActiveFeed());
     // dispatch(resetDeletedFeed());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentSegment);
