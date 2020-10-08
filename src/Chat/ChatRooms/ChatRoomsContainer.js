import React from "react";

import "./ChatRoomsContainer";
import ChatRooms from "./ChatRooms";

const ChatRoomsContainer = ({ connectToRoom, roomsAvailable, getChat }) => {
  return (
    <div className="ChatRoomsContainer" onClick={(roomNum) => getChat(roomNum)}>
      <ChatRooms isConnecting={connectToRoom} rooms={roomsAvailable} />
    </div>
  );
};

export default ChatRoomsContainer;
