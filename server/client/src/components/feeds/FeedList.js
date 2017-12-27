import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Loader, Header, Grid, Segment, Button } from 'semantic-ui-react';

class FeedList extends Component {

  componentWillMount() {
    this.props.resetMe();
  }

  componentDidMount() {
      this.props.fetchFeeds();
  }

  renderFeeds(feeds) {
      return (
        <List divided relaxed>
          {feeds.map((feed) => {
            return (             
                <List.Item  as={Link} style={{color:'black'}} to={"feeds/" + feed._id} key={feed._id}>
                  <List.Icon name='arrow right' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>{feed.title}</List.Header>
                    <List.Description>Created: {feed.date_created}</List.Description>
                  </List.Content>
                </List.Item>
            );
          })}
        </List>
      );
  }

  render() {
    const { feeds, loading, error } = this.props.feedsList;
    
    if(loading) {
      return (
        <Loader active >
            <div className="container">
              <h1>Feeds</h1>
              <h3>Loading...</h3>
          </div> 
        </Loader>
      );     
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }
    
    return (
      <Grid columns={3} stackable style={{paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
        <Grid.Column width={4}>
          {console.log(feeds)}
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>             
            <Header as='h1' dividing >
              Feeds <Button floated="right" as={Link} to={"/feeds/new"} basic color='green'>Add Feed</Button>
            </Header>
            {this.renderFeeds(feeds)}

          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>

        </Grid.Column>
      </Grid>
    );
  }
}

export default FeedList;
