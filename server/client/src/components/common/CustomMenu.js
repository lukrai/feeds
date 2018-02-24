import React from 'react'
import { connect } from 'react-redux';
import { fetchFeeds, fetchFeedsSuccess, fetchFeedsFailure, resetFeeds  } from '../../actions/feeds';
import { Menu, Sidebar, Container, Segment, Icon, Image } from 'semantic-ui-react'
import { Switch, Route, Link, NavLink } from 'react-router-dom'

const style = {
  menu: {
    position: 'fixed',
    // top: 0,
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
  }

  componentWillMount() {
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user && this.props.user) { //!== this.props.feedsList
      this.props.fetchFeeds();
    }
  }

  render() { 
    const { feeds } = this.props.feedsList;
    return(  
      <div>
        <Menu fixed='left' vertical inverted style={style.menu}>  
          <Menu.Item >
            <svg width="1.25em" height="1.25em" viewBox="0 0 1024 1024" style={{ marginRight: '0.5em' }}>
              <path style={{fill: 'white'}} d={icons.spade}></path>
            </svg>            
            <strong  style={{fontSize: '1.25em'}}>4Scroll</strong>
          </Menu.Item>        
          <Menu.Item>       
            <Menu.Header>My Feeds</Menu.Header>
            <Menu.Menu>
              {feeds.map((feed) => {
                return (             
                  <Menu.Item as={NavLink} to={"feeds/" + feed._id} key={feed._id}>
                    {feed.title}
                  </Menu.Item>
                );
              })}              
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.auth,
    feedsList: state.feeds.feedsList,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeeds: () => {
      var response = dispatch(fetchFeeds());
      response.payload.then((payload) => {
        if(payload.status == 200){
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