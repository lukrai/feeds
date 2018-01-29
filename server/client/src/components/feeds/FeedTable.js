import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import Pagination from './Pagination';
import FeedLike from './FeedLike';
import FeedTableRow from './FeedTableRow';
import { Segment, Container, Grid,Header, List, Divider, Image, Button, Menu, Icon, Table, Rating } from 'semantic-ui-react';

class FeedTable extends Component {

  constructor() {
		super();

		this.state = {
			pageOfItems: []
		};

		this.onChangePage = this.onChangePage.bind(this);
	}

	onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render(){ 
		return (
      <Segment>             
        <Header as='h1' dividing >
          Feeds
        </Header>           
        <List divided relaxed>
          {this.state.pageOfItems.map(item =>
            <FeedTableRow key={item._id} item={item} user={this.props.user} onLikeClick={this.props.onLikeClick} onUnlikeClick={this.props.onUnlikeClick} />
          )}
          <Pagination items={this.props.items} onChangePage={this.onChangePage} />
        </List>
    </Segment>
    );
  }
}

export default FeedTable;