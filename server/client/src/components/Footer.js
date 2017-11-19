import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Grid,Header,List, Divider,Image } from 'semantic-ui-react';

class Footer extends Component {


    render() {
        return (
            // <footer className="page-footer deep-purple" style={{paddingBottomposition: "fixed", bottom: "0", width: "100%"}} >
            //     <div className="container">
            //         <div className="row">
            //             <div className="col l6 s12">
            //             <h5 className="white-text">Company Bio</h5>
            //             <p className="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>


            //             </div>
            //             <div className="col l3 s12">
            //             <h5 className="white-text">Settings</h5>
            //             <ul>
            //                 <li><a className="white-text" href="#!">Link 1</a></li>
            //                 <li><a className="white-text" href="#!">Link 2</a></li>
            //                 <li><a className="white-text" href="#!">Link 3</a></li>
            //                 <li><a className="white-text" href="#!">Link 4</a></li>
            //             </ul>
            //             </div>
            //             <div className="col l3 s12">
            //             <h5 className="white-text">Connect</h5>
            //             <ul>
            //                 <li><a className="white-text" href="#!">Link 1</a></li>
            //                 <li><a className="white-text" href="#!">Link 2</a></li>
            //                 <li><a className="white-text" href="#!">Link 3</a></li>
            //                 <li><a className="white-text" href="#!">Link 4</a></li>
            //             </ul>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="footer-copyright">
            //         <div className="container">
            //             Made by <a className="orange-text text-lighten-3" href="http://materializecss.com">Materialize</a>
            //         </div>
            //     </div>               
            // </footer>
            <Segment
                inverted
                vertical
                style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
            >
            <Container textAlign='center'>
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Group 1' />
                    <List link inverted>
                      <List.Item as='a'>Link One</List.Item>
                      <List.Item as='a'>Link Two</List.Item>
                      <List.Item as='a'>Link Three</List.Item>
                      <List.Item as='a'>Link Four</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Group 2' />
                    <List link inverted>
                      <List.Item as='a'>Link One</List.Item>
                      <List.Item as='a'>Link Two</List.Item>
                      <List.Item as='a'>Link Three</List.Item>
                      <List.Item as='a'>Link Four</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Group 3' />
                    <List link inverted>
                      <List.Item as='a'>Link One</List.Item>
                      <List.Item as='a'>Link Two</List.Item>
                      <List.Item as='a'>Link Three</List.Item>
                      <List.Item as='a'>Link Four</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Footer Header' />
                    <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
      
              <Divider inverted section />
              <Image
                centered
                size='mini'
                src='/logo.png'
              />
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
