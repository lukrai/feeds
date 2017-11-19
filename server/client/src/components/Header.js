import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Icon, Dropdown, Menu, Segment, Button, Card, Image, Grid } from 'semantic-ui-react';

class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {left: false};
    }

    renderContent() {
        switch (this.props.auth) {
          case null:
            return;
          case false:
            return <li><a href="/auth/google">Login With Google</a></li>;
          default:
            return [ 
                <li key="2"><a href="/api/logout">Logout</a></li>
            ];
        }
    }
    render() {
        console.log(this.props)
        return (         
            // <nav className="deep-purple" role="navigation">
            //     <div className="nav-wrapper container"><a id="logo-container" href="/" className="brand-logo">Logo</a>
            //         <ul className="right hide-on-med-and-down">
            //             {this.renderContent()}     
            //         </ul>
          
            //         <ul id="nav-mobile" className="side-nav hide-on-med">
            //             <li><a href="12">Navbar Link</a></li>
            //             {/* {this.renderContent()}      */}
            //         </ul>
            //         <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i>
                    
            //          </a>
            //   </div>
            // </nav>
            <div>
            <Menu fixed='top' inverted style={{height: '60px'}}>
                <Container>
                    <Menu.Item as='a' header>
                    <Image
                        size='mini'
                        src='/logo.png'
                        style={{ marginRight: '1.5em' }}
                    />
                    Project Name
                    </Menu.Item>
                    <Menu.Item as='a'>Home</Menu.Item>

                    <Dropdown item simple text='Dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Submenu</span>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Menu>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default  connect(mapStateToProps)(Header);