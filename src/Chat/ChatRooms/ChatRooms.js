import React, { useEffect } from "react";

import ChatRoom from "./ChatRoom/ChatRoom";
import "./ChatRooms.css";
const ChatRooms = ({ rooms, userToLog, isConnecting, roomToConnect }) => {
  useEffect(() => {}, [rooms]);

  const roomsHandler = () => {
    const roomsA = rooms.map((room) => (
      <ChatRoom
        id={room.roomId}
        roomName={room.roomName}
        roomAdmin={room.roomAdmin}
        roomPort={room.port}
        connected={isConnecting}
        chatToConnect={() => roomToConnect(room.roomId)}
      ></ChatRoom>
    ));

    return roomsA;
  };

  return <div className={"ChatRooms"}>{roomsHandler()}</div>;
};

export default ChatRooms;
