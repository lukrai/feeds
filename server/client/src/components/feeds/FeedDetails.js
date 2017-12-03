import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Grid, Segment, List, Header } from 'semantic-ui-react';

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
        <Grid columns={3} stackable style={{paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
          <Grid.Column>
            <Segment>
              <Header size='medium'>{feed.title}</Header>
              <List bulleted>
                {feed.pages.map(function(page) {
                  return (
                    <List.Item key={page.url}>{page.url}</List.Item>
                  );
                })}
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            {feed.feedData.map(function(post) {
                  if(post.from){
                    return (                   
                        <Card fluid key={post.id}>
                            <Card.Content>
                              <Card.Header>                   
                                <Image src={post.from.picture.data.url} floated='left' avatar />             
                                {post.from.name}
                              </Card.Header>
                              <Card.Meta>
                                <span className='date'>
                                {getTime(post.created_time)}
                                </span>
                              </Card.Meta>
                            </Card.Content>
                          {renderImage(post)}                            
                            <Card.Content>
                              <Card.Description>
                                {post.message}
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <a>
                                <Icon name='like' />
                                {post.likes.summary.total_count} Likes
                              </a>
                            </Card.Content>
                        </Card>                     
                    );
                  }
              })}
          </Grid.Column>
          <Grid.Column>
            <Segment>Content</Segment>
          </Grid.Column>
        </Grid>
        <div>
            <div className="row" style={{paddingTop: '10px'}}>

              </div>
              <div className="col s12 m2 l3">               
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
          <Image src={post.attachments.data[0].media.image.src} />
          // <img src={post.attachments.data[0].media.image.src}/>
         );
    }
}

const getTime = function(time) {
  var t = new Date(1970, 0, 1, 0,0); // Epoch
  t.setSeconds(Date.parse(time).toString().substring(0,10));
  return t.toLocaleString();
}

export default FeedDetails;
