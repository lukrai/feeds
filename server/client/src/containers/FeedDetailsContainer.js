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
        //console.log(this.globalState);
        var response = dispatch(fetchFeed(id));
        //console.log(response);
        response.payload.then((payload)=> {
            console.log(payload);
            if (payload && payload.status == 200) {
                //console.log("status 200");
                console.log(payload);
                dispatch(fetchFeedSuccess(payload.data))                   
            } else {
                dispatch(fetchFeedFailure(payload.data));
            }
        }).catch (function(error){
            console.log(error);
            dispatch(fetchFeedFailure(error));
            //     console.log(e);
        });
        // dispatch(fetchFeed(id)).payload
        // .then((result) => {
        //   // Note: Error's "data" is in result.payload.response.data (inside "response")
        //   // success's "data" is in result.payload.data
        //   if (result.payload.response && result.payload.response.status !== 200) {
        //     dispatch(fetchFeedFailure(result.payload.response.data));
        //   } else {
        //     dispatch(fetchFeedSuccess(result.payload.data))
        //   }
        // })

    },
    onDeleteClick: (id, user) => {
        //let token = sessionStorage.getItem('jwtToken');
        //console.log(globalState);
        console.log("delete Clicked");
        if (!user) { //if there is no token, dont bother,
            let data = {data: {message: 'Please Sign In'}};//axios like error
            dispatch(deleteFeedFailure(data)); // but let other comps know
            return;
        }
        console.log(dispatch(deleteFeed(id)));
        dispatch(deleteFeed(id)).payload
            .then((response) => {
                console.log(response);                
                !response.error ? dispatch(deleteFeedSuccess(response)) : dispatch(deleteFeedFailure(response));
                dispatch(resetActiveFeed());
            });
    },

    resetMe: () => {
      //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
      dispatch(resetActiveFeed());
      dispatch(resetDeletedFeed());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedDetails);
