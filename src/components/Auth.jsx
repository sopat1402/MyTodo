import {useState} from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup"
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";

function Auth(props){
    const [hasAccount,sethasAccount]=useState(true);
    return <>
        {hasAccount?<Login sethasAccount={sethasAccount} setisAuth={props.setisAuth}/>:<Signup sethasAccount={sethasAccount} setisAuth={props.setisAuth}/>}
    </>
}

export default Auth;