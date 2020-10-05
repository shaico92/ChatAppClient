import React from 'react'
import ChatContainer from '../ChatContainer/ChatContainer'
import './Chat.css'
const Chat = ({ room, currentUser ,loggedUserPhotoChat}) => {
  console.log(` this is Chat ${currentUser}`);
  return (
    <div className="Chat">


    <ChatContainer currentUserPhoto={loggedUserPhotoChat}  room= {room} currentUser= { currentUser}/>

    <button className={'Exit-Chat'}>exit chat room</button>
    </div>
  );
};

export default Chat;
