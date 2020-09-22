import React, { useEffect, useState } from "react";
//import NavItems from "../../Constants/Constants";
import Header from "./Header/Header";
import { Switch, Route } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Home from "../Landing/Home/Home";
const Landing = () => {
  const [pageIndex, setPageIndex] = useState("home");

  useEffect(() => {
    console.log(pageIndex);
  }, [pageIndex]);
  switch (pageIndex) {
    case "home":
      return (
        <div className={"landing"}>
          <Header changeIndex={(label) => setPageIndex(label)} />
          <Home />
        </div>
      );
    case "sign up":
      return (
        <div className={"landing"}>
          <Header changeIndex={(label) => setPageIndex(label)} />
          <Signup />
        </div>
      );
    case "login":
      return (
        <div className={"landing"}>
          <Header changeIndex={(label) => setPageIndex(label)} />
          <Login />
        </div>
      );
    default:
      return <h1>nothing here</h1>;
  }
};

export default Landing;
