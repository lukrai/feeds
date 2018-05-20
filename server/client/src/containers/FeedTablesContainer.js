import { connect } from "react-redux";
import {
  fetchAllFeeds, fetchAllFeedsSuccess, fetchAllFeedsFailure, resetAllFeeds, likeFeed, likeFeedFailure, likeFeedSuccess, unlikeFeed,
  unlikeFeedFailure, unlikeFeedSuccess
} from "../actions/feeds";
import FeedTables from "../components/feeds/mainPageTable/FeedTables";


const mapStateToProps = (state) => {
  return {
    user: state.auth,
    allFeedsList: state.feeds.allFeedsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllFeeds: () => {
      var response = dispatch(fetchAllFeeds());
      response.payload.then((payload) => {
        if (payload.status === 200) {
          dispatch(fetchAllFeedsSuccess(payload.data));
        }
      }).catch((err) => {
        dispatch(fetchAllFeedsFailure(err));
      });
    },
    onLikeClick: (id, user) => {
      if (!user) {
        let data = { data: { message: "Please Sign In" } };
        dispatch(likeFeedFailure(data));
        return;
      }
      dispatch(likeFeed(id)).payload
        .then((response) => {
          !response.error ? dispatch(likeFeedSuccess(response)) : dispatch(likeFeedFailure(response));
        });
    },
    onUnlikeClick: (id, user) => {
      if (!user) {
        let data = { data: { message: "Please Sign In" } };
        dispatch(unlikeFeedFailure(data));
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedTables);