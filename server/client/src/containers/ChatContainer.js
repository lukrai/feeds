import ChatSegment from "../components/feeds/chat/ChatSegment.js";
import { fetchFeedMessages, fetchFeedMessagesSuccess, fetchFeedMessagesFailure, resetFeedMessages } from "../actions/messages";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    user: state.auth,
    feedMessageList: state.messages.feedMessageList,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (id) => {
      var response = dispatch(fetchFeedMessages(id));
      response.payload.then((payload) => {
        if (payload && payload.status === 200) {
          dispatch(fetchFeedMessagesSuccess(payload.data));
        } else {
          dispatch(fetchFeedMessagesFailure(payload.data));
        }
      }).catch(function (error) {
        dispatch(fetchFeedMessagesFailure(error));
      });
    },
    resetMe: () => {
      dispatch(resetFeedMessages());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatSegment);
