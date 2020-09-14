import React,{useState,useEffect} from 'react';
import './Input.css';
import {sendChatMessage} from '../../Helper/Helper'
const Input_=() =>{
    
const [inputVal,setInputVal]= useState('');

const sendMessage=()=>{
    sendChatMessage(inputVal);
    setInputVal('')
}


useEffect(() => {
    
}, [inputVal]);
return (
    <div className="Input" >


<input className="Input_line" value={inputVal}  onChange={(event)=>setInputVal(event.target.value)}  type="text" placeholder="Please enter message"></input>
<div onClick={()=>sendMessage()} className="Send">Send</div>
    </div>
    
)

}

export default Input_;
