import React from "react";
import Task from "./Task";

function List(props){
    return (
        <div className="md:w-[100%] w-[100vw] sm:h-[100vh] bg-[#6FD1D7] mt-[10vh] sm:ml-40 flex flex-col py-4 h-[80vh]">
            <h2 className="text-left px-5 sm:px-10 text-2xl font-bold my-3">{props.listName}</h2>
            {props.tasks.map((task)=><Task task={task} onTaskClick={props.onTaskClick} setActiveTask={props.setActiveTask}/>)}
        </div>
    )
}

export default List;