import React, { useEffect, useState } from "react";
import NavItems from "../../Constants/Constants";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./Navbar.css";
const NavBar = ({ setCurrentComponent }) => {
  const nav = NavItems.map((item) => {
    return (
      <NavigationItem
        click={() => setCurrentComponent(item.label)}
        ref1={item.ref}
        key={item.icon}
        classS={item.class}
        label={item.label}
      />
    );
  });

  return <nav className={"topnav"}>{nav}</nav>;
};

export default NavBar;
