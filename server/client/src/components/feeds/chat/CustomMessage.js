import React, { Component } from 'react';
import { timeToString } from '../../../utils/misc.js'
import { Comment } from 'semantic-ui-react';

class CustomMessage extends Component {
  render() {
    const message = this.props.message;
    return (
        <Comment style={{paddingLeft: '0.5em'}} >
          <Comment.Content>
            <Comment.Author as='a'>{message.author.username}</Comment.Author>
            <Comment.Metadata>
              <div>{timeToString(message.date)}</div>
            </Comment.Metadata>
            <Comment.Text>{message.text}</Comment.Text>
          </Comment.Content>
        </Comment>
    );
  }
}

export default CustomMessage;
