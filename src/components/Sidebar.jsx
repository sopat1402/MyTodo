import React from "react"
import {Link,useNavigate} from "react-router-dom";

function addFolder(folder){
    return <Link key={folder.id} to={`/folder/${folder.id}`}><button className="w-full border-none outline-none mb-2 hover:cursor-pointer hover:opacity-80" >{folder.name}</button></Link>
}
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
function Sidebar(props){
    const navigate=useNavigate();
    return (
        <div className="fixed left-0 top-[10vh] bg-[#3B7597] sm:w-40 hidden h-[100vh] sm:flex sm:flex-col py-2">
            <h2 className="text-center text-xl mb-3">Folders</h2>
            <hr className="mb-2"/>
            {props.folders.map((folder) => addFolder(folder))}
            <hr className="mt-3 mb-2"/>
            <button className="w-full border-none outline-none mb-2 hover:cursor-pointer hover:opacity-80">Profile</button>
            <button className="w-full border-none outline-none hover:cursor-pointer hover:opacity-80" onClick={()=>signout(props.setisAuth,navigate)}>Sign Out</button>
        </div>
    )
}

export default Sidebar;