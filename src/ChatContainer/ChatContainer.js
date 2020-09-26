import React from "react";

import Input_ from "./Input/Input";
import Output_ from "./Output/Output";
const ChatContainer = ({ room, currentUser }) => {
  return (
    <div
      style={{
        marginLeft: "32%",
        width: "40%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Input_ roomTo={room} currentUser={currentUser} />
    </div>
  );
};

export default ChatContainer;
