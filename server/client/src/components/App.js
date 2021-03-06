import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Error from './Error';

import FeedDetails from '../pages/FeedsDetails';
import FeedsList from '../pages/FeedsList';
import FeedsNew from '../pages/FeedsNew';
import FeedsEdit from '../pages/FeedsEdit';
import FixedTopMenu from './common/FixedTopMenu';
import CustomMenu from './common/CustomMenu';

import { Sidebar } from 'semantic-ui-react';

const style = {
    layout: {display: "flex", flex: 1, minHeight: "100vh", flexDirection: "column" },
    pusher: { paddingTop:'4.5em', paddingLeft: '250px' },
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
            <div style={style.layout}>
              <FixedTopMenu />
              <Sidebar as={CustomMenu}/>
              <Sidebar.Pusher style={style.pusher}>  
                <Switch>
                  <Route exact path="/" component={Landing}/>
                  <Route exact path="/feeds" component={FeedsList}/> 
                  <Route exact path="/feeds/new" component={FeedsNew} />
                  <Route exact path="/feeds/edit" component={FeedsEdit}/>
                  <Route exact path="/feeds/:id" component={FeedDetails}/>     
                  <Route component={Error} />                 
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