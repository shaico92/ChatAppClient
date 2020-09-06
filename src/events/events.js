import React,{useEffect,useState} from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const Event = props=>{
const socket = socketIOClient(ENDPOINT);    
const [connectedUser, setConnectedUser] = useState("");
const name ='shai';
const [msgContentAndUser,setMsgContentAndUser]= useState("");
socket.emit('new-user', name);

const connectedUserF= ()=>{
    socket.on('user-connected' , name=>{
        setConnectedUser(name);
})
}
useEffect(() => {
    
    socket.on("new-user", data => {
      
    });
    
    
  }, []);

  useEffect(()=>{
    socket.emit('chat-message', data=>{
        setMsgContentAndUser(`${data.name}: ${data.message}`)
        props.sentFunc(false);
    });
  },[props.sent])


    return (

        <div >
                {msgContentAndUser} 
        </div>
    )




}


export default Event;