import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import UpdateUsernameContainer from '../../containers/UpdateUsernameContainer';
import { Container, Dropdown, Menu, Button, Responsive } from 'semantic-ui-react';

class FixedTopMenu extends Component {
  constructor (props) {
    super(props);
    this.state = { openModal: false };
    this.showLoginModal = this.showLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
  }

  showLoginModal = () => {this.setState({ openModal: true })}
  closeLoginModal = () => {this.setState({ openModal: false })}

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Menu.Item position='right'>
            <Button inverted onClick={() => this.showLoginModal(true)}>Login</Button>
          </Menu.Item>
        );
      default:
        return [ 
          <Menu.Item key='1' as={Link} to='/feeds'>My Feeds</Menu.Item>,
          <Menu.Item key='3' position='right'> {this.props.auth.username}</Menu.Item>,
          <Menu.Item key='2' style={{ marginLeft: '10px' }}>
            <Button as='a' href="/api/logout" inverted>Logout</Button>
          </Menu.Item>
        ];
    }
  }

  renderContentMobile() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Dropdown.Item  onClick={() => this.showLoginModal(true)}>Login</Dropdown.Item>
        );
      default:
        return [ 
          <Dropdown.Item key='1' as={Link} to='/feeds'>My Feeds</Dropdown.Item>,
          <Dropdown.Divider key='2'/>,
          <Dropdown.Item key='3' as='a' href="/api/logout" >Logout</Dropdown.Item>
        ];
    }
  }

  render() {
    return (         
      <div>
        <Menu fixed='top' inverted borderless style={{height: '4.5em',  border: '1px solid #000', paddingLeft: '250px'}}> {/* boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'*/}
          <Container>
            <Menu.Item as={Link} to='/' header style={{ fontSize: '1.75em' }}>
              <svg width="22" height="22" viewBox="0 0 1024 1024" style={{ marginRight: '0.5em' }}>
                <path style={{fill: 'white'}} d={icons.spade}></path>
              </svg>
              4Scroll
            </Menu.Item>                  
            {this.renderContent()}
            <LoginModal open={this.state.openModal} closeLoginModal={this.closeLoginModal} /> 
          </Container>
        </Menu>
        <UpdateUsernameContainer/>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default  connect(mapStateToProps)(FixedTopMenu);

const icons = {
  'bin2': 'M192 1024h640l64-704h-768zM640 128v-128h-256v128h-320v192l64-64h768l64 64v-192h-320zM576 128h-128v-64h128v64z',
  'facebook': 'M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z',
  'spade': "M817.57 348.15c-193.566-143.858-260.266-259.018-305.566-348.148v0c-0.004 0-0.004-0.002-0.004-0.002v0.002c-45.296 89.13-112 204.292-305.566 348.148-330.036 245.286-19.376 587.668 253.758 399.224-17.796 116.93-78.53 202.172-140.208 238.882v37.744h384.032v-37.74c-61.682-36.708-122.41-121.954-140.212-238.884 273.136 188.446 583.8-153.94 253.766-399.226z"
};