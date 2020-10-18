import React,{useState} from "react";
import ChatContainer from "../ChatContainer/ChatContainer";
import "./Chat.css";
import LogoutIcon from '../assets/logout.svg'
import Button from '../UI/Button/Button'
import socket from '../api/api'
import Landing from '../Landing/Landing'
const Chat = ({ room, currentUser, loggedUserPhotoChat, cookie }) => {
  /*
  // TODO:
      move the entire home when logged to chat tab
      fix disconnecting from chat and show message to users 
      
  



  */  
const [disconnected, setdisconnected] = useState(false);
const disconnectFromChat=(user, room)=>{
  const whereAndWho = {user: user,room: room}
  socket.emit('disconnect-user',whereAndWho)
  setdisconnected(true);
  
}

  return (
    disconnected===false? 
    <div className="Chat">
      <Button text={'Leave chat room'}  clicked={()=>disconnectFromChat(currentUser,room.roomID)}>
      <img className="doorBtn" src={LogoutIcon} alt='door image'></img>
      </Button>
      <ChatContainer
        currentUserPhoto={loggedUserPhotoChat}
        room={room.roomID}
        currentUser={currentUser}
      />


    </div>:
    <Landing cookie={cookie} link="chats"/>
  );
};

export default Chat;
