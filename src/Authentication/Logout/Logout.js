import React from 'react'
import axios from '../../api/axios'
import useCookie from '../../api/cookie'

const Logout = ({ })=>{
    const [cookie, setCookie, parseCookie, setCookieInbrowser, deleteCookie] = useCookie();
const signOut=()=>{
    axios.post('/logout')
    .then(res=>{
        console.log(res.data);
        if (res.data==='delete cookie') {
            // const   cookieOBJ=    parseCookie(cookieToDelete);
            
            deleteCookie()
            
            // var result = Object.keys(cookieOBJ).map((key) => [(key), cookieOBJ[key]]);
            //     result.map(item=>{
                    

            //         document.cookie =  `${item[0]}=${item[1]}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            //     })
            //     deleteCookie(null)

        }
    })
    .catch(err=>console.log(err));

}


return(
    <div onClick={()=>signOut()}>Logout</div>
)


}

export default Logout