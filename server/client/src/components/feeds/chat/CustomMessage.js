import React, { Component } from 'react';
import { timeToString } from '../../../utils/misc.js'
import { Comment, Icon } from 'semantic-ui-react';


class CustomMessage extends Component {

  render() {
    const message = this.props.message;
    return (
        <Comment>
          <Comment.Avatar as={Icon} name='universal access' >
          </Comment.Avatar>
          <Comment.Content>
            <Comment.Author as='a'>{message.author._id}</Comment.Author>
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
