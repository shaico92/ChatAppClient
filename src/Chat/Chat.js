import React from "react";
import ChatContainer from "../ChatContainer/ChatContainer";
import "./Chat.css";
import Button from '../UI/Button/Button'
import socket from '../api/api'
const Chat = ({ room, currentUser, loggedUserPhotoChat, cookie }) => {
  /*
  // TODO:
      move the entire home when logged to chat tab
      fix disconnecting from chat and show message to users 
      
  



  */  

const disconnectFromChat=(user, room)=>{
  const whereAndWho = {user: user,room: room}
  socket.emit('disconnect-user',whereAndWho)
}

  return (
    <div className="Chat">
      <Button clicked={()=>disconnectFromChat(currentUser,room.roomID)}/>
      <ChatContainer
        currentUserPhoto={loggedUserPhotoChat}
        room={room.roomID}
        currentUser={currentUser}
      />


    </div>
  );
};

export default Chat;
