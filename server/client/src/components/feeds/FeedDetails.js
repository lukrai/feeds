import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ChatContainer from '../../containers/ChatContainer.js';
import { Card, Icon, Image, Grid, Segment, List, Header, Button, Modal, Dimmer, Loader, Sticky } from 'semantic-ui-react';

class FeedDetails extends Component {
  static contextTypes = {
     router: PropTypes.object
  };
  constructor (props){
    super(props);
    this.state = { open: false, size: 'small' };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick
  }

  show = size => () => { this.setState({ size, open: true })}
  close = () => this.setState({ open: false })

  componentWillReceiveProps(nextProps) {
    if (nextProps.deletedFeed.feed && nextProps.deletedFeed.feed.status==200 && !nextProps.deletedFeed.feed.error) {
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
          <Grid columns={2} stackable style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <Grid.Column>
              <Segment loading={true}><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment loading={true}><br /></Segment>
            </Grid.Column>
          </Grid>
        );
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!feed) {
      return <span />
    }
    return (    
      <div>
        <Grid columns={2} stackable style={{ paddingLeft: '1em', paddingRight: '1em' }}>
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
            <Segment>
                <Header size='medium'>{feed.title}</Header>
                <List bulleted>
                  {feed.pages.map(function(page) {
                    return (
                      <List.Item key={page.url}>{page.url}</List.Item>
                    );
                  })}
                </List>
                <Button as={Link} to={"/feeds/edit"} basic color='green'>Edit Feed</Button>
                <Button basic color='red' onClick={this.show('small')}>Delete Feed</Button>

                <div>      
                  <Modal size={this.state.size} open={this.state.open} onClose={this.close}>
                    <Modal.Header>
                      Delete Your Feed
                    </Modal.Header>
                    <Modal.Content>
                      <p>Are you sure you want to delete your feed?</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button negative onClick={this.close}>
                        No
                      </Button>
                      <Button positive  onClick={()=> {this.props.onDeleteClick(this.props.feedId,user)}}>
                        Yes
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </div>
              </Segment>           
              <ChatContainer feedId={this.props.feedId}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const renderImage = function(post) {
  if (post.attachments.data[0].media){
    return(
      <Image src={post.attachments.data[0].media.image.src} />
      );
  }
}

const getTime = function(time) {
  var t = new Date(1970, 0, 1, 0,0); // Epoch
  t.setSeconds(Date.parse(time).toString().substring(0,10));
  return t.toLocaleString();
}

export default FeedDetails;
