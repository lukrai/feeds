import React from 'react'
import { connect } from 'react-redux';
import { fetchFeeds, fetchFeedsSuccess, fetchFeedsFailure, resetFeeds  } from '../../actions/feeds';
import LoginModal from './LoginModal';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const style = {
  menu: {
    position: 'fixed',
    top: '4.5em',
    // bottom: 0,
    // left: 0,
    width: 250,
    paddingBottom: '1em',
    background: '#1B1C1D',
    overflowY: 'scroll',
  },
  pusher: { margingTop:'30px', paddingLeft: '230px', paddingRight: '15px' }
  // pusher: {paddingTop: '62px'}
}

class CustomMenu extends React.Component {

  constructor (props) {
    super(props);
    this.state = { openModal: false };
    this.showLoginModal = this.showLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
  }

  showLoginModal = () => {this.setState({ openModal: true })}
  closeLoginModal = () => {this.setState({ openModal: false })}

  componentWillMount() {
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user && nextProps.user) {
      this.props.fetchFeeds();
    }
  }

  renderContent() {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return (
          <Menu.Item  onClick={() => this.showLoginModal(true)}>
            Login
          </Menu.Item>
        );
      default:
        return(
          <Menu.Item  as='a' href="/api/logout">
            Logout
          </Menu.Item>      
        )
    }
  }

  renderFeeds() {
    if(!this.props.user){
      return (
        <Menu.Menu>
          <Menu.Item >
            Please Login to see your feeds
          </Menu.Item> 
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu>
          {this.props.feedsList.map((feed) => {
            return (             
              <Menu.Item as={Link} to={"../feeds/" + feed._id} key={feed._id}>
                {feed.title}
              </Menu.Item>
            );
          })}              
        </Menu.Menu>
      );
    }
  }

  render() { 
    return(  
      <div>
        <Menu fixed='left' vertical inverted style={style.menu}>  
          {/* <Menu.Item >
            <svg width="1.25em" height="1.25em" viewBox="0 0 1024 1024" style={{ marginRight: '0.5em' }}>
              <path style={{fill: 'white'}} d={icons.spade}></path>
            </svg>            
            <strong  style={{fontSize: '1.25em'}}>4Scroll</strong>
          </Menu.Item> */}
          <Menu.Item>       
            <Menu.Header>My Feeds</Menu.Header>
            {this.renderFeeds()}
          </Menu.Item>
          <Menu.Item>
            <Menu.Menu>
              {this.renderContent()}
            </Menu.Menu>
          </Menu.Item>
          <LoginModal open={this.state.openModal} closeLoginModal={this.closeLoginModal} />
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.auth,
    feedsList: state.feeds.feedsList.feeds.userFeeds,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeeds: () => {
      var response = dispatch(fetchFeeds());
      response.payload.then((payload) => {
        if(payload.status === 200){
          dispatch(fetchFeedsSuccess(payload.data));
        }            
      }).catch((err) => {
        dispatch(fetchFeedsFailure(err));
      });
    },
    resetMe: () => {
      dispatch(resetFeeds());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomMenu);

const icons = {
  'spade': "M817.57 348.15c-193.566-143.858-260.266-259.018-305.566-348.148v0c-0.004 0-0.004-0.002-0.004-0.002v0.002c-45.296 89.13-112 204.292-305.566 348.148-330.036 245.286-19.376 587.668 253.758 399.224-17.796 116.93-78.53 202.172-140.208 238.882v37.744h384.032v-37.74c-61.682-36.708-122.41-121.954-140.212-238.884 273.136 188.446 583.8-153.94 253.766-399.226z"
};