import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedDetailsContainer from '../containers/FeedDetailsContainer.js';

class FeedsDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div className="container">
        <FeedDetailsContainer id={this.props.match.params.id} />
      </div>
    );
  }
}

export default FeedsDetails;
