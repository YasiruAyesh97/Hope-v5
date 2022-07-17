import React from 'react'

//router
import { Switch,Route } from 'react-router'

import Default from '../layouts/dashboard/default'
import SignIn from "../views/public/login";
import {Redirect} from "react-router-dom";
import jwtDecode from "jwt-decode";


const IndexRouters = () => {
    const jwt =sessionStorage.getItem('userToken');
    return (
        <>
            <Switch>
                <Route exact
                       path="/login"
                       render={props=>{
                           if(jwt && jwtDecode(jwt)) return <Redirect from="/login" to="/dashboard" />;
                           return  <SignIn {...props}/>
                       }}

                />
               <Route  path="/dashboard"
                       render={props=>{
                           if(jwt && jwtDecode(jwt)) return <Default {...props} />;
                           return  <Redirect from="/dashboard" to="/login" />
                       }}


               />
                <Redirect from="/" to="/login" />

            </Switch>
        </>
    )
}

export default IndexRouters
