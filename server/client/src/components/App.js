import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

import FeedDetails from '../pages/FeedsDetails';
import FeedsList from '../pages/FeedsList';
import FeedsNew from '../pages/FeedsNew';
 



class App extends Component {
componentDidMount() {
    this.props.fetchUser();
}
render() {
    //console.log(this.props.auth);
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/feeds" component={FeedsList}/>    
                    <Switch>
                        <Route exact path="/feeds/new" component={FeedsNew} />
                        <Route exact path="/feeds/:id" component={FeedDetails}/>
                    </Switch>                               
                    {/* <Route exact path="/feeds/new" component={FeedsNew}/> */}
                    {/* <Route exact path="/feeds/:id" component={FeedDetails}/> */}
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