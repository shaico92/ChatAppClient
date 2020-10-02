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
const Landing = ({ isUserLogged }) => {
  const [pageIndex, setPageIndex] = useState(null);

  const getSmth = () => {
    axios
      .get("/", () => {
        console.log("sending req to server");
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
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
    <div className={"Landing"}>
      <Header changeIndex={(label) => setPageIndex(label)} />

      {renderSwitch(pageIndex)}
    </div>
  );
};

export default Landing;
