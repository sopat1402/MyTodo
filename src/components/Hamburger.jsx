import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function signout(setisAuth,navigate){
    fetch("/logout",{
        method:"POST"
    })
    .then(result=>result.json())
    .then(data=>{
        setisAuth(false);
        navigate("/");
    })
}

function Hamburger(props){
    const navigate=useNavigate();
    const user=useContext(user);
    const setisAuth=useContext(setisAuth);
    return (
        <div className="w-full flex flex-col bg-[#3B7597] fixed bottom-[10%] left-0 flex flex-col space-y-3 py-3 z-50">
            <h2 className="text-center">Options</h2>
            <hr/>
            <h3>{user.username}</h3>
        </div>
    )
}

export default Hamburger;