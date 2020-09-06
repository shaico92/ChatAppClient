import React,{useState} from 'react'

import './input.css';
import Events from '../../events/events'
//import './chatContainer.css'
const _input =props=>{
const [msgSent, setMsgSent]= useState(false);
const [inputVal,setInputVal] = useState('');



const sendMsg = event=>{
    const content = inputVal;
    event.preventDefault();
    console.log(content);
    setMsgSent(true)
    setInputVal("");
} 

return(

    <div >
        <Events sentFunc={setMsgSent} sent={msgSent}/>
        <form>

            <input className="input" value={inputVal} onChange={e => setInputVal(e.target.value)}  placeholder="start typing..." type="text"/>
            <button  type="submit" onClick={(inputVal)=>sendMsg(inputVal)}>Send</button>


        </form>
    </div>
)


}

export default _input;