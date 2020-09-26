import React from "react";

import socket from "../../../api/api";
import ChatContainer from "../../../ChatContainer/ChatContainer";
const ChatRoom = ({
  id,
  roomName,
  roomPort,
  roomAdmin,
  userToLog,
  chatToConnect,
  setCurrentComponent,
  connected,
}) => {
  return (
    <div key={id}>
      <button onClick={() => chatToConnect()}>
        {roomName}-{roomAdmin}
      </button>
    </div>
  );
};

export default ChatRoom;
