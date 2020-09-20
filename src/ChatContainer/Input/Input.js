import React, { useState, useEffect } from "react";
import "./Input.css";
import RecordButton from "./VoiceInput";
import socket from "../../api/api";

const Input_ = ({ currentUser }) => {
  const sendChatMessage = (content) => {
    socket.emit("send-chat-message", content);
  };
  const sendAudio = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      //const url = URL.createObjectURL(file);

      setOutput([...output, { name: "You", message: url }]);
      sendChatMessage(url);
    }
  };
  const [inputVal, setInputVal] = useState("");

  const [output, setOutput] = useState([]);

  const sendMessage = () => {
    sendChatMessage(inputVal);
    const content = { name: "You", message: inputVal };

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

  const setup = () => {
    // const mic = new p5.AudioIn();
    // mic.start();
  };
  return (
    <div>
      <div className="Output">
        {output.map((od) => {
          console.log(od.name);
          if (!od.color && !od.name && !od.message) {
            return <p>{od}</p>;
          } else if (od.voice) {
            return (
              <div>
                <p style={{ backgroundColor: `#${od.color}` }}>{od.name}</p>
                <audio src={od.voice} controls></audio>;
              </div>
            );
          } else if (od.message.includes("blob:http://localhost")) {
            return (
              <div>
                <p style={{ backgroundColor: `#${od.color}` }}>{od.name}</p>
                <audio src={od.message} controls></audio>;
              </div>
            );
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
        <input
          type="file"
          onChange={(event) => sendAudio(event)}
          accept="audio/*"
          capture
        ></input>
      </div>
    </div>
  );
};

export default Input_;
