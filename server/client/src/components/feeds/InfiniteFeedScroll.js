import React, { Component } from 'react';
import { Card, Image, Icon, Embed, Segment } from 'semantic-ui-react';
import { timeToString } from '../../utils/misc.js';
import ReactDOM from 'react-dom';
import { Carousel } from "react-responsive-carousel";

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
          } else if (post.source === 'youtube'){
            return(
              <YoutubeCard key={post.id} post={post} />
            );
          } else {
            return(
              <div key={post.id}></div>
            );
          }
        })}
      </div>
    );
  }
}

export default InfiniteFeedScroll;

class FacebookCard extends Component {
  
  shouldComponentUpdate(nextProps) {
    return (nextProps.post !== this.props.post);
  }
     
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

const renderMedia = function (post) {
  if (post.source === 'facebook' && post.attachments) {
    if (post.attachments.data[0].type === 'video_inline' && post.attachments.data[0].media) {
      const videoRef = post.attachments.data[0].url.replace("://", '%3A%2F%2F');
      const videoHeight = post.attachments.data[0].media.image.height;
      const videoWidth = post.attachments.data[0].media.image.width;
      return (
        <div style={{ width: '100%', height: '0', position: 'relative', paddingBottom: `${videoHeight / videoWidth * 100}%` }}>
          <iframe src={`https://www.facebook.com/plugins/video.php?href=${videoRef}&appId=588914741307945`} style={{ display: 'block', position: 'absolute', height: '100%', width: '100%', top: '0', left: '0' }} scrolling="auto" frameBorder="0" allowFullScreen="true"></iframe>
        </div>
      );
    } else if (post.attachments.data[0].type === 'photo' && post.attachments.data[0].media) {
      return (
        <Image src={post.attachments.data[0].media.image.src} />
      );
    } else if (post.attachments.data[0].type === 'album' && post.attachments.data[0].subattachments) {
      const images = post.attachments.data[0].subattachments.data.map(item => {
        if (item.type === 'photo') {
          return {
            src: item.media.image.src,
            thumbnail: item.media.image.src,
            thumbnailWidth: item.media.image.width,
            thumbnailHeight: item.media.image.height,
          };
        }
      });
      return (
        <Carousel showThumbs={false} emulateTouch>
          {images.map(function (image) {
            return (
              <Image key={image.src} src={image.src} />
            );
          })}
        </Carousel>
      );
    }
  } else if (post.source === 'youtube') {
    return (
      <Embed
        id={post.id}
        placeholder={post.thumbnails.high.url}
        source='youtube'
      />
    );
  }
}

