import ChatSegment from '../components/feeds/chat/ChatSegment.js';
import { fetchFeedMessages, fetchFeedMessagesSuccess, fetchFeedMessagesFailure, resetFeedMessages } from '../actions/messages';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        user: state.auth,
        feedMessageList: state.messages.feedMessageList,
        // feedId: ownProps.id,
        // deletedFeed: state.feeds.deletedFeed
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (id) => {
        var response = dispatch(fetchFeedMessages(id));
        response.payload.then((payload)=> {
            console.log(payload);
            if (payload && payload.status == 200) {
                dispatch(fetchFeedMessagesSuccess(payload.data))                   
            } else {
                dispatch(fetchFeedMessagesFailure(payload.data));
            }
        }).catch (function(error){
            dispatch(fetchFeedMessagesFailure(error));
        });

    },
    resetMe: () => {
      dispatch(resetFeedMessages());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatSegment);
