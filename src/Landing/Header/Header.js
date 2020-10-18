import React,{useEffect} from "react";
//import NavItems from "../../Constants/Constants";
import NavBar from "../../UI/Navbar/Navbar";

import Login from "../../Authentication/Login";
import ChatContainer from "../../ChatContainer/ChatContainer";
import './Header.css'
const Header = ({ changeIndex, isUserLogged ,cookie,askToLogoutLanding }) => {

console.log( ' this is from header.js');
console.log(cookie);

  return (
    <div className={"Header"}>
      <NavBar askToLogoutHeader={askToLogoutLanding} cookie={cookie} userLogged={isUserLogged} setCurrentComponent={(label) => changeIndex(label)} />
    </div>
  );
};

export default Header;
