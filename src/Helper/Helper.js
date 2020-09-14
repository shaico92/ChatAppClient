import React, { useEffect, useState } from 'react'
import SocketIOClient from 'socket.io-client';
const ENDPOINT ='http://localhost:4000';
const socket  =SocketIOClient(ENDPOINT);
 

    export const   sendChatMessage=(content)=>{
        socket.emit('send-chat-message',content);
    }
  
    
    export const msgShown = ()=>{
    socket.on('chat-message');
    
    }



 


