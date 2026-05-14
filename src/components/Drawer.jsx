import React from "react";

function addFolder(folder){
    return <button>{folder.name}</button>
}
function Folderlist(props){
    return (
        <div className="w-full flex flex-col bg-[#3B7597] fixed bottom-[10%] left-0">
            <h2 className="text-center">Folders</h2>
            <hr/>
            {props.folders.map((folder) => addFolder(folder))}
        </div>
    )
}

export default Folderlist;