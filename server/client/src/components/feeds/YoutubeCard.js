import React, { Component } from 'react';
import { Card, Image, Icon, Embed } from 'semantic-ui-react';
import { timeToString } from '../../utils/misc.js';

class YoutubeCard extends Component {
  render() {
    const { post } = this.props;
    return (
      <Card fluid key={post.id}>
        <Card.Content>
          <Card.Header>
            <Image src={`https://i3.ytimg.com/i/${post.channelId}/1.jpg`} floated='left' avatar />
            {post.channelTitle}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {timeToString(post.created_time)}
            </span>
          </Card.Meta>
        </Card.Content>         
        {renderMedia(post)}
        <Card.Content>
          <Card.Description>
            {post.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='like' />
            {/* {post.likes.summary.total_count} Likes */}
          </a>
        </Card.Content>
      </Card>
    );
  }
}

export default YoutubeCard;

const renderMedia = function (post) {
  if (post.source === "youtube") {
    return (
      <Embed
        id={post.id}
        placeholder={post.thumbnails.high.url}
        source='youtube'
        iframe={{
          allowFullScreen: true,
        }}
      />
    );
  }
};