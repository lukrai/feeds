import FeedsUpdateForm from '../components/feeds/FeedsUpdateForm'
import { resetUpdateFeedState } from '../actions/feeds';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetUpdateFeedState());
    }
  }
}


function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    updatedFeed: state.feeds.updatedFeed,
    activeFeed: state.feeds.activeFeed,
    isValidFeed: state.feeds.isValidFeed,
    initialValues: { 
        title: state.feeds.activeFeed.feed && state.feeds.activeFeed.feed.title,
        pages: state.feeds.activeFeed.feed && state.feeds.activeFeed.feed.pages
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedsUpdateForm);
