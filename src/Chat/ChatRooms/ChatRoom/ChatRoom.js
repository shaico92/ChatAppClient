import React from "react";

import socket from "../../../api/api";
import ChatContainer from "../../../ChatContainer/ChatContainer";
import "./ChatRoom.css";
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
    <div key={id}  className={"roomContainer"} onClick={() => chatToConnect()}>
      <div className={"roomStyle"} >
        {roomName}-{roomAdmin}
      </div>
    </div>
  );
};

export default ChatRoom;
