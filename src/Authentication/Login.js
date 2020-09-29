import React, { useEffect, useState } from "react";

import ChatContainer from "../ChatContainer/ChatContainer";
import socket from "../api/api";
import axios from "../api/axios";
import Home from "../Landing/Home/Home";
const Login = ({}) => {
  const [userEmail, setuserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState('')
  const [userName, setuserName] = useState(null);
  const [userpass, setUserpass] = useState("");
  const [submit, setSubmit] = useState(false);
  const [userAuthPassed, setUserAuthPassed] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const authenticate = (email, password) => {
    if (
      password !== null &&
      email !== null &&
      password !== "" &&
      email !== ""
    ) {
      const userCred = { email: email, password: password };
      setSubmit(true);
      axios
        .post("/login", userCred)
        .then(async (res) => {
          console.log(res.data);
          if (res.data.answer !== true) {
            setErrorMsg(res.data);
          } else {
            console.log(res.data);
            const result = res.data.answer;
            await setUserAuthPassed(result);
            await setuserName(res.data.name);
            await setUserPhoto(res.data.image);
          }
        })
        .catch((err) => {
          console.log(err);
        });
        
    }
  };
  useEffect(() => {
    // setUserpass("");
    // setuserEmail("");
  }, [submit]);
  //method to send event on chat socket

  // case true:
  //   return <ChatContainer currentUser={username} />;
  switch (userAuthPassed) {
    case true:
      return (
        <Home loggedUserPhoto={userPhoto} loggedUserName={userName} isloggedUser={userAuthPassed} />
        // <div>
        //   <h1>Welcome {userEmail} you can now start your own chat</h1>
        //   <button>Create Your own Chat Room</button>
        // </div>
      );

    default:
      return (
        <div style={{ marginTop: "30%" }}>
          <div>
            <div style={{ color: "red" }}>{errorMsg}</div>
            <div>
              <input
                value={userEmail}
                type="text"
                onChange={(event) => setuserEmail(event.target.value)}
                placeholder={"Please Enter your email"}
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
              <button onClick={() => authenticate(userEmail, userpass)}>
                Login
              </button>
            </div>
          </div>
        </div>
      );
      break;
  }
};

export default Login;
