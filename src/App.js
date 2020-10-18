import React, { useState,useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
//import Login from "./Authentication/Login";
import Landing from "./Landing/Landing";
import Login from './Authentication/Login'
import useCookie from './api/cookie'
import ChatContainer from "./ChatContainer/ChatContainer";
function App() {
  const [cookie, setCookie, parseCookie, setCookieInbrowser, deleteCookie] = useCookie();
  const [refresh,setRefresh] = useState(false)
  useEffect(() => {
    
  }, [refresh]);
  return (
    <div className="App">
      {
        cookie&&refresh===false ? 
        <Landing
        askToLogoutApp={setRefresh}
        withHeader cookie={cookie} link={'chats'} />
        :<Login  />

      }
      
    </div>
  );
}

export default App;
