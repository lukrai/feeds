import { connect } from 'react-redux'
import { fetchAllFeeds, fetchAllFeedsSuccess, fetchAllFeedsFailure, resetAllFeeds } from '../actions/feeds';
import FeedTables from '../components/feeds/FeedTables';


const mapStateToProps = (state) => {
    console.log(state);
    return { 
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
      resetMe: () => {
        dispatch(resetAllFeeds());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedTables);