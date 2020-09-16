import React, { useState, useEffect } from "react";
import "./Output.css";
import { msgShown } from "../../Helper/Helper";
import TextMessages from "./TextMessages/TextMessages";

const Output_ = () => {
  const [output, setOutput] = useState([1, 2, 4]);

  const addToArrayHandler = (event) => {
    setOutput([...output, event.target.value]);
  };

  useEffect(() => {}, [output]);
  return (
    <div className="Output">
      <TextMessages addToArrayHandler={addToArrayHandler} />
      {output.map((od) => (
        <p>{od}</p>
      ))}
    </div>
  );
};

export default Output_;
