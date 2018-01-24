import { connect } from 'react-redux'
import { fetchFeeds, fetchFeedsSuccess, fetchFeedsFailure, resetFeeds  } from '../actions/feeds';
import FeedList from '../components/feeds/FeedList';


const mapStateToProps = (state) => {
    return { 
      feedsList: state.feeds.feedsList
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchFeeds: () => {
          var response = dispatch(fetchFeeds());
          response.payload.then((payload) => {
              if(payload.status == 200){
                  dispatch(fetchFeedsSuccess(payload.data));
              }            
          }).catch((err) => {
              dispatch(fetchFeedsFailure(err));
          });

      },
      resetMe: () => {
        dispatch(resetFeeds());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);