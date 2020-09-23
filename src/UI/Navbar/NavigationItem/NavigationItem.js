import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItem.css";
const NavigationItem = ({ ref1, key, classS, label, click }) => {
  //const [isActive, setActive] = useState("");,click

  return (
    <NavLink
      exact
      className={` link ${classS}`}
      onClick={() => click()}
      to={ref1}
      key={key}
    >
      {label}
    </NavLink>
  );
};

export default NavigationItem;
