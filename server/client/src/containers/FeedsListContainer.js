import { connect } from 'react-redux'
import { fetchFeeds, fetchFeedsSuccess, fetchFeedsFailure } from '../actions/feeds';
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
          //console.log(response);
          dispatch(fetchFeeds());
          response.payload.then((payload) => {
              //console.log(payload);
              if(payload.status == 200){
                  dispatch(fetchFeedsSuccess(payload.data));
              }            
          }).catch((err) => {
              //console.log(err);
              dispatch(fetchFeedsFailure(err));
          });

      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);