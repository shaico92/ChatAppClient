import React from "react";
import logo from "./logo.svg";
import "./App.css";
//import Login from "./Authentication/Login";
import Landing from "./Landing/Landing";
import Login from './Authentication/Login'

import ChatContainer from "./ChatContainer/ChatContainer";
function App() {
  return (
    <div className="App">
      {/* <Landing /> */}
      <Login  />
    </div>
  );
}

export default App;
