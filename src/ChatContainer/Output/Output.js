import React,{useState,useEffect} from 'react';
import  './Output.css'
import {msgShown} from '../../Helper/Helper'
import TextMessages from './TextMessages/TextMessages'

const Output_=() =>{
    
const [output,setOutput]= useState([1,2,4]);

const addToArrayHandler=(c)=>{
        setOutput(output.push(c))
}

useEffect(()=>{
    console.log(output)
},[output])
return (
    <div className="Output" >
        <TextMessages addToArrayHandler={()=>addToArrayHandler(1)}/>
        {
            output.map(od=>(
                <p>
                    {od}
                </p>
))
        }
    </div>
)

}

export default Output_;
