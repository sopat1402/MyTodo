import App from './components/App.jsx'
import Auth from "./components/Auth.jsx"
import {useState,useEffect,createContext} from "react";

export const AuthContext=createContext();
function Root(){
    const [user,setUser]=useState({authenticated:false});
    useEffect(()=>{
        fetch("/api/me")
        .then(result=>result.json())
        .then(data=>{
            setUser(data);
        })
    },[]);
    return <>
        <AuthContext.Provider value={{user,setUser}}>
            {user.authenticated?<App/>:<Auth/>}
        </AuthContext.Provider>
    </>
}

export default Root;