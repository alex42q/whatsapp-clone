import React, { useEffect, useState }from "react"
import Cookies from "js-cookie"

export const isProtectedRoute = (props)=>{
    if(typeof window=='undefined'){
        return false
    }

    const token = Cookies.get("access_token")
    if(token){
        return true;
    }else{
        return false;
    }
}