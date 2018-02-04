import React, {Component} from 'react';
import { List } from 'semantic-ui-react';
import FeedLike from './FeedLike';

class FeedTableRow extends Component {

  renderLike(item) {
    if(!this.props.user) {
      return (
        <FeedLike liked={null} likeCount={item.like_count} itemId={item._id} />  
      );
    } else if(item.likes.indexOf(this.props.user._id) === -1) {
      return (
        <FeedLike liked={false} onLikeClick={this.props.onLikeClick} onUnlikeClick={this.props.onUnlikeClick} likeCount={item.like_count} itemId={item._id} user={this.props.user}/>  
      );
    } else if(item.likes.indexOf(this.props.user._id) !== -1) {
      return (
        <FeedLike liked={true} onLikeClick={this.props.onLikeClick} onUnlikeClick={this.props.onUnlikeClick} likeCount={item.like_count} itemId={item._id} user={this.props.user}/>    
      );
    }
  }

  render(){ 
    const item = this.props.item;

    return (
      <List.Item key={item._id}>
        <List.Content floated='right'>
          {this.renderLike(item)}
        </List.Content>
        <List.Icon name='arrow right' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>{item.title} </List.Header>
          <List.Description>Created: {item.date_created}</List.Description>
        </List.Content>            
      </List.Item>     
    );             
  }
}

export default FeedTableRow;