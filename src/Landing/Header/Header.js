import React from "react";
//import NavItems from "../../Constants/Constants";
import NavBar from "../../UI/Navbar/Navbar";

import Login from "../../Authentication/Login";
import ChatContainer from "../../ChatContainer/ChatContainer";
const Header = ({ changeIndex }) => {
  return (
    <div className={"Header"}>
      <NavBar setCurrentComponent={(label) => changeIndex(label)} />
    </div>
  );
};

export default Header;
