import React, { useState } from "react";
import AddTask from "./AddTask";


function Add(props){
    const [adding,setAdding]=useState(false);
    return (
        <>
            {adding?<AddTask setAdding={setAdding} setTasks={props.setTasks} folderId={props.folderId}/>:null}
            <button className="rounded-lg bg-[#3B7597] w-[10vh] h-[10vh] fixed bottom-[12%] right-[7.5vw] z-0 hover:cursor-pointer" onClick={()=>setAdding(true)}>Add</button>
        </>
    )
}

export default Add;