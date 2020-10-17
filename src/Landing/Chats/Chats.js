import React, { useEffect, useState } from "react";
import socket from "../../api/api";
import ChatCreatorForm from "../../Chat/ChatCreatorForm/ChatCreatorForm";
import ChatRoomsContainer from "../../Chat/ChatRooms/ChatRoomsContainer";
import Chat from "../../Chat/Chat";
import ConnectRoom from "../../Chat/ChatRooms/ConnetRoom/ConnectRoom";
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
  const [whichRoomToConnect, setWhichRoomToConnect] = useState(null);
  const [askConnectToRoom, setAskConnectToRoom] = useState(false);
  const connectToRoomHandler = (room, name) => {
    console.log(name);
    const data = { room: room.roomID, name: name };
    socket.emit("new-user", data);

    //socket.removeListener("new-user");
    setConnectToRoom(true);
  };

  const connectHandler = (room) => {
    setAskConnectToRoom(true);
    setWhichRoomToConnect(room);
    console.log(room);
  };

  const createRoomHandler = (chatProps) => {
    setRoomCreated(true);
    setCreateRoom(false);

    const roomDefinition = {
      roomId: roomsAvailable.length + 1,
      roomName: chatProps.chatName,
      roomAdmin: cookie.name,
      password: chatProps.password,
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
      return <h1>first you need to log in</h1>;
    } else if (cookie) {
      return connectToRoom === false && roomToConnect === null ? (
        <div className={"Chats-Layout"}>
          <div>Welcome {cookie.name} you can now start your own chat</div>

          <button onClick={() => setCreateRoom(true)}>
            Create new room
          </button>

          <ChatRoomsContainer
            connectToRoom={connectToRoom}
            roomsAvailable={roomsAvailable}
            // getChat={(roomNum) => getChat(roomNum)}
            getChat={(room) => connectHandler(room)}
          />
          {whichRoomToConnect !== null ? (
            <ConnectRoom
              formOpen={askConnectToRoom}
              closeForm={() => setAskConnectToRoom(false)}
              connectToChat={(password) => getChat(password)}
              chatToConnect={whichRoomToConnect.roomName}
              password
            />
          ) : null}

          <ChatCreatorForm
            currentUserCookie={cookie}
            closeForm={() => setCreateRoom(false)}
            formOpen={openRoomCreateForm}
            userAdmin={cookie.name}
            createRoomHandler={(chatProps) => createRoomHandler(chatProps)}
          />
        </div>
      ) : (
        <Chat
          cookie = {cookie}
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
  const getChat = (password) => {
    const room = { room: whichRoomToConnect.roomId, password: password };
    axios
      .post(`/chats/${whichRoomToConnect.roomId}`, room)
      .then(async (res) => {
        if (res.data === true) {
          setRoomToConnect(room);
          connectToRoomHandler(room, cookie.name);
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
    console.log(askConnectToRoom);
  }, [cookie]);

  return logged();
};
export default Chats;
