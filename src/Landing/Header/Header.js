import React,{useEffect} from "react";
//import NavItems from "../../Constants/Constants";
import NavBar from "../../UI/Navbar/Navbar";

import Login from "../../Authentication/Login";
import ChatContainer from "../../ChatContainer/ChatContainer";
const Header = ({ changeIndex, isUserLogged ,cookie }) => {

console.log( ' this is from header.js');
console.log(cookie);

  return (
    <div className={"Header"}>
      <NavBar cookie={cookie} userLogged={isUserLogged} setCurrentComponent={(label) => changeIndex(label)} />
    </div>
  );
};

export default Header;
