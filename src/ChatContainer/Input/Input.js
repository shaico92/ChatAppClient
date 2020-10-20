import React, { useState, useEffect ,useRef} from "react";
import "./Input.css";
import useRecorder from "./VoiceInput";
import socket from "../../api/api";
import './messages.css'
import axios from '../../api/axios'

const APIURL=axios.defaults.baseURL;
const Input_ = ({ currentUser, userPhoto }) => {
  
  const sendChatMessage = (content) => {
    const smth = {image:userPhoto,content:content}
    socket.emit("send-chat-message", smth);
  };
  const sendAudioMessage= content=>{
    const obj={image: userPhoto,content: content}
    socket.emit('send-audio',obj)
  }
const inputRef = useRef()

const [finishedMessage,setFinishedMessage]= useState(false)
const scrollToDown =()=>{
  document.querySelector('.Output').scrollTop = document.querySelector('.Output').scrollHeight;
}    

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
const typing=e=>{
  
  setInputVal(e.target.value);
    if (e.target.value&&e.target.value!=='') {
    
    socket.emit('typing-message',userPhoto);
    
  }

}
  const sendAudio1 = (e) => {
    
    sendChatMessage(e);
    setOutput([...output, { name: "You", myVoice: e }]);
    //const url = ;

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
    scrollToDown()
  }, [output])

  useEffect(()=>{
    socket.on("other-typing", (who) => {

      const content = { name: "someone", whoPhoto: who };
      //  setOutput([...output, content]);
        
      
    });
    return () => socket.removeListener("other-typing");
  })


  useEffect(() => {
    socket.on("chat-message", (message) => {
      setOutput([...output, message]);
        console.log(output);
      
    });
    return () => socket.removeListener("chat-message");
  });

  


  useEffect(() => {
    socket.on('user-disconnected',who=>{setOutput([...output, `${who} has left the chat`]);});
      return () => socket.removeListener("user-disconnected");
    
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
    
      if (audioURL!=='') {
        sendAudio1(audioURL);
      }
    
  }, [audioURL]);
  

  return (
    <div className='Container'>
      <div  className="Output">
        <div>You have joined the Chat!</div>
        {output.map((od) => {
          
          if (!od.color && !od.name && !od.message) {
            //case user joined the chat
            return <div >{od}</div>;
            //displays your audio tag when you send a recording 
          } else if (od.myVoice) {
            return (
              <div  className="Message">
                <img alt="#"  src={`${APIURL}/public/uploads/${userPhoto}`} className="chat-photo"></img>
                <div  style={{ backgroundColor: `#${od.color}` }}>{od.name}</div>
                <audio src={od.myVoice} controls></audio>
              </div>
            );
          } else if (od.voice) {
            //displays your audio tag when another user sent a recording
            return (
              <div  className="Message-notSelf">
                <img alt="#"  src={`${APIURL}/public/uploads/${od.image}`} className="chat-photo"></img>
                <div  style={{ backgroundColor: `#${od.color}` }}>{od.name}</div>
                <audio src={od.voice} controls></audio>
              </div>
            );
          } else if (od.name !== null&&od.name === "You" && od.message !== "") {
            
            return (
              <div  className="Message" >

              <img alt="#"  src={`${APIURL}/public/uploads/${userPhoto}`} className="chat-photo"></img>
              <div  style={{ backgroundColor: `#${od.color}` }}>
                 <p>{od.message}</p>
              </div>
              </div>
            );
          }else if(od.name !== "You" && od.message !== ""){
            
            return (
              <div  className="Message-notSelf" >

              <img alt="#"  src={`${APIURL}/public/uploads/${od.image}`} className="chat-photo"></img>
              <div  style={{ color: `#${od.color}`,}}>
              {od.name} 
                <p > {od.message}</p>
              </div>
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
          onChange={(event) => typing(event)}
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
