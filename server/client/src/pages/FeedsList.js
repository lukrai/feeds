import React, { Component } from 'react';
//import HeaderContainer from '../containers/HeaderContainer.js';
import FeedsListContainer from '../containers/FeedsListContainer.js';

class FeedsList extends Component {
  render() {
    return (
      <div>
        {/* <HeaderContainer type="posts_index"/> */}
        <FeedsListContainer />
      </div>
    );
  }
}


export default FeedsList;
