import React, { useEffect, useState } from "react";
//import NavItems from "../../Constants/Constants";
import Header from "./Header/Header";
import { Switch, Route } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Home from "../Landing/Home/Home";
import Chats from "./Chats/Chats";

import axios from "../api/axios";
import "./Landing.css";
import useCookie from "../api/cookie";
import Modal from "../UI/Modal/Modal";
import SideBar from "../SideBar/Sidebar";
import Logout from "../Authentication/Logout/Logout";
const Landing = ({}) => {
  const [pageIndex, setPageIndex] = useState(null);
  const [userIn, serUserIn] = useState(null);

  const [
    cookie,
    setCookie,
    parseCookie,
    setCookieInbrowser,
    deleteCookie,
  ] = useCookie();

  useEffect(() => {
    console.log(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    if (cookie !== "" && !null) {
      setCookie(parseCookie(cookie));
      serUserIn(true);
    } else {
    }
    console.log(cookie);
  }, []);

  const renderSwitch = (param) => {
    switch (param) {
      case "home":
        return <Home cookie={cookie} />;
      case "sign up":
        return <Signup />;
      case "login":
        return (
          <Login
            userIn={(obj) => {
              console.log("this is from userin() in login component");
              console.log(obj);
              setCookie(obj);
              setCookieInbrowser(obj);
            }}
          />
        );
      case "logout":
        return (
          <Logout
            cookieToDelete={cookie}
            deleteCookie={(value) => {
              console.log("setting cookie to null");
              console.log(value);

              deleteCookie(value);
            }}
          />
        );
      case "chats":
        return <Chats cookie={cookie} />;
      default:
        return <Home cookie={cookie} />;
    }
  };

  return (
    <div className={"Landing"}>
      <Header
        cookie={cookie}
        isUserLogged={userIn}
        changeIndex={(label) => setPageIndex(label)}
      />

      {renderSwitch(pageIndex)}
    </div>
  );
};

export default Landing;
