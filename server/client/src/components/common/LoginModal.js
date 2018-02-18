import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Grid, Segment, List, Header, Button, Modal, Dimmer, Loader, Sticky, Popup } from 'semantic-ui-react';

class LoginModal extends Component {
  // state = { open: false }

  // show = dimmer => () => this.setState({ open: true })
  // close = () => this.setState({ open: false })

  render() {
    const { open, closeLoginModal } = this.props

    return (
      <div>
        <Modal size='tiny' dimmer open={open} onClose={() => closeLoginModal()} >         
          <Segment textAlign='center'>
            <Header>Login</Header>
              <p>Connect with a social network</p>
            <Button size='large' color='facebook' as='a' href="/auth/facebook">
              <Icon name='facebook' /> Facebook
            </Button>
            <Button size='large' color='google plus' as='a' href="/auth/google">
              <Icon name='google plus' /> Google
            </Button>            
          </Segment>               
        </Modal>
      </div>
    )
  }
}

export default LoginModal;