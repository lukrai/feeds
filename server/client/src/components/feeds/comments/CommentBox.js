import React, { Component } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import { Comment, Form, Header, Button, Segment } from 'semantic-ui-react';


class CommentBox extends Component {

  render(){
    return(
    <Segment>
      <CommentList />
      <AddComment />
    </Segment>
    );
  }

}

export default CommentBox;
