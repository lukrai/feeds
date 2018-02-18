import React from 'react'
import { Menu, Sidebar, Container, Segment, Icon } from 'semantic-ui-react'
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
  render() { 
    return(  
      <div>
        <Menu fixed='left' vertical inverted style={style.menu}>  
          <Menu.Item>
            <Icon name='lab' bordered size='large' />
            <strong>
              4Scroll            
            </strong>
          </Menu.Item>        
          <Menu.Item>
            <Menu.Header>Getting Started</Menu.Header>
            <Menu.Menu>
              <Menu.Item as={NavLink} to='/introduction' activeClassName='active'>
                Introduction
              </Menu.Item>
              <Menu.Item as={NavLink} to='/usage' activeClassName='active'>
                Usage
              </Menu.Item>
              <Menu.Item as={NavLink} to='/theming' activeClassName='active'>
                Theming
              </Menu.Item>
              <Menu.Item as={NavLink} to='/layouts' activeClassName='active'>
                Layouts
              </Menu.Item>
              <Menu.Item as='a' href='#'>
                <Icon name='github' /> GitHub
              </Menu.Item>
              <Menu.Item as='a' href={`blob/master/CHANGELOG.md`}>
                <Icon name='file text outline' /> CHANGELOG
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default CustomMenu;
