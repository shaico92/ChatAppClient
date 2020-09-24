import React, { useEffect, useState } from "react";

import ChatContainer from "../../ChatContainer/ChatContainer";
const ChatCreatorForm = ({ clicked, userAdmin, createRoomHandler }) => {
  const [chatName, setChatName] = useState("");
  const [createRoom, setCreateRoom] = useState(false);

  useEffect(() => {}, [createRoom]);
  const showCreateForm = (param) => {
    switch (param) {
      case true:
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
            <button onClick={() => createRoomHandler(userAdmin)}>
              Create Room
            </button>
          </div>
        );

      default:
        return <></>;
    }
  };

  return <div>{showCreateForm(clicked)}</div>;
};

export default ChatCreatorForm;
