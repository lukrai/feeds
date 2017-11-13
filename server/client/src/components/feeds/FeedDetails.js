import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';

class FeedDetails extends Component {
  static contextTypes = {
     router: PropTypes.object
  };
  constructor (props){
    super(props)
    // this.renderImage = this.renderImage.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.deletedFeed.feed && nextProps.deletedFeed.feed.status==200 && !nextProps.deletedFeed.feed.error) {
      console.log(this.context)
      this.context.router.history.push('/feeds');
    }
  }

  componentWillMount() {
    this.props.resetMe();
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     //this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchFeed(this.props.feedId);
  }

  
  // renderImage() {
  //   // if (post.attachments.data[0].media){
  //   //   return(
  //   //     <img src={post.picture}/>
  //   //   );
  //   // }
  //   return  <h1>AA</h1>;

  // }

  render() {

    const { feed, loading, error } = this.props.activeFeed;

    const user = this.props.user;




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
        <div className="">
            <div className="row" style={{paddingRight: '50px', paddingTop: '10px'}}>

              <div className="col s12 m4 l3 ">

              </div>
              <div className="col s12 m4 l5">
                <h3>{feed.title}</h3>
                <h5>Pages List:</h5>
                <div>
                  {feed.pages.map(function(page) {
                    return (
                        <li key={page._id}>{page.url}</li>
                    );
                  })}
                </div>
                {feed.feedData.map(function(post) {
                  return (
                    
                    <div className="row" key={post.id}>
                      <div className="">
                        <div className="card">
                          <div className="card-content">
                            <span style = {{fontWeight: '400'}} className="card-title">{post.from.name}</span>
                              <h6>{getTime(post.created_time)}</h6>
                              <p className="light" style={{paddingTop:'10px', paddingBottom: '10px' }}>{post.message}</p>
                              <div className="card-image">
                              
                                {/* <img src={ `https://graph.facebook.com/v2.11/${post.id}/picture` }/> */}
                                {/* <span className="card-title">Card Title</span> */}
            
                                {renderImage(post)}
                                
                                {/* <img src={post.picture}/> */}
                              </div>
                          </div>
                          <div className="card-action">
                            <a href="#">This is a link</a>
                          </div>
                        </div>
                      </div>
                      {/* <img src={post.picture}/> */}
                    </div>
                      // <li key={post.created_time}>..</li>
                  );
                })}

              </div>
              <div className="col s12 m4 l2">               
                <button className="btn deep-purple" onClick={()=> {this.props.onDeleteClick(this.props.feedId,user)}}>Delete Feed</button><br />
                <div style={{ paddingTop: '10px'}}>
                  <Link /*className="btn deep-purple" /*style={{color:'black'}}/*/ to={"/feeds/edit"} style={{ paddingTop: '10px'}}>
                    <button className="btn deep-purple">Edit</button>
                  </Link>
                </div>
              </div>

                
            </div>
                            
            
            {/* <ModalConfirmDelete/> */}
            {/* <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a> */}

        </div>
    );
  }
}

const renderImage = function(post) {
    if (post.attachments.data[0].media){
        return(
           <img src={post.attachments.data[0].media.image.src}/>
         );
    }
}

const getTime = function(time) {
  var t = new Date(1970, 0, 1, 0,0); // Epoch
  t.setSeconds(Date.parse(time).toString().substring(0,10));
  return t.toLocaleString();
}

export default FeedDetails;
