import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItem.css";
import UserMenu from '../UserMenu/UserMenu'
const NavigationItem = ({ ref1, key, classS, label, click, svg,askToLogoutNavbar }) => {
  
  const [userSettings,setUserSettings]= useState(false)
  return  (

    !svg ? 
    <NavLink
      exact
      className={` link Fade-In ${classS}`}
      onClick={() => click()}
      to={ref1}
      key={key}
    >
      {label}
    </NavLink>:
    userSettings===false ? 
    <div>
    <img onClick={()=>setUserSettings(true)}  src={svg} className={'link Fade-In Image'}  alt="user icon"></img>
    <UserMenu /> 
    </div>
    :
    <div>
      <img onClick={()=>setUserSettings(false)}  src={svg} className={'link Fade-In Image'}  alt="user icon"></img>
      <UserMenu open askToLogoutUserMenu={askToLogoutNavbar}/> 
    </div>

  
  ) 
};

export default NavigationItem;
