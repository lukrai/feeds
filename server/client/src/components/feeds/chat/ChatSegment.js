import React, { Component } from 'react';
import MessageList from './MessageList';
import AddMessage from './AddMessage';
import { Segment } from 'semantic-ui-react';
const io = require('socket.io-client');
const socket = io();

class CommentSegment extends Component {

  constructor(props) {
    super(props);
    this.state = { user: '', message: '', messages: [] };
    socket.on('RECEIVE_MESSAGE', (data) => this.addMessage(data));
    this.handleSendMessageClick = this.handleSendMessageClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchMessages(this.props.feedId);
    if (this.props.feedId !== undefined) {
      socket.emit('room', { room: this.props.feedId, user: this.props.user });
    } 
  }

  componentWillMount() {
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {  
    // socket.emit('room', {room: nextProps.feedId})
    this.setState({ messages: nextProps.feedMessageList.messages });
  }

  componentWillUnmount() {
    socket.emit('leave room', { room: this.props.feedId, user: this.props.user })
  }

  addMessage (data) {
    this.setState({messages: [...this.state.messages, data]});
  }


  handleSendMessageClick (message) {
    var messageObj = {
      _id: new Date().toISOString(),
      room: this.props.feedId,
      author: this.props.user,//this.state.username,
      text: message,//this.state.message
      date: new Date().toISOString(),
    }
    socket.emit('SEND_MESSAGE', messageObj)
    this.setState({ messages: [...this.state.messages, messageObj] });
  }

  render() {   
    const { loading, error } = this.props.feedMessageList;
    const user = this.props.user;

    return(
    <Segment>
      <MessageList loading={loading} error={error} messages={this.state.messages}/>
      <AddMessage handleSendMessageClick={this.handleSendMessageClick} handleCommentSubmit={this.props.handleCommentSubmit} user={user} feedId={this.props.feedId} />
    </Segment>
    );
  }

}

export default CommentSegment;
