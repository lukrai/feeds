import React, { Component } from 'react';
import { Card, Image, Icon, Embed } from 'semantic-ui-react';
import { timeToString } from '../../utils/misc.js';
import { Carousel } from "react-responsive-carousel";
import FacebookCard from "./FacebookCard.js";
import YoutubeCard from "./YoutubeCard.js";

class InfiniteFeedScroll extends Component {
  render() {
    const { list } = this.props;
    return (
      <div >
        {list.map(function (post) {
          if (post.from && post.source === "facebook") {
            return (
              <FacebookCard key={post.id} post={post} />
            );
          } else if (post.source === "twitter") {
            return (
              <TwitterCard key={post.id} post={post} />
            );
          } else if (post.source === "youtube"){
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

