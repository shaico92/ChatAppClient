import React from 'react'
import ChatContainer from '../ChatContainer/ChatContainer'
import './Chat.css'
const Chat = ({ room, currentUser ,loggedUserPhotoChat,cookie}) => {
  /*
  // TODO:
      move the entire home when logged to chat tab
      fix disconnecting from chat and show message to users 
      
  



  */
  return (
    <div className="Chat">


    <ChatContainer currentUserPhoto={loggedUserPhotoChat}  room= {room} currentUser= { currentUser}/>

    <button className={'Exit-Chat'}>exit chat room</button>
    </div>
  );
};

export default Chat;
