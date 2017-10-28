import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class FeedDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.deletedFeed.feed && nextProps.deletedFeed.feed.status==200 && !nextProps.deletedFeed.feed.error) {
      console.log(this.context)
      this.context.router.history.push('/feeds');
    }
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchFeed(this.props.feedId);
  }

  render() {
    //console.log(this.props);
    const { feed, loading, error } = this.props.activeFeed;
    //const { user } = this.props.user;
    const user = this.props.user;
    //console.log(this.props);
    //console.log(this.contextTypes);
    if (loading) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!feed) {
      return <span />
    }
    return (
        <div className="container">
            <div className="" style={{paddingRight: '50px', paddingTop: '10px'}}>
                <button className="btn deep-purple"  onClick={()=> {this.props.onDeleteClick(this.props.feedId,user)}}>Delete Feed</button>
            </div>
            <h3>{feed.title}</h3>
            {/* <h6>Categories: {feed.pages}</h6> */}
            <p>{feed.date_created}</p>           
            {feed.pages.map(function(page) {
                return (
                    <li key={page._id}>{page.url}</li>
                );
            })}
            {/* <ModalConfirmDelete/> */}
            {/* <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a> */}

        </div>
    );
  }
}

export default FeedDetails;
