import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import LoginModal from '../../common/LoginModal';

class FeedLike extends Component {

  constructor(props) {
		super(props);

		this.state = {
      liked: this.props.liked,
      likeCount: this.props.likeCount,
      openModal: false 
		};
    this.showLoginModal = this.showLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
  }
  

  showLoginModal = () => {this.setState({ openModal: true })}
  closeLoginModal = () => {this.setState({ openModal: false })}

  componentWillReceiveProps(nextProps){
    if (nextProps.liked !== this.props.liked) {
      this.setState({
        liked: nextProps.liked,
        likeCount: nextProps.likeCount
      });
    }   
  }

  changeLikeState() {
    this.setState({
      liked: !this.state.liked,
      likeCount: (this.state.liked ? (this.state.likeCount -1) : (this.state.likeCount + 1))
    });
  }

  render(){ 
    const itemId = this.props.itemId;  
    if(this.state.liked === null) {
      return (
        <div>
          <a onClick={() => this.showLoginModal(true)}>
            <Icon color='red' name='like' circular={true}/> {this.state.likeCount}
          </a>  
          <LoginModal open={this.state.openModal} closeLoginModal={this.closeLoginModal} />
        </div>    
      );      
    } else if(this.state.liked === false) {
      return (
        <a>
          <Icon color='red' name='like' circular={true} onClick={()=> {this.props.onLikeClick(itemId,this.props.user); this.changeLikeState()}} /> {this.state.likeCount}        
        </a>      
      );
    } else if(this.state.liked === true) {
      return (
        <a>
          <Icon color='red' inverted name='like' circular={true} onClick={()=> {this.props.onUnlikeClick(itemId,this.props.user); this.changeLikeState()}} /> {this.state.likeCount}
        </a>      
      );
    }
  }
}

export default FeedLike;