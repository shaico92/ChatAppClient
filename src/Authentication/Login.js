import React, { useEffect, useState } from "react";

import ChatContainer from "../ChatContainer/ChatContainer";
import socket from "../api/api";
import axios from "../api/axios";
import Home from "../Landing/Home/Home";
const Login = ({userIn}) => {
  const [userEmail, setuserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  
  const [userName, setuserName] = useState(null);
  const [userpass, setUserpass] = useState("");
  const [submit, setSubmit] = useState(false);
  const [cookieUser, setCookieUser] = useState(document.cookie)
  const [userAuthPassed, setUserAuthPassed] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  
  const setCookie =(email,name,image)=>{
    
      document.cookie=`username=${email}; path=/`
      document.cookie=`name=${name}; path=/`
      document.cookie=`image=${image}; path=/`
    
  }

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
          if (res.data.answer !== true)   {
            setErrorMsg(res.data);
          } else {

            const cookie = {
              name : res.data.name,
              image :res.data.image,
              email : res.data.email,
            }

            console.log(res.data);
            const result = res.data.answer;
             setUserAuthPassed(result);
             userIn(true)
             setuserName(res.data.name);
             console.log(userName);
             setUserPhoto(res.data.image);
              setCookie(cookie.email,cookie.name,cookie.image)
              setCookieUser(cookie)
             
            
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

  switch (userAuthPassed) {
    case true:
      return (
        <Home
          
          cookie = {cookieUser}
          loggedUserEmail={userEmail}
          loggedUserPhoto={userPhoto}
          loggedUserName={userName}
          isloggedUser={userAuthPassed}
        />
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
