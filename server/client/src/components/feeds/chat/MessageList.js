import React, { Component } from 'react';
import CustomMessage from './CustomMessage';
import { Comment, Header } from 'semantic-ui-react';

const style = {
  segment: {
    height: 300,
    overflowY: 'auto',
  }
}

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.scrollMessagesToBottom = this.scrollMessagesToBottom.bind(this)
  }

  componentDidUpdate() {
    this.scrollMessagesToBottom();
  }

  scrollMessagesToBottom() {
    if (this.messagesRef) {
      this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
    }
  }

  render(){
    const { messages, loading, error } = this.props;

    if (loading) {
      return (         
          <h3>Loading...</h3>
      );
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!messages) {
      return <span />
    }

    return(
      <Comment.Group minimal >
        <Header as='h3' dividing>Chat</Header>
        <div style={style.segment} ref={(ref) => this.messagesRef = ref }  >
          {messages.map(function(message) {
              if(message){
                return (               
                  <CustomMessage key={message._id} message={message}/>
                );
              }
          })}                           
        </div>  
      </Comment.Group> 
    );
  }

}

export default MessageList;

