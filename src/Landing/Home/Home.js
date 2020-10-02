import React, { useEffect, useState } from "react";
import socket from "../../api/api";
import ChatCreatorForm from "../../Chat/ChatCreatorForm/ChatCreatorForm";
import ChatRooms from "../../Chat/ChatRooms/ChatRooms";
import Chat from "../../Chat/Chat";
import { NavLink } from "react-router-dom";

import axios from "../../api/axios";
const Home = ({ isloggedUser, loggedUserName, loggedUserPhoto }) => {
  const [openRoomCreateForm, setCreateRoom] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomsAvailable, setRoomsAvailable] = useState([]);
  const [connectToRoom, setConnectToRoom] = useState(false);
  const [roomToConnect, setRoomToConnect] = useState(null);

  const connectToRoomHandler = async (room, name) => {
    console.log(name);
    const data = { room: room, name: name };
    await socket.emit("new-user", data);

    //socket.removeListener("new-user");
    setConnectToRoom(true);
  };

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
          setRoomToConnect(roomNum);
          connectToRoomHandler(roomNum, loggedUserName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    renderChatsHandler();
  }, []);

  const showChat = () => {
    return (
      <div style={{ flexDirection: "column" }}>
        <div>
          <h1>Welcome {loggedUserName} you can now start your own chat</h1>

          <button onClick={() => setCreateRoom(true)}>
            Create Your own Chat Room
          </button>
          <ChatCreatorForm
            closeForm={() => setCreateRoom(false)}
            formOpen={openRoomCreateForm}
            userAdmin={loggedUserName}
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
      </div>
    );

    // break;
    // }
  };

  switch (isloggedUser) {
    case true:
      return connectToRoom === false && roomToConnect === null ? (
        <div>{showChat()}</div>
      ) : (
        <Chat
          loggedUserPhotoChat={loggedUserPhoto}
          room={roomToConnect}
          currentUser={loggedUserName}
        />
      );
    default:
      return (
        <div>
          <h1>First login to get Started</h1>
        </div>
      );
  }
};
export default Home;
