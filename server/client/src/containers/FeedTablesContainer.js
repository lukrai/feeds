import { connect } from 'react-redux'
import { fetchAllFeeds, fetchAllFeedsSuccess, fetchAllFeedsFailure, resetAllFeeds, likeFeed, likeFeedFailure, likeFeedSuccess, unlikeFeed,
unlikeFeedFailure, unlikeFeedSuccess, resetLikedFeed, resetUnlikedFeed } from '../actions/feeds';
import FeedTables from '../components/feeds/mainPageTable/FeedTables';


const mapStateToProps = (state) => {
    console.log(state.feeds);
    return { 
      user: state.auth,
      allFeedsList: state.feeds.allFeedsList
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchAllFeeds: () => {
          var response = dispatch(fetchAllFeeds());
          response.payload.then((payload) => {
              if(payload.status == 200){
                  dispatch(fetchAllFeedsSuccess(payload.data));
              }            
          }).catch((err) => {
              dispatch(fetchAllFeedsFailure(err));
          });

      },
      onLikeClick: (id, user) => {
        if (!user) {
            let data = {data: {message: 'Please Sign In'}};//axios like error
            dispatch(likeFeedFailure(data)); // but let other comps know
            return;
        }
        dispatch(likeFeed(id)).payload
            .then((response) => {              
                !response.error ? dispatch(likeFeedSuccess(response)) : dispatch(likeFeedFailure(response));
            });
      },
      onUnlikeClick: (id, user) => {
        if (!user) {
            let data = {data: {message: 'Please Sign In'}};//axios like error
            dispatch(unlikeFeedFailure(data)); // but let other comps know
            return;
        }
        dispatch(unlikeFeed(id)).payload
            .then((response) => {                
                !response.error ? dispatch(unlikeFeedSuccess(response)) : dispatch(unlikeFeedFailure(response));
            });
      },
      resetMe: () => {
        dispatch(resetAllFeeds());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedTables);