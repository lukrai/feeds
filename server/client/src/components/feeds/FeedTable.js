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
    console.log(this.props);
		return (
      // <Table color='black' selectable  inverted>
      //   <Table.Header>
      //     <Table.Row>
      //       <Table.HeaderCell>Feeds</Table.HeaderCell>
      //     </Table.Row>
      //   </Table.Header>

      //   <Table.Body>
      //     {this.state.pageOfItems.map(item =>
      //     <Table.Row key={item._id}>
      //       <Table.Cell as={Link} to={"feeds/" + item._id}>
      //         {item.title}
      //       </Table.Cell>
      //     </Table.Row>
      //     )}
      //   </Table.Body>                 
      //   <Pagination items={this.props.items} onChangePage={this.onChangePage} />
      // </Table>
      <Segment>             
        <Header as='h1' dividing >
          Feeds
        </Header>           
        <List divided relaxed>
        {this.state.pageOfItems.map(item =>
          // return (             
            // as={Link} style={{color:'black'}} to={"feeds/" + item._id}
              <List.Item key={item._id}>
                <List.Content floated='right'>
                  <Icon size='large' name='like' onClick={()=> {this.props.onLikeClick(this.props.feedId,this.props.user)}} /> 4 Likes
                </List.Content>
                <List.Icon name='arrow right' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header>{item.title} </List.Header>
                  <List.Description>Created: {item.date_created}</List.Description>
                </List.Content>
                
              </List.Item>
          // );
        )}
        <Pagination items={this.props.items} onChangePage={this.onChangePage} />
      </List>
    </Segment>
    );
  }
}

export default FeedTable;