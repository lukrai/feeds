import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { fetchFeeds } from '../../actions/feeds';
import FeedView from './FeedView';

class FeedList extends Component {

    getLocation(id) {
        var feedpath = {
            pathname: '/feed/'+id,
            state: { feedId: id }
        };

        return feedpath;
    }
    
    componentDidMount() {
        this.props.fetchFeeds();
    }

    handleClick(id) {
        //e.preventDefault();
        <Link to="/feed" className="btn-floating btn-large red" id={id}>
            <i className="material-icons">add</i>
        </Link>
        console.log(id); 
    }

    renderFeeds() {
        return this.props.feeds.reverse().map(feed => {
            return (
                <div className="card darken-1 highlight" key={feed._id} onClick={(e) => this.handleClick(feed._id)}>
                    <div className="card-content">
                        <span className="card-title">{feed.title}</span>
                        <p>
                            {feed.pages.map(function(page) {
                                return (
                                    <li key={page._id}>{page.url}</li>
                                );
                            })}
                        </p>
                        <p className="right">
                        Sent On: {new Date(feed.date_created).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                      
                        <Link to={this.getLocation(feed._id)} className="waves-effect waves-light btn">
                            <i className="material-icons right">cloud</i>GetFeed
                        </Link>

                        
                        
                    </div>
                </div>
            );
        });
  }

  

    render() {
        return (
            <div className="container">
                {this.renderFeeds()}       
            </div>
        );
    }
}

function mapStateToProps({ feeds }) {
    //console.log(feeds + " maps to state");
    return { feeds };
}

export default connect(mapStateToProps, { fetchFeeds })(FeedList);
