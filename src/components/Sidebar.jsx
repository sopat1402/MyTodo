import { useState,useContext } from "react"
import {Link, useNavigate} from "react-router-dom";
import AddFolder from "./AddFolder.jsx";
import {AuthContext} from "../Root.jsx";

//function add(folder){
//    return <Link key={folder.id} to={`/folder/${folder.id}`}><button className="w-full border-none outline-none mb-2 hover:cursor-pointer hover:opacity-80" >{folder.name}</button></Link>
//}
function add(folder,setFolders){
    return (
        <div
            key={folder.id}
            className="flex justify-between items-center w-full mb-2 px-2"
        >
            <Link
                to={`/folder/${folder.id}`}
                className="flex-1 hover:opacity-80"
            >
                {folder.name}
            </Link>

            <button
                className="px-2 hover:cursor-pointer text-[red]"
                onClick={(e)=>{
                    e.stopPropagation();
                    fetch(`/api/deleteFolder/${folder.id}`,{
                        method:"DELETE",
                        headers:{'Content-Type':'application/json'},
                        credentials:'include'
                    })
                    .then(()=>{setFolders(prev=>{
                        return prev.filter(item => item.id !== folder.id)
                    })});
                }}
            >
                X
            </button>
        </div>
    );
}
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
function Sidebar(props){
    const navigate=useNavigate();
    const [addFolder,setaddFolder]=useState(false);
    const {setUser}=useContext(AuthContext);
    return (
        <div className="fixed left-0 top-[10vh] bg-[#3B7597] sm:w-40 hidden h-[100vh] sm:flex sm:flex-col py-2">
            <h2 className="text-center text-xl mb-3">Folders</h2>
            <hr className="mb-2"/>
            {props.folders.map((folder) => add(folder,props.setFolders))}
            <button className="w-full border-none outline-none mb-2 hover:cursor-pointer hover:opacity-80" onClick={()=>{setaddFolder(true)}}>Add Folder</button>
            <hr className="mt-3 mb-2"/>
            <button className="w-full border-none outline-none mb-2 hover:cursor-pointer hover:opacity-80">Profile</button>
            <button className="w-full border-none outline-none hover:cursor-pointer hover:opacity-80" onClick={()=>signout(setUser,navigate)}>Sign Out</button>
            {addFolder?<AddFolder setaddFolder={setaddFolder} setFolders={props.setFolders} />:null}
        </div>
    )
}

export default Sidebar;