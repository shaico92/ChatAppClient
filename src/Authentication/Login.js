import React, { useEffect, useState } from "react";

import './Login.css'

import axios from "../api/axios";
import Landing from '../Landing/Landing'
import Home from "../Landing/Home/Home";
import useCookie from '../api/cookie'
const Login = ({ userIn }) => {
  
  const [userEmail, setuserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [cookie, setCookie, parseCookie, setCookieInbrowser, deleteCookie] = useCookie();
  const [userName, setuserName] = useState(null);
  const [userpass, setUserpass] = useState("");
  const [submit, setSubmit] = useState(false);
  // const [cookieUser, setCookieUser] = useState(document.cookie)
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
            const userDet = {
              email: res.data.email,
              name: res.data.name,
              image: res.data.image,
            };
            console.log(res.data);
            const result = res.data.answer;
            setCookieInbrowser(userDet);
            setUserAuthPassed(result);

            setuserName(res.data.name);
            console.log(userName);
            setUserPhoto(res.data.image);

            //userIn(userDet);
            
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {}, [submit]);

  switch (userAuthPassed) {
    case true:
      return (
        
        <Landing withHeader cookie={cookie} link={'chats'} />
      );

    default:
      return (
        <div className="LoginBox">
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
            <div>
              <button onClick={() => {console.log('take me to sign up');}}>
                Dont have and account ?
              </button>
            </div>

          </div>
        </div>
      );
      break;
  }
};

export default Login;
