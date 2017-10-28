import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FeedList extends Component {

    componentDidMount() {
        this.props.fetchFeeds();
    }

    renderFeeds(feeds) {
        // return this.props.feeds.reverse().map(feed => {
        //     return (
        //         <div className="card darken-1 highlight" key={feed._id} onClick={(e) => this.handleClick(feed._id)}>
        //             <div className="card-content">
        //                 <span className="card-title">{feed.title}</span>
        //                 <p>
        //                     {feed.pages.map(function(page) {
        //                         return (
        //                             <li key={page._id}>{page.url}</li>
        //                         );
        //                     })}
        //                 </p>
        //                 <p className="right">
        //                 Sent On: {new Date(feed.date_created).toLocaleDateString()}
        //                 </p>
        //             </div>
        //             <div className="card-action">
                      
        //                 <Link to={this.getLocation(feed._id)} className="waves-effect waves-light btn">
        //                     <i className="material-icons right">cloud</i>GetFeed
        //                 </Link>

                                              
        //             </div>
        //         </div>
        //     );
        //});
        return feeds.map((feed) => {
            return (
              <li className="collection-item avatar" key={feed._id}>
                <Link style={{color:'black'}} to={"feeds/" + feed._id}>
                  <h3 className="list-group-item-heading">{feed.title}</h3>
                </Link>
                  {/* {this.renderCategories(post.categories)} */}
                  <i className="material-icons circle">folder</i>
                  <span className="title">{feed.title}</span>
                  <p>First Line <br />
                     Second Line
                  </p>
                  <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
              </li>
            );
          });
  }

  

    render() {
        const { feeds, loading, error } = this.props.feedsList;
        
            if(loading) {
              return (
                   <div className="container"><h1>Feeds</h1><h3>Loading...</h3>
                    <div className="progress">
                      <div className="indeterminate"></div>
                    </div>
                  </div> 
              );     
            } else if(error) {
              return <div className="alert alert-danger">Error: {error.message}</div>
            }
        
            return (
              <div className="container">
                <h1>Feeds</h1>
                <ul className="collection">
                  {this.renderFeeds(feeds)}
                </ul>
              </div>
            );
    }
}

export default FeedList;
