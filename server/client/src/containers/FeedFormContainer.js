import FeedsForm from '../components/feeds/FeedsForm'
import { resetNewFeed } from '../actions/feeds';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewFeed());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newFeed: state.feeds.newFeed,
    isValidFeed: state.feeds.isValidFeed
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedsForm);
