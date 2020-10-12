import React,{useEffect,useState} from 'react'
import './Button.css'
const Button =({clicked})=>{
    const [active,setActive] = useState(null)
     useEffect(()=>{},[active])
    const click=()=>{


        setActive('active')
        clicked()
    }


    return(
        
        <div onClick={()=>click()} className={`Button ${active}`}>
        exit chat room
      </div>
      

    )
}

export default Button