import React, { useState } from "react";
//import NavItems from "../../Constants/Constants";
import NavBar from "../../UI/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "../../Authentication/Login";
import ChatContainer from "../../ChatContainer/ChatContainer";
const Header = ({ changeIndex }) => {
  console.log(changeIndex);
  return (
    <div className={"Header"}>
      <NavBar setCurrentComponent={(label) => changeIndex(label)} />
    </div>
  );
};

export default Header;
