import React, { Component } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import { Comment, Form, Header, Button, Segment } from 'semantic-ui-react';


class CommentSegment extends Component {


  componentDidMount() {
    this.props.fetchComments(this.props.feedId);
  }

  render() {
    const { comments, loading, error } = this.props.feedCommentList;
    const user = this.props.user;


    return(
    <Segment>
      <CommentList feedCommentList={this.props.feedCommentList} />
      <AddComment handleCommentSubmit={this.props.handleCommentSubmit} user={user} feedId={this.props.feedId} />
    </Segment>
    );
  }

}

export default CommentSegment;
