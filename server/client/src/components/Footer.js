import React, { Component } from 'react';
import { Segment, Container, Grid, Header, List, Divider } from 'semantic-ui-react';

class Footer extends Component {

  render() {
    return (
      <Segment
        inverted
        vertical
        style={{ margin: '0em 0em 0em', padding: '1em 0em' }}
      >
        <Container textAlign='center'>
          <List horizontal inverted divided link>
            <List.Item as='a' href='#'>Site Map</List.Item>
            <List.Item as='a' href='#'>Contact Us</List.Item>
            <List.Item as='a' href='#'>Terms and Conditions</List.Item>
            <List.Item as='a' href='#'>Privacy Policy</List.Item>
          </List>
        </Container>
      </Segment>
    );
  }
};

export default Footer;
