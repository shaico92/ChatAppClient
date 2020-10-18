import React,{useEffect,useState} from 'react'
import './Button.css'

const Button =({clicked, children , text})=>{
    const [active,setActive] = useState(null)
     useEffect(()=>{},[active])
    const click=()=>{


        setActive('active')
        clicked()
    }


    return(
        
        <div onClick={()=>click()} className={`Button ${active}`}>
         {children}
         <div className="content">{text}</div>
      </div>
      

    )
}

export default Button