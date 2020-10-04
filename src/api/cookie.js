import { useEffect, useState } from "react";

const useCookie = () => {
  
  
  const [cookie, setCookie] = useState(document.cookie);


    useEffect(() => {
        console.log('this is from cookie.js');
        console.log(cookie);
    }, [cookie]);
  

    //setting the cookie in the browser
    
    const setCookieInbrowser =(user)=>{
    
        document.cookie=`username=${user.email}; path=/`
        document.cookie=`name=${user.name}; path=/`
        document.cookie=`image=${user.image}; path=/`
        setCookie(user)
    }
// deleting cookie from browser
    const deleteCookie = (cookieObj)=>{
        const   cookieOBJ=    parseCookie(cookieObj);
        const result = Object.keys(cookieOBJ).map((key) => [(key), cookieOBJ[key]]);
                result.map(item=>{
                    

                    document.cookie =  `${item[0]}=${item[1]}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                })
                setCookie(null)
                console.log('deleting cookie');
    }


// converting cookie string to object
    const parseCookie = str =>
    str
      .split(';')
      .map(v => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});


  return [cookie, setCookieInbrowser, deleteCookie];
};


export default useCookie;
