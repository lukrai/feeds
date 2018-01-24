import FeedDetails from '../components/feeds/FeedDetails.js';
import { fetchFeed, fetchFeedSuccess, fetchFeedFailure, resetActiveFeed, resetDeletedFeed, deleteFeed, deleteFeedSuccess, deleteFeedFailure } from '../actions/feeds';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';



function mapStateToProps(state, ownProps) {
    return {
        user: state.auth,
        activeFeed: state.feeds.activeFeed,
        feedId: ownProps.id,
        deletedFeed: state.feeds.deletedFeed
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeed: (id) => {
        var response = dispatch(fetchFeed(id));
        response.payload.then((payload)=> {
            console.log(payload);
            if (payload && payload.status == 200) {
                dispatch(fetchFeedSuccess(payload.data))                   
            } else {
                dispatch(fetchFeedFailure(payload.data));
            }
        }).catch (function(error){
            dispatch(fetchFeedFailure(error));
        });

    },
    onDeleteClick: (id, user) => {
        if (!user) { 
            let data = {data: {message: 'Please Sign In'}};//axios like error
            dispatch(deleteFeedFailure(data)); // but let other comps know
            return;
        }
        //console.log(dispatch(deleteFeed(id)));
        dispatch(deleteFeed(id)).payload
            .then((response) => {             
                !response.error ? dispatch(deleteFeedSuccess(response)) : dispatch(deleteFeedFailure(response));
                dispatch(resetActiveFeed());
            });
    },

    resetMe: () => {
      dispatch(resetActiveFeed());
      dispatch(resetDeletedFeed());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedDetails);
