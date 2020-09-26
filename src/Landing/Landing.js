import React, { useEffect, useState } from "react";
//import NavItems from "../../Constants/Constants";
import Header from "./Header/Header";
import { Switch, Route } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Home from "../Landing/Home/Home";
import axios from "../api/axios";
import SideBar from "../SideBar/Sidebar";
const Landing = ({ isUserLogged }) => {
  const [pageIndex, setPageIndex] = useState(null);

  const getSmth = () => {
    axios.get("/", () => {
      console.log("sending req to server");
    });
  };

  useEffect(() => {
    console.log(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    getSmth();
  });
  const renderSwitch = (param) => {
    switch (param) {
      case "home":
        return <Home />;
      case "sign up":
        return <Signup />;
      case "login":
        return <Login />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={"landing"}>
      <Header changeIndex={(label) => setPageIndex(label)} />

      {renderSwitch(pageIndex)}
    </div>
  );
};

export default Landing;
