import React from "react";

import "./ChatRoomsContainer";
import ChatRooms from "./ChatRooms";

const ChatRoomsContainer = ({ connectToRoom, roomsAvailable, getChat }) => {

const connectionHandler=(room)=>{
  

  getChat(room)
}

  return (
    <div className="ChatRoomsContainer">
      <ChatRooms roomToConnect={(value)=>connectionHandler(value)} isConnecting={connectToRoom} rooms={roomsAvailable} />
    </div>
  );
};

export default ChatRoomsContainer;
