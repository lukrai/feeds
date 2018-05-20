import React, { Component } from "react";
import PropTypes from "prop-types";
import FeedDetailsContainer from "../containers/FeedDetailsContainer.js";

class FeedsDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div style={{paddingTop: "0.5em"}}>
        <FeedDetailsContainer id={this.props.match.params.id} />
      </div>
    );
  }
}

export default FeedsDetails;
