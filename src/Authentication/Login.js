import React, { useEffect, useState } from "react";

import ChatContainer from "../ChatContainer/ChatContainer";
import socket from "../api/api";

const Login = ({}) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [submit, setSubmit] = useState(false);
  const loginUser = (name) => {
    socket.emit("new-user", name);

    socket.removeListener("new-user");
    setSubmit(true);
  };
  const smth = (event) => {
    setLoggedUser(event.target.value);
  };

  switch (submit) {
    case true:
      return <ChatContainer currentUser={loggedUser} />;

    case false:
      return (
        <div style={{ marginTop: "30%" }}>
          <div>
            <input
              type="text"
              onChange={(event) => smth(event)}
              placeholder={"Please Enter your name"}
            ></input>
            <div>
              <button onClick={() => loginUser(loggedUser)}>Login</button>
            </div>
          </div>
        </div>
      );
    default:
      return <h1>logged user is null</h1>;
  }
};

export default Login;
