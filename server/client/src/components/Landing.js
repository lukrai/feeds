import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import FeedsTablesContainer from '../containers/FeedTablesContainer.js';
import { Segment, Container, Grid, Header, Button, Icon } from 'semantic-ui-react';

class Landing extends Component {

  render() {
    return (
      <div>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 300, padding: '1em 0em'}} //padding: '1em 0em'
          vertical
        >
          <Container text>
            <Header
              as='h1'
              content='4Scroll'
              inverted
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
            />
            <Header
              as='h2'
              content='A modern way to collect feeds!'
              inverted
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            {/* <Button primary size='huge' as={Link} to={"/feeds"}>
              Get Started
						<Icon name='right arrow' />
            </Button> */}
          </Container>
        </Segment>

        <FeedsTablesContainer />

        {/* <Segment vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided stackable columns='equal'>
              <Grid.Row textAlign='center'>
                <Grid.Column >
                  <Header as='h3' style={{ fontSize: '1.5em' }}>Speeds up development</Header>
                  <p>We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                </Grid.Column>
                <Grid.Column >
                  <Header as='h3' content='User Experience Focused' style={{ fontSize: '1.5em' }} />
                  <p>By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                </Grid.Column>
                <Grid.Column >
                  <Header as='h3' style={{ fontSize: '1.5em' }} >Easy to work with</Header>
                  <p>We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment> */}

        <Footer />
      </div>
    );
  }
}

export default Landing;
