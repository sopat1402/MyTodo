import {useState} from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup"
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";

function Auth(props){
    const [hasAccount,sethasAccount]=useState(true);
    return <>
        {hasAccount?<Login sethasAccount={sethasAccount}/>:<Signup sethasAccount={sethasAccount}/>}
    </>
}

export default Auth;