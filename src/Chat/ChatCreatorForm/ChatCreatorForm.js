import React, { useEffect, useState } from "react";

import ChatContainer from "../../ChatContainer/ChatContainer";

const ChatCreatorForm = ({ createRoomHandler }) => {
  const [chatName, setChatName] = useState("");

  return (
    <div>
      {chatName === "" ? (
        <h1>Please choose a chat name</h1>
      ) : (
        <h1>{chatName}</h1>
      )}

      <input
        type="text"
        placeholder="chat room name"
        onChange={(event) => setChatName(event.target.value)}
      ></input>
      <button onClick={() => createRoomHandler(chatName)}>Create Room</button>
    </div>
  );
};

export default ChatCreatorForm;
