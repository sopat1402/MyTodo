import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import Task from "./Task";
import Add from "./Add";

function onTaskClick(task,setActiveTask){
  setActiveTask(task);
}
function List(props){
    const [tasks,setTasks]=useState([]);
    const params=useParams();
    let folderId;
    if (!params.id) {
        folderId=props.folders[0]?.id
    }
    else {
        folderId=params.id;
        folderId.length>1?folderId=folderId.substring(1):folderId=folderId;
    }
    useEffect(()=>{
        if (!folderId) return;
        fetch(`/api/folder/${folderId}`)
        .then(result=>result.json())
        .then(data=>{
            setTasks(data);
        })
    },[folderId])
    const folder=props.folders.find(folder=>folder.id==folderId);
    if (!folder) return <div>Loading...</div>
    const listName=folder.name;
    return (
        <div className="md:w-[100%] w-[100vw] sm:h-[100vh] bg-[#6FD1D7] mt-[10vh] sm:ml-40 flex flex-col py-4 h-[80vh]">
            <h2 className="text-left px-5 sm:px-10 text-2xl font-bold my-3">{listName}</h2>
            {
                tasks.length===0?
                <div className="px-5">Add some tasks!!</div>:
                tasks.map(
                    (task)=><Task 
                        task={task} 
                        onTaskClick={onTaskClick} 
                        setActiveTask={props.setActiveTask} 
                        key={task.id}
                    />
                )
            }
            <Add setTasks={setTasks} folderId={folderId}/>
        </div>
    )
}

export default List;