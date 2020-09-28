import React from 'react'
import ChatContainer from '../ChatContainer/ChatContainer'
import './Chat.css'
const Chat = ({ room, currentUser }) => {
  return (
    <div className="Chat">


    <ChatContainer  room= {room} currentUser= { currentUser}/>
    </div>
  );
};

export default Chat;
