import React, { Component } from 'react';

import { Comment, Form, Header, Button, Icon } from 'semantic-ui-react';


class CustomComment extends Component {

  render() {
    const comment = this.props.comment;
    return (
        <Comment>
          <Comment.Avatar as={Icon} name='universal access' >
          </Comment.Avatar>
          <Comment.Content>
            <Comment.Author as='a'>Matt</Comment.Author>
            <Comment.Metadata>
              <div>{comment.date_created}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
    );
  }
}

export default CustomComment;
