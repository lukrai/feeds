import React, { Component } from 'react';
import CustomComment from './CustomComment';
import { Comment, Form, Header, Button } from 'semantic-ui-react';


class CommentList extends Component {

  render(){
    const { comments, loading, error } = this.props.feedCommentList;
    return(
      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>

        {comments.map(function(comment) {
          if(comment){
            return (                   
              <CustomComment key={comment._id} comment={comment}/>
            );
          }
        })}
        
      </Comment.Group>
    );
  }

}

export default CommentList;
