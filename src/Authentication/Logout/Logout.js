import React from 'react'
import axios from '../../api/axios'


const Logout = ({clicked,cookieToDelete ,deleteCookie })=>{

const signOut=()=>{
    axios.post('/logout')
    .then(res=>{
        console.log(res.data);
        if (res.data==='delete cookie') {
            // const   cookieOBJ=    parseCookie(cookieToDelete);
            console.log(cookieToDelete);
            deleteCookie(cookieToDelete)
            
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
    <button onClick={()=>signOut()}>are you sure ?</button>
)


}

export default Logout