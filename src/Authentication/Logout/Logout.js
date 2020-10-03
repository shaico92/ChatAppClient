import React from 'react'
import axios from '../../api/axios'


const Logout = ({clicked,cookieToDelete})=>{

    const parseCookie = str =>
    str
      .split(';')
      .map(v => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});
const signOut=()=>{
    axios.post('/logout')
    .then(res=>{
        console.log(res.data);
        if (res.data==='delete cookie') {
            const   cookieOBJ=    parseCookie(cookieToDelete);
            var result = Object.keys(cookieOBJ).map((key) => [(key), cookieOBJ[key]]);
                result.map(item=>{
                    

                    document.cookie =  `${item[0]}=${item[1]}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                })
            

        }
    })
    .catch(err=>console.log(err));

}


return(
    <button onClick={()=>signOut()}>are you sure ?</button>
)


}

export default Logout