import React,{useEffect} from "react";
//import NavItems from "../../Constants/Constants";
import NavBar from "../../UI/Navbar/Navbar";

import Login from "../../Authentication/Login";
import ChatContainer from "../../ChatContainer/ChatContainer";
const Header = ({ changeIndex, isUserLogged }) => {



  return (
    <div className={"Header"}>
      <NavBar userLogged={isUserLogged} setCurrentComponent={(label) => changeIndex(label)} />
    </div>
  );
};

export default Header;
