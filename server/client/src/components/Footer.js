import React, { Component } from 'react';
import { Segment, Container, Grid,Header,List, Divider } from 'semantic-ui-react';

class Footer extends Component {

    render() {
        return (
          <Segment
            inverted
            vertical
            style={{ margin: '0em 0em 0em', padding: '5em 0em' }}
          >
            <Container textAlign='center'>
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Header inverted as='h4' content='Group 1' />
                    <List link inverted>
                      <List.Item as='a'>Link One</List.Item>
                      <List.Item as='a'>Link Two</List.Item>
                      <List.Item as='a'>Link Three</List.Item>
                      <List.Item as='a'>Link Four</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Header inverted as='h4' content='Group 2' />
                    <List link inverted>
                      <List.Item as='a'>Link One</List.Item>
                      <List.Item as='a'>Link Two</List.Item>
                      <List.Item as='a'>Link Three</List.Item>
                      <List.Item as='a'>Link Four</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column textAlign='center' width={6}>
                    <Header inverted as='h4' content='Footer Header' />
                    <p>We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
      
              <Divider inverted section />

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
