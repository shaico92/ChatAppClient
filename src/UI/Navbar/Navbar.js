import React, { useState } from "react";
import {Nav} from "../../Constants/Constants";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./Navbar.css";
const NavBar = ({ setCurrentComponent, userLogged }) => {
  const setNavMenu = (param) => {
    const nav = Nav.filter(item=>!item.hidden).map((item) => (
      <NavigationItem
        click={() => setCurrentComponent(item.label)}
        ref1={item.ref}
        key={item.icon}
        classS={item.class}
        label={item.label}
      />
    )).splice(0, param);

    return nav;
  };

  return userLogged ? (
    <nav className={"topnav"}>{setNavMenu(4)}</nav>
  ) : (
    <nav className={"topnav"}>{setNavMenu(3)}</nav>
  );
};

export default NavBar;
