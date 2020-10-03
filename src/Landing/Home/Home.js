import React, { useEffect, useState } from "react";
import socket from "../../api/api";
import ChatCreatorForm from "../../Chat/ChatCreatorForm/ChatCreatorForm";
import ChatRooms from "../../Chat/ChatRooms/ChatRooms";
import Chat from "../../Chat/Chat";
import { NavLink } from "react-router-dom";

import axios from "../../api/axios";
const Home = ({ isloggedUser, loggedUserName, loggedUserPhoto ,loggedUserEmail ,cookie }) => {
  const [openRoomCreateForm, setCreateRoom] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomsAvailable, setRoomsAvailable] = useState([]);
  const [connectToRoom, setConnectToRoom] = useState(false);
  const [roomToConnect, setRoomToConnect] = useState(null);
  const [loggedUSer, setLoggedUser] = useState(null)
  const connectToRoomHandler =  (room, name) => {
    console.log(name);
    const data = { room: room, name: name };
     socket.emit("new-user", data);

    //socket.removeListener("new-user");
    setConnectToRoom(true);
  };
  const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
  const createRoomHandler = (chatName) => {
    setRoomCreated(true);
    setCreateRoom(false);

    const roomDefinition = {
      roomId: roomsAvailable.length + 1,
      roomName: chatName,
      roomAdmin: loggedUserName,
    };

    axios
      .post("/chats/createRoom", roomDefinition)
      .then((res) => {
        setRoomsAvailable([...roomsAvailable, res.data[res.data.length - 1]]);
      })
      .catch((err) => {});
  };

  const logged = ()=>{
    if (!document.cookie) {
      
    
      return(<h1>first you need to log in</h1>)  
    
    
    }
    const currentCookie = parseCookie(document.cookie) 
    console.log(currentCookie); 
    if (!cookie&&!currentCookie) {
      return(<h1>first you need to log in</h1>)  
    }else if(currentCookie){
    return(
    connectToRoom === false && roomToConnect === null ?
   <div style={{ flexDirection: "column" }}>
     <div>
       <h1>Welcome {currentCookie.name} you can now start your own chat</h1>
       
       {currentCookie.name ?  <button onClick={() => logout()}>logout</button>: null}
       <button onClick={() => setCreateRoom(true)}>
         Create Your own Chat Room
       </button>
       <ChatCreatorForm
         closeForm={() => setCreateRoom(false)}
         formOpen={openRoomCreateForm}
         userAdmin={currentCookie.name}
         createRoomHandler={(chatName) => createRoomHandler(chatName)}
       />
     </div>
     <ul
       style={{
         flexDirection: "column",
         width: "fit-content",
         display: "flex",
       }}
     >
       <ChatRooms
         isConnecting={connectToRoom}
         rooms={roomsAvailable}
         roomToConnect={(roomNum) => getChat(roomNum)}
       />
     </ul>
   </div>:
    (
           <Chat
             loggedUserPhotoChat={currentCookie.image}
             room={roomToConnect}
             currentUser={currentCookie.name}
           />
         )

    )
    }
  }

  const renderChatsHandler = () => {
    axios
      .get("/chats")
      .then(async (res) => {
        const tempArray = res.data;
        await setRoomsAvailable(tempArray);
        console.log(roomsAvailable);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getChat = (roomNum) => {
    console.log(roomNum);
    axios
      .get(`/chats/${roomNum}`)
      .then(async (res) => {
        if (res.data === true) {
          const currentCookie=  parseCookie(document.cookie)
          setRoomToConnect(roomNum);
          connectToRoomHandler(roomNum, currentCookie.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logout=()=>{
  

    axios.post('/logout')
    
  }

  useEffect(() => {
    
    renderChatsHandler();
    
    
  }, []);

  

  
  return (
    <div>{logged()}</div>
  );
  
};
export default Home;
