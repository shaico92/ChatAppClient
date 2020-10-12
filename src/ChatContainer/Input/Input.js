import React, { useState, useEffect ,useRef} from "react";
import "./Input.css";
import useRecorder from "./VoiceInput";
import socket from "../../api/api";
import './messages.css'
import axios from '../../api/axios'
import Photo from './tempPhoto.jpg'
const APIURL=axios.defaults.baseURL;
const Input_ = ({ currentUser, userPhoto }) => {
  
  const sendChatMessage = (content) => {
    const smth = {image:userPhoto,content:content}
    socket.emit("send-chat-message", smth);
  };
const inputRef = useRef()
const [finishedMessage,setFinishedMessage]= useState(false)

  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const sendAudio = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      //const url = URL.createObjectURL(file);

      setOutput([...output, { name: "You", message: url }]);
      sendChatMessage(url);
      setFinishedMessage(true)
    }
  };

const sendMessageViaKeyBoard=e=>{
  if (e.key==="Enter") {
    
    sendMessage();
  }
}
  const sendAudio1 = (e) => {
    setOutput([...output, { name: "You", message: e }]);
    sendChatMessage(e);
    //const url = URL.createObjectURL(file);

    // setOutput([...output, { name: "You", message: url }]);
    // sendChatMessage(url);
    setFinishedMessage(true)
  };

  const [inputVal, setInputVal] = useState("");

  const [output, setOutput] = useState([]);

  const sendMessage = () => {
    sendChatMessage(inputVal);
    const content = { name: "You", message: inputVal };
    if (content.message !== "") {
      setOutput([...output, content]);

      setInputVal("");
      setFinishedMessage(true)
    }
  };

  useEffect(() => {
    socket.on("chat-message", (message) => {
      console.log(message);
      if (message.message.content !== "") {
        setOutput([...output, message]);
      }
    });
    return () => socket.removeListener("chat-message");
  });
  useEffect(() => {
    socket.on('user-disconnected',who=>{setOutput([...output, `${who} has left the chat`]);})
    return () => {
      return () => socket.removeListener("user-disconnected");
    };
  });
  useEffect(() => {
    socket.on("user-connected", (name) => {
      setOutput([...output, `${name.name} has joined the chat!`]);
    });
    return () => socket.removeListener("user-connected");
  });
  useEffect(() => {
    
    inputRef.current.focus()});

  useEffect(() => {
    sendAudio1(audioURL);
  }, [audioURL]);
  

  return (
    <div className='Container'>
      <div className="Output">
        <p>You have joined the Chat!</p>
        {output.map((od) => {
          if (!od.color && !od.name && !od.message) {
            //case user joined the chat
            return <p >{od}</p>;
            //displays your audio tag when you send a recording 
          } else if (od.voice) {
            return (
              <div className="Message">
                <img src={`${APIURL}/public/uploads/${userPhoto}`} className="chat-photo"></img>
                <p  style={{ backgroundColor: `#${od.color}` }}>{od.name}</p>
                <audio src={od.voice} controls></audio>;
              </div>
            );
          } else if (od.message.includes("blob:http://localhost")) {
            //displays your audio tag when another user sent a recording
            return (
              <div className="Message">
                <img src={`${APIURL}/public/uploads/${userPhoto}`} className="chat-photo"></img>
                <p  style={{ backgroundColor: `#${od.color}` }}>{od.name}</p>
                <audio src={od.message} controls></audio>;
              </div>
            );
          } else if (od.name !== null&&od.name === "You" && od.message !== "") {
            console.log(od);
            return (
              <div className="Message" >

              <img src={`${APIURL}/public/uploads/${userPhoto}`} className="chat-photo"></img>
              <p  style={{ backgroundColor: `#${od.color}` }}>
                {od.name} : {od.message}
              </p>
              </div>
            );
          }else if(od.name !== "You" && od.message !== ""){
            console.log(userPhoto);
            return (
              <div className="Message-notSelf" >

              <img src={`${APIURL}/public/uploads/${od.image}`} className="chat-photo"></img>
              <p  style={{ backgroundColor: `#${od.color}` }}>
                {od.name} : {od.message}
              </p>
              </div>
            );
          }
        })}
      </div>
      <div className="Input">
        <input ref={inputRef}
        onKeyDown={(e)=>sendMessageViaKeyBoard(e)}
          className="Input_line"
          value={inputVal}
          onChange={(event) => setInputVal(event.target.value)}
          type="text"
          placeholder="Please enter message"
        ></input>
        {inputVal !== "" ? (
          <button  onClick={() => sendMessage()} className="Send">
            Send
          </button>
        ) : (
          <button  onClick={() => sendMessage()} className="Send" disabled>
            Send
          </button>
        )}

        <input
          type="file"
          onChange={(event) => sendAudio(event)}
          accept="audio/*"
          capture
        ></input>
        <button onClick={!isRecording ? startRecording : stopRecording}>
          {!isRecording ? "Record" : "Stop Record"}
        </button>
      </div>
      </div>
  );
};

export default Input_;
