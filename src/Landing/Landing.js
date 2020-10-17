import React, { useEffect, useState } from "react";
//import NavItems from "../../Constants/Constants";
import Header from "./Header/Header";

import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Home from "../Landing/Home/Home";
import Chats from "./Chats/Chats";

import axios from "../api/axios";
import "./Landing.css";
import useCookie from "../api/cookie";

import Logout from "../Authentication/Logout/Logout";
const Landing = ({link ,cookie,withHeader}) => {
  const [pageIndex, setPageIndex] = useState(link);
  const [userIn, serUserIn] = useState(null);

  

  useEffect(() => {
    console.log(pageIndex);
  }, [pageIndex]);

  // useEffect(() => {
  //   if (cookie !== "" && !null) {
  //     setCookie(parseCookie(cookie));
  //     serUserIn(true);
  //   } else {
  //   }
  //   console.log(cookie);
  // }, []);

  const renderSwitch = (param) => {
    switch (param) {
      case "home":
        return <Home cookie={cookie} />;
      case "sign up":
        return <Signup />;
      // case "login":
      //   return (
      //     <Login
      //       userIn={(obj) => {
      //         console.log("this is from userin() in login component");
      //         console.log(obj);
      //         setCookie(obj);
      //         setCookieInbrowser(obj);
      //       }}
      //     />
      //   );
      // case "logout":
      //   return (
      //     <Logout
      //       cookieToDelete={cookie}
      //       deleteCookie={(value) => {
      //         console.log("setting cookie to null");
      //         console.log(value);

      //         deleteCookie(value);
      //       }}
      //     />
      //   );
      case "chats":
        return <Chats cookie={cookie} />;
      default:
        return <div>something went wrong</div>;
    }
  };

  return (
    withHeader ?
    <div className={"Landing"}>
    <Header
      cookie={cookie}
      isUserLogged={userIn}
      changeIndex={(label) => setPageIndex(label)}
    />

    {renderSwitch(pageIndex)}
  </div> :
  <>{renderSwitch(pageIndex)}</>

  

  // <div className={"Landing"}>
  //   <Header
  //     cookie={cookie}
  //     isUserLogged={userIn}
  //     changeIndex={(label) => setPageIndex(label)}
  //   />

  //   {renderSwitch(pageIndex)}
  // </div>
  );
};

export default Landing;
