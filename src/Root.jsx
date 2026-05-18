import App from './components/App.jsx'
import Auth from "./components/Auth.jsx"
import {useState,useEffect} from "react";

function Root(){
    const [isAuth,setisAuth]=useState(false);
    useEffect(()=>{
        fetch("/api/me")
        .then(result=>result.json())
        .then(data=>{
            setisAuth(data.authenticated);
        })
    },[]);
    return <>
        {isAuth?<App setisAuth={setisAuth}/>:<Auth setisAuth={setisAuth}/>}
    </>
}

export default Root;