import React, { useEffect } from "react";

import ChatRoom from "./ChatRoom/ChatRoom";

const ChatRooms = ({ rooms, userToLog, isConnecting, roomToConnect }) => {

  useEffect(()=>{
console.log(rooms);
  },[rooms])


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
