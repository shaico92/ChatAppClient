import React from "react";

import Input_ from "./Input/Input";
import Output_ from "./Output/Output";
const ChatContainer = ({ currentUser }) => {
  return (
    <div
      style={{
        marginLeft: "32%",
        width: "40%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Input_ currentUser={currentUser} />
    </div>
  );
};

export default ChatContainer;
