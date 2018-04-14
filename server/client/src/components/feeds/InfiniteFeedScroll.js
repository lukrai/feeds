import React, { Component } from 'react';
import { Card, Image, Icon, Embed } from 'semantic-ui-react';
import { timeToString } from '../../utils/misc.js'

class InfiniteFeedScroll extends Component {

  render() {
    const { list } = this.props;
    return (
      <div>
        {list.map(function (post) {
          if (post.from && post.source === 'facebook') {
            return (
              <FacebookCard key={post.id} post={post} />
            );
          } else if (post.source === 'twitter') {
            return (
              <TwitterCard key={post.id} post={post} />
            );
          } else {
            return(<div key={post.id}></div>);
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
        {renderMedia(post)}
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

class TwitterCard extends Component {
  render() {
    const { post } = this.props;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <Image src={post.user.profile_image_url_https} floated='left' avatar />
            {post.user.screen_name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {timeToString(post.created_time)}
            </span>
          </Card.Meta>
        </Card.Content>
        {/* {renderImage(post)} */}
        <Card.Content>
          <Card.Description>
            {post.text}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='like' />
            {post.retweet_count} Retweets
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

const renderMedia = function (post) {
  if(post.source === 'facebook' && post.attachments.data[0]) {

    if (post.attachments.data[0].type === 'video_inline' && post.attachments.data[0].media) {
      return (
      //   <Embed
      //     icon='right circle arrow'
      //     placeholder={post.attachments.data[0].media.image.src}
      //     url={post.attachments.data[0].url}
      // />
      // <iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fostraining%2Fvideos%2F10152269755926568%2F&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
      // <iframe src={`https://www.facebook.com/plugins/video.php?href=${post.attachments.data[0].url}`} height="315" ></iframe>
      
        <iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&width=500&show_text=false&appId=588914741307945&height=280" width="100%" height="450" style={{overflowY:"auto"}}> scrolling="no" frameBorder="0" allowTransparency="true" allowFullScreen="true"></iframe>
      
    );
    } else if (post.attachments.data[0].type === 'photo' && post.attachments.data[0].media) {
      return (
        <Image src={post.attachments.data[0].media.image.src} />
      );
    } 
  }
}