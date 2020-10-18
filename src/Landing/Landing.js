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


const Landing = ({link ,cookie,withHeader ,askToLogoutApp}) => {
  const [pageIndex, setPageIndex] = useState(link);
  const [userIn, serUserIn] = useState(null);

  

  useEffect(() => {
    console.log(pageIndex);
  }, [pageIndex]);


  const renderSwitch = (param) => {
    switch (param) {
      case "home":
        return <Home cookie={cookie} />;
      case "sign up":
        return <Signup />;
      
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
      askToLogoutLanding={askToLogoutApp}
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
