import React, { useEffect, useState } from "react";

const Signup = ({}) => {
  return (
    <div style={{ marginTop: "30%" }}>
      <div>
        <input
          type="text"
          onChange={(event) => console.log(event.target.value)}
          placeholder={"Please Enter your name"}
        ></input>
        <div>
          <button onClick={() => alert("signup")}>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
