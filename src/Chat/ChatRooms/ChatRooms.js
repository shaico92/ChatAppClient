import React from "react";

import ChatRoom from "./ChatRoom/ChatRoom";

const ChatRooms = ({ rooms, userToLog, isConnecting, roomToConnect }) => {
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

  return <div>{roomsHandler()}</div>;
};

export default ChatRooms;
