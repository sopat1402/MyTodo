import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../Root.jsx";

function signout(setUser,navigate){
    fetch("/logout",{
        method:"POST"
    })
    .then(result=>result.json())
    .then(data=>{
        setUser({authenticated:false});
        navigate("/");
    })
}

function Hamburger(props){
    const navigate=useNavigate();
    const {user,setUser}=useContext(AuthContext);
    return (
        <div className="w-full flex flex-col bg-[#3B7597] fixed bottom-[10%] left-0 flex flex-col space-y-3 py-3 z-50">
            <h2 className="text-center">User Data</h2>
            <hr/>
            <h3>{user.username}</h3>
            <h3>{user.email}</h3>
            <button className="w-full border-none outline-none hover:cursor-pointer hover:opacity-80" onClick={()=>signout(setUser,navigate)}>Sign Out</button>
        </div>
    )
}

export default Hamburger;