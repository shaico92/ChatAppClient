import React, { useEffect, useState } from "react";
import socket from "../../api/api";
import ChatCreatorForm from "../../Chat/ChatCreatorForm/ChatCreatorForm";
import ChatRoomsContainer from "../../Chat/ChatRooms/ChatRoomsContainer";
import Chat from "../../Chat/Chat";
import { NavLink } from "react-router-dom";
import "./Chats.css";
import axios from "../../api/axios";
const Chats = ({
  isloggedUser,
  loggedUserName,
  loggedUserPhoto,
  loggedUserEmail,
  cookie,
}) => {
  const [openRoomCreateForm, setCreateRoom] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomsAvailable, setRoomsAvailable] = useState([]);
  const [connectToRoom, setConnectToRoom] = useState(false);
  const [roomToConnect, setRoomToConnect] = useState(null);
  const [loggedUSer, setLoggedUser] = useState(null);
  const connectToRoomHandler = (room, name) => {
    console.log(name);
    const data = { room: room, name: name };
    socket.emit("new-user", data);

    //socket.removeListener("new-user");
    setConnectToRoom(true);
  };

  const createRoomHandler = (chatName) => {
    setRoomCreated(true);
    setCreateRoom(false);

    const roomDefinition = {
      roomId: roomsAvailable.length + 1,
      roomName: chatName,
      roomAdmin: cookie.name,
    };

    axios
      .post("/chats/createRoom", roomDefinition)
      .then((res) => {
        setRoomsAvailable([...roomsAvailable, res.data[res.data.length - 1]]);
      })
      .catch((err) => {});
  };

  const logged = () => {
    if (!cookie && !isloggedUser) {
      console.log(cookie);
      return <h1>first you need to log in</h1>;
    } else if (cookie) {
      console.log(cookie);
      return connectToRoom === false && roomToConnect === null ? (
        <div className={"Chats-Layout"}>
          <div>Welcome {cookie.name} you can now start your own chat</div>

          <button onClick={() => setCreateRoom(true)}>
            Create Your own Chat Room
          </button>

          {/* <div className={"ChatRoomsContainer"}>
            <ChatRooms
              isConnecting={connectToRoom}
              rooms={roomsAvailable}
              roomToConnect={(roomNum) => getChat(roomNum)}
            />
          </div> */}
          <ChatRoomsContainer
            connectToRoom={connectToRoom}
            roomsAvailable={roomsAvailable}
            getChat={(roomNum) => getChat(roomNum)}
          />

          <ChatCreatorForm
            currentUserCookie={cookie}
            closeForm={() => setCreateRoom(false)}
            formOpen={openRoomCreateForm}
            userAdmin={cookie.name}
            createRoomHandler={(chatName) => createRoomHandler(chatName)}
          />
        </div>
      ) : (
        <Chat
          loggedUserPhotoChat={cookie.image}
          room={roomToConnect}
          currentUser={cookie.name}
        />
      );
    }
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
          connectToRoomHandler(roomNum, cookie.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logout = () => {
    axios.post("/logout");
  };

  useEffect(() => {
    renderChatsHandler();
  }, [cookie]);

  return logged();
};
export default Chats;
