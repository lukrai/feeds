import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import Pagination from './Pagination';
import { Segment, Container, Grid,Header, List, Divider, Image, Button, Menu, Icon, Table } from 'semantic-ui-react';

class FeedTable extends Component {

  constructor() {
		super();

		// an example array of items to be paged
		//var exampleItems = _.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });

		this.state = {
			//exampleItems: exampleItems,
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
      <Table color='black' selectable  inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Feeds</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.pageOfItems.map(item =>
          <Table.Row key={item._id}>
            <Table.Cell>
              {item.title}
            </Table.Cell>
          </Table.Row>
          )}
        </Table.Body>                 
        <Pagination items={this.props.items} onChangePage={this.onChangePage} />
      </Table>
    );
  }
}

export default FeedTable;