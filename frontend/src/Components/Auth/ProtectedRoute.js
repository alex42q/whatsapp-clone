import React, { Component, useState } from "react"
import {Route, Redirect} from "react-router-dom"
import { isProtectedRoute } from "./index"

const ProtectedRoute = ({component: Component, ...rest})=>{
    return(
        <Route 
            {...rest}
            render= { props=>
                isProtectedRoute() ?(
                    <Component {...props}/>
                )  : (
                    <Redirect 
                        to={{
                            pathname:'/',
                            state:{ from: props.location}}}/>
                )}/>
    )
}

export default ProtectedRoute;