import React from "react";

function addFolder(name){
    return <button>{name}</button>
}
function Folderlist(props){
    return (
        <div className="w-full h-[50%] flex flex-col bg-[#3B7597]">
            <h2>Folders</h2>
            <hr/>
            {props.folders.map(addFolder)}
        </div>
    )
}

export default Folderlist;