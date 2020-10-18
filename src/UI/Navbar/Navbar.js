import React, { useState,useEffect } from "react";
import {Nav} from "../../Constants/Constants";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./Navbar.css";
const NavBar = ({ setCurrentComponent, askToLogoutHeader, cookie  }) => {

useEffect(() => {
  console.log('rendering navbar');
  console.log(cookie);

}, [cookie]);

  const setNavMenuLogged=()=>{
    const nav = Nav.map((item) => (
      <NavigationItem
        
        click={() => setCurrentComponent(item.label.toLowerCase())}
        ref1={item.ref}
        key={item.icon}
        classS={item.class}
        label={item.label}
        svg={item.user}
        askToLogoutNavbar={askToLogoutHeader}
        
      />
    ))

    return nav;
  }

  

  
  return  (
    
       
        
         
        <nav className={"topnav"}>{setNavMenuLogged()}</nav>
        
      


    
  
  )
};

export default NavBar;
