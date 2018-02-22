import React, { Component } from 'react';
import MessageList from './MessageList';
import AddMessage from './AddMessage';
import { Comment, Form, Header, Button, Segment } from 'semantic-ui-react';
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
      // this.setState({user: user})
    } 
  }

  componentWillReceiveProps(nextProps) {  
    // socket.emit('room', {room: nextProps.feedId})
  }

  componentWillUnmount() {
    console.log("LEAVE ROOM FFS");
    socket.emit('leave room', {room: this.props.feedId, user: this.props.user})
  }

  addMessage (data) {
    console.log(data);
    this.setState({messages: [...this.state.messages, data]});
    console.log(this.state.messages);
  }



  handleSendMessageClick (message) {
    //ev.preventDefault();
    var messageObj = {
      //id: new Date(year, month, day, hours, minutes, seconds, milliseconds).toDateString(),
      id: new Date().toISOString(),
      room: this.props.feedId,
      author: this.props.user,//this.state.username,
      text: message//this.state.message
  }
    socket.emit('SEND_MESSAGE', messageObj)
    this.setState({messages: [...this.state.messages, messageObj]});
  }

  render() {
    const { comments, loading, error } = this.props.feedCommentList;
    const user = this.props.user;
    console.log(this.state);

    return(
    <Segment>
      <MessageList feedCommentList={this.props.feedCommentList} messages={this.state.messages}/>
      <AddMessage handleSendMessageClick={this.handleSendMessageClick} handleCommentSubmit={this.props.handleCommentSubmit} user={user} feedId={this.props.feedId} />
    </Segment>
    );
  }

}

export default CommentSegment;
