import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


import Landing from './Landing';
import Dashboard from './Dashboard';
import Footer from './Footer';

import FeedDetails from '../pages/FeedsDetails';
import FeedsList from '../pages/FeedsList';
import FeedsNew from '../pages/FeedsNew';
import FeedsEdit from '../pages/FeedsEdit';
import FixedTopMenu from './FixedTopMenu'
import CustomMenu from './CustomMenu'

import { Menu, Icon, Segment, Container, Sidebar } from 'semantic-ui-react';

const style = {
    layout: {display: "flex", flex: 1, minHeight: "100vh", flexDirection: "column", backgroundColor: '#E5E5E5'},
    pusher: { paddingTop:'60px' },
}

class App extends Component {

componentDidMount() {
    this.props.fetchUser();
}

render() {
    return (       
      <div>           
        <BrowserRouter>                   
          <div >           
            <FixedTopMenu/>
            <div>
              <Sidebar as={CustomMenu}/>
              <Sidebar.Pusher style={style.pusher}>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/feeds" component={FeedsList}/>    
                <Switch>
                  <Route exact path="/feeds/new" component={FeedsNew} />
                  <Route exact path="/feeds/edit" component={FeedsEdit}/>
                  <Route exact path="/feeds/:id" component={FeedDetails}/>                      
                </Switch>                 
              </Sidebar.Pusher>
            </div>
          </div>
        </BrowserRouter>           
      </div>
    );
  }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);