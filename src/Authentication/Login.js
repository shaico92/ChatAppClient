import React, { useEffect, useState } from "react";

import ChatContainer from "../ChatContainer/ChatContainer";
import socket from "../api/api";
import axios from "../api/axios";
const Login = ({}) => {
  const [username, setUsername] = useState("");
  const [userpass, setUserpass] = useState("");
  const [submit, setSubmit] = useState(false);

  const authenticate = (name, password) => {
    if (password !== null && name !== null && password !== "" && name !== "") {
      const userCred = { name: name, password: password };

      axios
        .post("/login", userCred)
        .then((res) => {
          setSubmit(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    setUserpass("");
    setUsername("");
  }, [submit]);
  //method to send event on chat socket
  const loginUser = (name) => {
    socket.emit("new-user", name);

    socket.removeListener("new-user");
    setSubmit(true);
  };

  switch (submit) {
    // case true:
    //   return <ChatContainer currentUser={username} />;

    case false:
      return (
        <div style={{ marginTop: "30%" }}>
          <div>
            <div>
              <input
                value={username}
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                placeholder={"Please Enter your name"}
              ></input>
            </div>
            <div>
              <input
                value={userpass}
                type="password"
                onChange={(event) => setUserpass(event.target.value)}
                placeholder={"Please Enter Password"}
              ></input>
            </div>
            <div>
              <button onClick={() => authenticate(username, userpass)}>
                Login
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return <h1>logged user is null</h1>;
  }
};

export default Login;
