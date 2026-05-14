import React from "react";

function addFolder(folder){
    return <button className="w-full border-none outline-none mb-2 hover:cursor-pointer hover:opacity-80" key={folder.key}>{folder.name}</button>
}
function Sidebar(props){
    return (
        <div className="fixed left-0 top-[10vh] bg-[#3B7597] sm:w-40 hidden h-[100vh] sm:flex sm:flex-col py-2">
            <h2 className="text-center text-xl mb-3">Folders</h2>
            <hr className="mb-2"/>
            {props.folders.map((folder) => addFolder(folder))}
            <hr className="mt-3 mb-2"/>
            <button className="w-full border-none outline-none mb-2 hover:cursor-pointer hover:opacity-80">Profile</button>
            <button className="w-full border-none outline-none hover:cursor-pointer hover:opacity-80">Sign Out</button>
        </div>
    )
}

export default Sidebar;