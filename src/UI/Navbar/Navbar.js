import React, { useState,useEffect } from "react";
import {Nav} from "../../Constants/Constants";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./Navbar.css";
const NavBar = ({ setCurrentComponent, userLogged }) => {

useEffect(() => {
  console.log('rendering navbar');
  console.log(userLogged);

}, [userLogged]);

  const setNavMenuLogged=()=>{
    const nav = Nav.map((item) => (
      <NavigationItem
        click={() => setCurrentComponent(item.label)}
        ref1={item.ref}
        key={item.icon}
        classS={item.class}
        label={item.label}
      />
    ))

    return nav;
  }

  const setNavMenuFilter = () => {
    const nav = Nav.filter(item=>!item.hidden).map((item) => (
      <NavigationItem
        click={() => setCurrentComponent(item.label)}
        ref1={item.ref}
        key={item.icon}
        classS={item.class}
        label={item.label}
      />
    ))

    return nav;
  };

  return userLogged ? (
    <nav className={"topnav"}>{setNavMenuLogged()}</nav>
  ) : (
    <nav className={"topnav"}>{setNavMenuFilter()}</nav>
  );
};

export default NavBar;
