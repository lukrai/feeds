import React, { Component } from 'react';
import Footer from './Footer';
import FeedsTablesContainer from '../containers/FeedTablesContainer.js';
import { Segment, Container, Header } from 'semantic-ui-react';

class Landing extends Component {
  render() {
    return (
      <div style={{minWidth: '400px'}}>
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
          </Container>
        </Segment>
        <FeedsTablesContainer />
        <Footer />
      </div>
    );
  }
}

export default Landing;
