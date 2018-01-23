import { connect } from 'react-redux'
import { fetchAllFeeds, fetchAllFeedsSuccess, fetchAllFeedsFailure, resetAllFeeds, likeFeed, likeFeedFailure, likeFeedSuccess, unlikeFeed,
unlikeFeedFailure, unlikeFeedSuccess } from '../actions/feeds';
import FeedTables from '../components/feeds/FeedTables';


const mapStateToProps = (state) => {
    // console.log(state);
    return { 
      user: state.auth,
      allFeedsList: state.feeds.allFeedsList
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchAllFeeds: () => {
          var response = dispatch(fetchAllFeeds());
          //console.log(response);
          response.payload.then((payload) => {
              //console.log(payload);
              if(payload.status == 200){
                  dispatch(fetchAllFeedsSuccess(payload.data));
              }            
          }).catch((err) => {
              //console.log(err);
              dispatch(fetchAllFeedsFailure(err));
          });

      },
      onLikeClick: (id, user) => {
        if (!user) {
            let data = {data: {message: 'Please Sign In'}};//axios like error
            dispatch(likeFeedFailure(data)); // but let other comps know
            return;
        }
        //console.log(dispatch(deleteFeed(id)));
        dispatch(likeFeed(id)).payload
            .then((response) => {
                console.log(response);                
                !response.error ? dispatch(likeFeedSuccess(response)) : dispatch(likeFeedFailure(response));
                //dispatch(resetActiveFeed());
            });
    },
      resetMe: () => {
        dispatch(resetAllFeeds());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedTables);