import React, { useState, useEffect } from "react";
import "./Input.css";

import socket from "../../api/api";

const Input_ = ({ currentUser }) => {
  const sendChatMessage = (content) => {
    socket.emit("send-chat-message", content);
  };

  const [inputVal, setInputVal] = useState("");

  const [output, setOutput] = useState([]);

  const sendMessage = () => {
    sendChatMessage(inputVal);
    const content = { name: "You", message: inputVal };
    console.log(content);

    setOutput([...output, content]);

    setInputVal("");
  };

  useEffect(() => {
    socket.on("chat-message", (message) => {
      setOutput([...output, message]);
    });
    return () => socket.removeListener("chat-message");
  });
  useEffect(() => {
    socket.on("user-connected", (name) => {
      setOutput([...output, `You have joined the chat!`]);
      if (name !== currentUser) {
        setOutput([...output, `${name} has joined the chat!`]);
      }
    });
    return () => socket.removeListener("user-connected");
  });
  useEffect(() => {}, [inputVal, output]);
  return (
    <div>
      <div className="Output">
        {output.map((od) => {
          if (!od.color && !od.name && !od.message) {
            return <p>{od}</p>;
          } else {
            return (
              <p style={{ backgroundColor: `#${od.color}` }}>
                {od.name} : {od.message}
              </p>
            );
          }
        })}
      </div>
      <div className="Input">
        <input
          className="Input_line"
          value={inputVal}
          onChange={(event) => setInputVal(event.target.value)}
          type="text"
          placeholder="Please enter message"
        ></input>
        <div onClick={() => sendMessage()} className="Send">
          Send
        </div>
      </div>
    </div>
  );
};

export default Input_;
