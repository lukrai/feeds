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
};

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
        );
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

function mapStateToProps(state) {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomMenu);
