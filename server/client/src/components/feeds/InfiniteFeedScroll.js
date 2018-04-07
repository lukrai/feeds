import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { timeToString } from '../../utils/misc.js'

class InfiniteFeedScroll extends Component {

  render() {
    const { list } = this.props;
    return (
      <div>
        {list.map(function (post) {
          if (post.from) {
            return (
              <FacebookCard key={post.id} post={post} />
            );
          } else {
            return(<div></div>);
          }
        })}
      </div>
    );
  }
}

export default InfiniteFeedScroll;

class FacebookCard extends Component {
  render() {
    const { post } = this.props;
    return (
      <Card fluid key={post.id}>
        <Card.Content>
          <Card.Header>
            <Image src={post.from.picture.data.url} floated='left' avatar />
            {post.from.name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {timeToString(post.created_time)}
            </span>
          </Card.Meta>
        </Card.Content>
        {renderImage(post)}
        <Card.Content>
          <Card.Description>
            {post.message}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='like' />
            {post.likes.summary.total_count} Likes
          </a>
        </Card.Content>
      </Card>
    );
  }
}

const renderImage = function (post) {
  if (post.attachments.data[0].media) {
    return (
      <Image src={post.attachments.data[0].media.image.src} />
    );
  }
}