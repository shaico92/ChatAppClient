import React, { useEffect, useState } from "react";
import socket from "../../api/api";
import ChatCreatorForm from "../../Chat/ChatCreatorForm/ChatCreatorForm";
import ChatContainer from "../../ChatContainer/ChatContainer";
const Home = ({ isloggedUser, loggedUserName }) => {
  const [openRoomCreateForm, setCreateRoom] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const createRoomHandler = (name) => {
    console.log(name);
    socket.emit("new-user", name);

    socket.removeListener("new-user");
    setRoomCreated(true);
  };

  const showChat = (param) => {
    switch (param) {
      case true:
        return (
          <div>
            <h1>room created</h1>
            <ChatContainer currentUser={loggedUserName} />
          </div>
        );

      default:
        return (
          <div>
            <h1>Welcome {loggedUserName} you can now start your own chat</h1>
            <button onClick={() => setCreateRoom(true)}>
              Create Your own Chat Room
            </button>
            <ChatCreatorForm
              userAdmin={loggedUserName}
              clicked={openRoomCreateForm}
              createRoomHandler={() => createRoomHandler(loggedUserName)}
            />
          </div>
        );

        break;
    }
  };
  useEffect(() => {}, [openRoomCreateForm]);

  switch (isloggedUser) {
    case true:
      return <div>{showChat(roomCreated)}</div>;
    default:
      return (
        <div>
          <h1>First login to get Started</h1>
        </div>
      );
  }
};

export default Home;
