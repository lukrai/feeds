import React, { Component } from 'react';
import ModalConfirmDelete from './ModalConfirmDelete';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeed } from '../../actions';

class FeedView extends Component {

    constructor(props) {
        super(props);
        const feed = {
            _id: "",
            pages: []
        }
        this.state = {
          feed: feed,
        };
      }

    componentDidMount() {
        console.log(this.props.location.pathname);
        console.log(this.props.location.state);
        this.getFeed();
        //console.log(res);
        //this.props.fetchFeed(this.props.location.state.feedId);
    }

    async getFeed(){
        try {
            const res = await axios.get('/api'+this.props.location.pathname);           
            this.setState({feed: res.data});
        } catch(error) {
            // do something with error
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.feed._id}</h1>
                <h1>{this.state.feed.title}</h1>
                {this.state.feed.pages.map(function(page) {
                    return (
                        <li key={page._id}>{page.url}</li>
                    );
                })}
                <p>{this.state.feed.date_created}</p>

                <ModalConfirmDelete/>
                {/* <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a> */}

            </div>
      );
    }
}

function mapStateToProps({ state, ownProps }) {

    console.log(state + " maps to state feed view");
    //return { feed: props.location.state.feedId };
}

export default (FeedView);