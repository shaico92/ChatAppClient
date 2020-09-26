import React, { useEffect, useState } from "react";
import socket from "../../api/api";
import ChatCreatorForm from "../../Chat/ChatCreatorForm/ChatCreatorForm";
import ChatContainer from "../../ChatContainer/ChatContainer";
import { NavLink } from "react-router-dom";

import axios from "../../api/axios";
const Home = ({ isloggedUser, loggedUserName }) => {
  const [openRoomCreateForm, setCreateRoom] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomsAvailable, setRoomsAvailable] = useState([]);

  // const createRoomHandler = (name) => {
  //   console.log(name);
  //   socket.emit("new-user", name);

  //   socket.removeListener("new-user");
  //   setRoomCreated(true);
  // };

  const createRoomHandler = (chatName) => {
    setRoomCreated(true);
    setCreateRoom(false);
    console.log(chatName);
    const roomDefinition = { roomName: chatName, roomAdmin: loggedUserName };

    axios
      .post("/chats/createRoom", roomDefinition)
      .then(async (res) => {})
      .catch((err) => {});
  };

  useEffect(() => {}, [roomCreated]);

  const renderChatsHandler = () => {
    axios
      .get("/chats")
      .then(async (res) => {
        const tempArray = res.data;
        setRoomsAvailable(tempArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showChat = () => {
    // switch (param) {
    //   case true:
    //     return (
    //       <div>
    //         <h1>room created</h1>
    //         <ChatContainer currentUser={loggedUserName} />
    //       </div>
    //     );

    //   default:
    return (
      <div style={{ flexDirection: "column" }}>
        <div>
          <h1>Welcome {loggedUserName} you can now start your own chat</h1>

          <button onClick={() => setCreateRoom(true)}>
            Create Your own Chat Room
          </button>
          {openRoomCreateForm === true ? (
            <ChatCreatorForm
              userAdmin={loggedUserName}
              createRoomHandler={(chatName) => createRoomHandler(chatName)}
            />
          ) : null}
        </div>
        <ul
          style={{
            flexDirection: "column",
            width: "fit-content",
            display: "flex",
          }}
        >
          <NavLink to="/chats" onClick={() => renderChatsHandler()}>
            Chats
          </NavLink>
          {roomsAvailable.map((room, index) => {
            return (
              <a href={`/chats/:${room.roomName}-${index}`}>
                {room.roomName}-{room.roomAdmin}
              </a>
            );
          })}
        </ul>
      </div>
    );

    // break;
    // }
  };

  switch (isloggedUser) {
    case true:
      return <div>{showChat()}</div>;
    default:
      return (
        <div>
          <h1>First login to get Started</h1>
        </div>
      );
  }
};

export default Home;
