import React, { useEffect, useState } from "react";
//import NavItems from "../../Constants/Constants";
import Header from "./Header/Header";
import { Switch, Route } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Home from "../Landing/Home/Home";
import axios from "../api/axios";
import "./Landing.css";
import Modal from "../UI/Modal/Modal";
import SideBar from "../SideBar/Sidebar";
import Logout from "../Authentication/Logout/Logout";
const Landing = ({ setUSerin }) => {
  const [pageIndex, setPageIndex] = useState(null);
  const [userIn,serUserIn] = useState(false)
  
  

  useEffect(() => {
    console.log(pageIndex);
  
  }, [pageIndex]);

  useEffect(()=>{
    if (document.cookie!=='') {
      
      serUserIn(true)
    }else{
      
      
    }
  },[])
  
  
  const renderSwitch = (param) => {
    switch (param) {
      case "home":
        return <Home />;
      case "sign up":
        return <Signup />;
      case "login":
        
        return <Login userIn={()=>serUserIn(1)}/>;
        case "logout":
          return <Logout cookieToDelete={document.cookie}/>
      default:
        return <Home />;
    }
  };

  return (
    <div className={"Landing"}>
      <Header  isUserLogged={userIn}  changeIndex={(label) => setPageIndex(label)} />

      {renderSwitch(pageIndex)}
    </div>
  );
};

export default Landing;
