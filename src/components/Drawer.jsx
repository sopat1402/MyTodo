import { Link,useNavigate } from "react-router-dom";
import AddFolder from "./AddFolder";
import {useState} from "react";

function addFolder(navigate,folder,setFolders){
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
                    .then(()=>{navigate("/")})
                    .then(()=>{setFolders(prev=>{
                        return prev.filter(item => item.id !== folder.id)
                    })});
                }}
            >
                X
            </button>
        </div>
    )
}
function Drawer(props){
    const navigate=useNavigate();
    const [isaddingFolder,setisaddingFolder]=useState(false);
    return (
        <div className="w-full flex flex-col bg-[#3B7597] fixed bottom-[10%] left-0 flex flex-col space-y-3 py-3 z-50">
            <h2 className="text-center">Folders</h2>
            <button className="absolute top-3 right-3 text-[red] hover:cursor-pointer" onClick={()=>props.setisdrawerOpen(false)}>X</button>
            <hr/>
            {props.folders.map((folder) => addFolder(navigate,folder,props.setFolders))}
            <hr/>
            <button className="text-center hover:cursor-pointer hover:opacity-80" onClick={()=>setisaddingFolder(true)}>Add folder</button>
            {isaddingFolder?<AddFolder setaddFolder={setisaddingFolder} setFolders={props.setFolders}/>:null}
        </div>
    )
}

export default Drawer;