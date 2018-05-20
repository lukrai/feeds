import FeedDetails from "../components/feeds/FeedDetails.js";
import { 
  fetchFeed, fetchFeedSuccess, fetchFeedFailure, resetActiveFeed, resetDeletedFeed, deleteFeed, deleteFeedSuccess, deleteFeedFailure,
  likeFeed, likeFeedFailure, likeFeedSuccess, unlikeFeed, unlikeFeedFailure, unlikeFeedSuccess 
} from "../actions/feeds";
import { connect } from "react-redux";

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
      response.payload.then((payload) => {
        if (payload && payload.status === 200) {
          dispatch(fetchFeedSuccess(payload.data));
        } else {
          dispatch(fetchFeedFailure(payload.data));
        }
      }).catch(function (error) {
        dispatch(fetchFeedFailure(error));
      });
    },
    onDeleteClick: (id, user) => {
      if (!user) {
        let data = { data: { message: "Please Sign In" } };
        dispatch(deleteFeedFailure(data));
        return;
      }
      dispatch(deleteFeed(id)).payload
        .then((response) => {
          !response.error ? dispatch(deleteFeedSuccess(response)) : dispatch(deleteFeedFailure(response));
          dispatch(resetActiveFeed());
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
      dispatch(resetActiveFeed());
      dispatch(resetDeletedFeed());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedDetails);
