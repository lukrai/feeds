import React, {Component} from 'react';
import Pagination from './Pagination';
import FeedTableRow from './FeedTableRow';
import { Segment, List } from 'semantic-ui-react';

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
      <Segment style={{minHeigth: "150px", important: true}}>             
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