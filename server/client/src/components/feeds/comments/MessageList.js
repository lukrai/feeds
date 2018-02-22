import React, { Component } from 'react';
import CustomMessage from './CustomMessage';
import { Comment, Form, Header, Button } from 'semantic-ui-react';


class MessageList extends Component {

  render(){
    const { comments, loading, error } = this.props.feedCommentList;
    return(
      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>

        {/* {comments.map(function(comment) {
          if(comment){
            return (                   
              <CustomComment key={comment._id} comment={comment}/>
            );
          }
        })} */}
        {this.props.messages.map(function(message) {
          if(message){
            return ( 
              // <div key={message.id} >
              //   author: {message.author._id} message: {message.message},                
              // </div>                  
              <CustomMessage key={message.id} message={message}/>
            );
          }
        })} 
        
      </Comment.Group>
    );
  }

}

export default MessageList;
