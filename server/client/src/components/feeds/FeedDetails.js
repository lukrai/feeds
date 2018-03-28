import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InfiniteFeedScroll from './InfiniteFeedScroll.js'
import ChatContainer from '../../containers/ChatContainer.js';
import { Grid, Segment, List, Header, Button, Modal, Visibility } from 'semantic-ui-react';

class FeedDetails extends Component {
  static contextTypes = {
     router: PropTypes.object
  };
  constructor (props){
    super(props);
    this.state = { 
      open: false, 
      size: 'small',
      posts: [],
      sliceIndex: 0,
      calculations: {
        percentagePassed: 0,
        bottomVisible: false,
      },
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.loadMorePosts = this.loadMorePosts.bind(this);
  }

  handleContextRef = contextRef => { this.setState({ contextRef }); }
  handleUpdate = (e, { calculations }) => { 
    const { bottomVisible } = calculations;
    if (bottomVisible && bottomVisible !== this.setState.calculations) {
      this.loadMorePosts();
    }
    this.setState({ calculations }); 
  }

  show = size => () => { this.setState({ size, open: true })}
  close = () => this.setState({ open: false })

  componentWillReceiveProps(nextProps) {
    if (nextProps.deletedFeed.feed && nextProps.deletedFeed.feed.status === 200 && !nextProps.deletedFeed.feed.error) {
      this.context.router.history.push('/feeds');
    }

    if (nextProps.activeFeed.feed && nextProps.activeFeed.feed.feedData) {
      const posts = nextProps.activeFeed.feed.feedData.slice(0, 10);
      this.setState({posts, sliceIndex: 10})
    }
  }

  componentWillMount() {
    this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchFeed(this.props.feedId);
  }

  // Might change .slice to something else in the future
  loadMorePosts() {
    if (this.props.activeFeed.feed && this.state.sliceIndex < this.props.activeFeed.feed.feedData.length) {
      const posts = this.props.activeFeed.feed.feedData.slice(0, this.state.sliceIndex + 10);
      this.setState({posts, sliceIndex: this.state.sliceIndex + 10})
    }
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
      <div ref={this.handleContextRef}>
        <Grid columns={2} stackable style={{ paddingLeft: '1em', paddingRight: '1em' }}>
          <Grid.Column>
              <Visibility offset={[200,200]} onUpdate={this.handleUpdate} >               
                <InfiniteFeedScroll list={this.state.posts} loadMorePosts={this.loadMorePosts}/>
              </Visibility>
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

export default FeedDetails;
