import React from 'react'
import axios from '../../api/axios'
import useCookie from '../../api/cookie'

const Logout = ({clicked})=>{
    const [cookie, setCookie, parseCookie, setCookieInbrowser, deleteCookie] = useCookie();

const signOut=()=>{
    axios.post('/logout')
    .then(res=>{
        console.log(res.data);
        if (res.data==='delete cookie') {deleteCookie()}}).catch(err=>console.log(err));
        clicked()
                }

        
return(
    
    <div style={{cursor : 'pointer'}} onClick={()=>signOut()}>
        
        Logout
        
        </div>
    
)


}

export default Logout