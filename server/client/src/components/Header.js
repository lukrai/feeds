import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends Component {
    renderContent() {
        //console.log(this.props.auth);
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
        return (         
            <nav className="deep-purple" role="navigation">
                <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Logo</a>
                    <ul className="right hide-on-med-and-down">
                        {this.renderContent()}     
                    </ul>
          
                    <ul id="nav-mobile" className="side-nav">
                        {this.renderContent()}     
                    </ul>
                    <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
              </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);