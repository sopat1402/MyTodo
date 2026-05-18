import React from "react";

function Add(props){
    return <button className="rounded-lg bg-[#3B7597] w-[10vh] h-[10vh] fixed bottom-[12%] right-[7.5vw] z-0 hover:cursor-pointer" onClick={props.addTask}>Add</button>
}

export default Add;