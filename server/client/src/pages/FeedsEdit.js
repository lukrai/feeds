import React, { Component } from 'react';
import FeedUpdateFormContainer from '../containers/FeedUpdateFormContainer.js';

class FeedsNew extends Component {
    render() {
          return (
            <div>
                {/* //<HeaderContainer type="posts_new"/> */}
                <FeedUpdateFormContainer />
            </div>
        );
    }
}


export default FeedsNew;
