import React, { Component } from 'react';
import FeedTable from './FeedTable';
import { Loader, Segment, Container, Header, Divider, Grid } from 'semantic-ui-react';

class FeedTables extends Component {

  constructor() {
    super();
    this.state = {
      pageOfItems: []
    };
  }

  componentDidMount() {
    this.props.fetchAllFeeds();
  }

  renderTable(feeds) {
    if (feeds) {
      return (
        <FeedTable user={this.props.user} onLikeClick={this.props.onLikeClick} onUnlikeClick={this.props.onUnlikeClick} items={feeds} />
      );
    }
  }

  render() {
    const { feeds, loading, error } = this.props.allFeedsList;
    if (loading) {
      return (
        <div>
        <Grid columns={2} divided style={{ padding: '4em 4em' }} stackable>
          <Grid.Column>
            <Header as='h3' style={{ fontSize: '2em' }}>Feeds by Date</Header>
            <Segment loading={true}><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></Segment>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' style={{ fontSize: '2em' }}>Feeds by Likes</Header>
            <Segment loading={true}><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></Segment>
          </Grid.Column>
        </Grid>
      </div>
      );
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div>
        <Grid columns={2} divided style={{ padding: '4em 4em' }} stackable>
          <Grid.Column>
            <Header as='h3' style={{ fontSize: '2em' }}>Feeds by Date</Header>
            {this.renderTable(feeds.feedsByDate)}
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' style={{ fontSize: '2em' }}>Feeds by Likes</Header>
            {this.renderTable(feeds.feedsByLikes)}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default FeedTables;