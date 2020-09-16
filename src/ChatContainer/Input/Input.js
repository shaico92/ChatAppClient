import React, { useState, useEffect } from "react";
import "./Input.css";

import SocketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = SocketIOClient(ENDPOINT);

const Input_ = () => {
  const sendChatMessage = (content) => {
    socket.emit("send-chat-message", content);
  };

  const [inputVal, setInputVal] = useState("");

  const [output, setOutput] = useState([]);

  const sendMessage = () => {
    sendChatMessage(inputVal);

    //setOutput([...output, msg]);
    setOutput([...output, inputVal]);
    //setOutput([...output, message]);
    setInputVal("");
  };

  useEffect(() => {
    socket.on("chat-message", (message) => {
      setOutput([...output, message]);
    });
    return () => socket.removeListener("chat-message");
  });

  useEffect(() => {}, [inputVal, output]);
  return (
    <div>
      <div className="Output">
        {output.map((od) => (
          <p>{od}</p>
        ))}
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
