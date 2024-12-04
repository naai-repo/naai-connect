"use client"
import React, { useEffect, useState } from 'react'

function useCookie() {
  const [getCookie,setGetCookie] = useState(() => (name : string) : any =>  { });
  const [deleteCookie,setDeleteCookie] = useState(() => (name : string) : void =>  {});
  const [deleteAllCookie,setDeleteAllCookie] = useState(() => () : void =>  { });
  const [setCookie,setSetCookie] = useState(() => (name : string,value : string,days : number) => {});
  const [isMounted,setMounted] = useState(false);
  
  useEffect(() => {
      const cookieDomain = window.location.hostname ||"naai.in";
      setSetCookie(() => (name : string,value : string,days : number) => {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
        }

        if(process.env.NODE_ENV != "development"){
          document.cookie = name + "=" + (value || "") + expires + `; path=/;domain=${cookieDomain}`;
        }else{
          document.cookie = name + "=" + (value || "") + expires + "; path=/;";
        }
      })

      setGetCookie(() => (name : string) : any => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      });

      setDeleteCookie(() => (name : string) : void => {
         document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      });

      setDeleteAllCookie(() => () : void => {
          document.cookie.split(';').forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            document.cookie = name + '=; path=/; domain=.naai.in; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            document.cookie = name + `=; path=/; domain=.${cookieDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        });
      });

      setMounted(true);

  },[]);

  return {
    getCookie,
    setCookie,
    deleteCookie,
    deleteAllCookie,
    isMounted
  };
}

export default useCookie