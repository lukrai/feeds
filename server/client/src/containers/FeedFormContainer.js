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
    newFeed: state.feeds.newFeed
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedsForm);
