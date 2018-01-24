import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Footer from './Footer';

import FeedDetails from '../pages/FeedsDetails';
import FeedsList from '../pages/FeedsList';
import FeedsNew from '../pages/FeedsNew';
import FeedsEdit from '../pages/FeedsEdit';

class App extends Component {
componentDidMount() {
    this.props.fetchUser();
}
render() {
    return (       
        <div>           
            <BrowserRouter>                   
                <div >      
                <Header/> 
                    <div className="container" style={{paddingTop: '55px'}}>               
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/feeds" component={FeedsList}/>    
                    <Switch>
                        <Route exact path="/feeds/new" component={FeedsNew} />
                        <Route exact path="/feeds/edit" component={FeedsEdit}/>
                        <Route exact path="/feeds/:id" component={FeedDetails}/>                      
                    </Switch>                               
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