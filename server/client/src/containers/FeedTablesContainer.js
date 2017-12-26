import { connect } from 'react-redux'
import { fetchAllFeeds, fetchAllFeedsSuccess, fetchAllFeedsFailure } from '../actions/feeds';
import FeedTables from '../components/feeds/FeedTables';


const mapStateToProps = (state) => {
    return { 
      feedsList: state.feeds.feedsList
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchAllFeeds: () => {
          var response = dispatch(fetchAllFeeds());
          //console.log(response);
          dispatch(fetchAllFeeds());
          response.payload.then((payload) => {
              //console.log(payload);
              if(payload.status == 200){
                  dispatch(fetchAllFeedsSuccess(payload.data));
              }            
          }).catch((err) => {
              //console.log(err);
              dispatch(fetchAllFeedsFailure(err));
          });

      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedTables);