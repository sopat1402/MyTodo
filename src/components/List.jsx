import {useState,useEffect} from "react";
import Task from "./Task";
import Add from "./Add";

function onTaskClick(task,setActiveTask){
  setActiveTask(task);
}
function List(props){
    const [tasks,setTasks]=useState([]);
    useEffect(()=>{
        fetch(`/api/folder/${props.id}`)
        .then(result=>result.json())
        .then(data=>{
            setTasks(data);
        })
    },[])
    return (
        <div className="md:w-[100%] w-[100vw] sm:h-[100vh] bg-[#6FD1D7] mt-[10vh] sm:ml-40 flex flex-col py-4 h-[80vh]">
            <h2 className="text-left px-5 sm:px-10 text-2xl font-bold my-3">{props.listName}</h2>
            {tasks.map((task)=><Task task={task} onTaskClick={onTaskClick} setActiveTask={props.setActiveTask} key={task.id}/>)}
            <Add/>
        </div>
    )
}

export default List;