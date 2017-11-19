import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteFeed } from '../actions/feeds';
//import Header from '../containers/HeaderContainer.js';
import FeedDetailsContainer from '../containers/FeedDetailsContainer.js';

class FeedsDetails extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    
    render() {
        console.log(this.props);
        return (
            //console.log(this.props);
            <div className="container">
                {/* <Header type="posts_show" postId={this.props.params.id}/> */}

                <FeedDetailsContainer id={this.props.match.params.id}/>
            </div>
        );
    }
}

export default FeedsDetails;
