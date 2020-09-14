import React from 'react';

import Input_ from './Input/Input'
import Output_ from './Output/Output'
const ChatContainer=() =>{
    
return (
    <div style={{marginLeft: '32%',width: '40%',display : 'flex', flexDirection : 'column'}}>
        <Output_/>
        <Input_/>
    </div>
)

}

export default ChatContainer;
