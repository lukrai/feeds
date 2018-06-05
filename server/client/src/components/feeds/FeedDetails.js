import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InfiniteFeedScroll from './InfiniteFeedScroll.js'
import ChatContainer from '../../containers/ChatContainer.js';
import FeedLike from './mainPageTable/FeedLike';
import Error from './../Error';
import { Grid, Segment, List, Header, Button, Modal, Visibility, Sticky } from 'semantic-ui-react';

class FeedDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      sliceIndex: 0,
      calculations: {
        percentagePassed: 0,
        bottomVisible: false,
      },
    };

    this.loadMorePosts = this.loadMorePosts.bind(this);
  }

  handleContextRef = contextRef => this.setState({ contextRef })
  handleUpdate = (e, { calculations }) => {
    const { bottomVisible } = calculations;
    if (bottomVisible && bottomVisible !== this.setState.calculations) {
      this.loadMorePosts();
    }
    this.setState({ calculations });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deletedFeed.feed && nextProps.deletedFeed.feed.status === 200 && !nextProps.deletedFeed.feed.error) {
      this.context.router.history.push("/feeds");
    }

    const { feed } = nextProps.activeFeed;
    if (feed && feed.feedData) {
      const posts = feed.feedData.slice(0, 20);
      this.setState({ posts, sliceIndex: 10 });
    }

    if (nextProps.feedId !== this.props.feedId) {
      this.props.fetchFeed(nextProps.feedId);
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
      this.setState({ posts, sliceIndex: this.state.sliceIndex + 10 });
    }
  }

  render() {
    const { feed, loading, error } = this.props.activeFeed;
    const user = this.props.user;
    const { contextRef } = this.state;

    if (loading) {
      return (
        <Grid columns={2} container style={{ paddingLeft: '1em', paddingRight: '1em' }}>
          <Grid.Column>
            <Segment loading={true}><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment loading={true}><br /></Segment>
          </Grid.Column>
        </Grid>
      );
    } else if (error) {
      return <Error error={error}></Error>;
    } else if (!feed) {
      return <span />;
    }
    return (
      <div ref={this.handleContextRef} style={{minWidth: '400px'}}>
        <Grid columns={2} container style={{ paddingLeft: '1em', paddingRight: '1em'}}>
          <Grid.Column width={8}>
            <Visibility onUpdate={this.handleUpdate}>
              <InfiniteFeedScroll list={this.state.posts} loadMorePosts={this.loadMorePosts} />
            </Visibility>
            
          </Grid.Column>
          <Grid.Column width={8}>
            {/* <Rail position='right'> */}
            <FeedBasicInfo feed={feed} user={user} onLikeClick={this.props.onLikeClick} onUnlikeClick={this.props.onUnlikeClick} onDeleteClick={this.props.onDeleteClick} />
            <Sticky context={contextRef} offset={75} >
              <ChatContainer feedId={this.props.feedId} />
            </Sticky>
            {/* </Rail> */}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default FeedDetails;

class FeedBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      size: "small",
    };
    // this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  show = size => { this.setState({ size, open: true }); }
  close = () => this.setState({ open: false })

  renderLike(item) {
    if(!this.props.user) {
      return (
        <FeedLike liked={null} likeCount={item.like_count} itemId={item._id} />  
      );
    } else if(item.likes.indexOf(this.props.user._id) === -1) {
      return (
        <FeedLike liked={false} onLikeClick={this.props.onLikeClick} onUnlikeClick={this.props.onUnlikeClick} likeCount={item.like_count} itemId={item._id} user={this.props.user}/>  
      );
    } else if(item.likes.indexOf(this.props.user._id) !== -1) {
      return (
        <FeedLike liked={true} onLikeClick={this.props.onLikeClick} onUnlikeClick={this.props.onUnlikeClick} likeCount={item.like_count} itemId={item._id} user={this.props.user}/>    
      );
    }
  }

  renderButtons(user) {
    if (user && user._id === this.props.feed._userID) {
      return (
        <div>
          <Button as={Link} to={"/feeds/edit"} basic color='green'>Edit Feed</Button>
          <Button basic color='red' onClick={()=>this.show("small")}>Delete Feed</Button>
          {this.renderLike(this.props.feed)}
        </div>
      );
    } else {
      return (this.renderLike(this.props.feed));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.feed !== this.props.feed || nextState !== this.state);
  }

  render() {
    const { feed, user } = this.props;
    return (
      <Segment>
        <Header size='medium'>{feed.title}</Header> 
        <List style={{paddingLeft: "0.2em"}}>
          {feed.pages.map(function (page) {
            return(renderItem(page));
          })}
        </List>
        {this.renderButtons(user)} 
        
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
              <Button positive onClick={() => { this.props.onDeleteClick(this.props.feed._id, user); }}>
                Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </Segment>
    );
  }
}

const renderItem = function (page) {
  if (page.source === "facebook") {
    return (
      <List.Item key={page.url}>
        <List.Icon name="facebook" style={{ color: "#3b5998" }} size='large' verticalAlign='middle' />
        <List.Content>
          {page.url}
        </List.Content>
      </List.Item>
    );
  } else if (page.source === "twitter") {
    return (
      <List.Item key={page.url}>
        <List.Icon name="twitter" style={{ color: "#55acee" }} size='large' verticalAlign='middle' />
        <List.Content>
          {page.url}
        </List.Content>
      </List.Item>
    );
  } else if (page.source === "youtube") {
    return (
      <List.Item key={page.url}>
        <List.Icon name="youtube" style={{ color: "#cc181e" }} size='large' verticalAlign='middle' />
        <List.Content>
          {page.url}
        </List.Content>
      </List.Item>
    );
  }
};
