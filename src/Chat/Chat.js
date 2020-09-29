import React from 'react'
import ChatContainer from '../ChatContainer/ChatContainer'
import './Chat.css'
const Chat = ({ room, currentUser ,loggedUserPhotoChat}) => {
  console.log(` this is Chat ${loggedUserPhotoChat}`);
  return (
    <div className="Chat">


    <ChatContainer currentUserPhoto={loggedUserPhotoChat}  room= {room} currentUser= { currentUser}/>
    </div>
  );
};

export default Chat;
