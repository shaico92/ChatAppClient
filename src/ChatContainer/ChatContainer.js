import React from "react";

import Input_ from "./Input/Input";
import Output_ from "./Output/Output";
import './ChatContainer.css'
const ChatContainer = ({ room, currentUser ,currentUserPhoto }) => {
  console.log(` this is chatcontainer ${currentUser}`);
  return (
    <div className="ChatContainer"
      
    >
      
      <Input_ userPhoto={currentUserPhoto} roomTo={room} currentUser={currentUser} />
      
    </div>
    
  );
};

export default ChatContainer;
