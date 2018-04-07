import React, { Component } from 'react';
import FeedTable from './FeedTable';
import { Loader, Segment, Container, Header, Divider } from 'semantic-ui-react';

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
        <Loader active >
          <div>
            <h1>Feeds</h1>
            <h3>Loading...</h3>
          </div>
        </Loader>
      );
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>Feeds by Date</Header>
            <p style={{ fontSize: '1.33em' }}>
              Instead of focusing on content creation and hard work, we have learned how to master the art of doing
            nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
            and worth your attention.
            </p>
            {this.renderTable(feeds.feedsByDate)}
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              <a href='#'>Case Studies</a>
            </Divider>
            <Header as='h3' style={{ fontSize: '2em' }}>Feeds by Likes</Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really
            true.
            It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
            </p>
            {this.renderTable(feeds.feedsByLikes)}
          </Container>
        </Segment>
      </div>
    );
  }
}

export default FeedTables;