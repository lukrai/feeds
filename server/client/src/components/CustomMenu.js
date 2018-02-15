import React from 'react'
import { Menu, Sidebar, Container, Segment } from 'semantic-ui-react'
import { Switch, Route, Link } from 'react-router-dom'

const style = {
  menu: { margingTop: '30px', backgroundColor: '#555555'},
  pusher: { margingTop:'30px', paddingLeft: '230px', paddingRight: '15px' }
  // pusher: {paddingTop: '62px'}
}

class CustomMenu extends React.Component {
  render() { 
    return(  
      <div>
        <Menu fixed='left' vertical borderless inverted >        
            <Menu.Item as={Link} to='/dashboard/one'>
                Page One
            </Menu.Item>
            <Menu.Item as={Link} to='/dashboard/two'>
                Page Two
            </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default CustomMenu;
