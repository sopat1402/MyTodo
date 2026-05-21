import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import Task from "./Task";
import Add from "./Add";
import Rightbar from "./Rightbar.jsx";
import EditFolder from "./EditFolder.jsx";

function onTaskClick(task,setActiveTask){
  setActiveTask(task);
}
function List(props){
    const [tasks,setTasks]=useState([]);
    const params=useParams();
    const [activeTask,setactiveTask]=useState(null);
    const [editingFolder,seteditingFolder]=useState(false);
    let folderId;
    if (!params.id) {
        folderId=props.folders[0]?.id
    }
    else {
        folderId=params.id;
        folderId[0]==':'?folderId=folderId.substring(1):folderId=folderId;
    }
    const [listName,setlistName]=useState("");
    useEffect(()=>{
        if (!folderId) return;
        fetch(`/api/folder/${folderId}`)
        .then(result=>result.json())
        .then(data=>{
            setTasks(data);
            setlistName(folder.name);
        })
    },[folderId])
    const folder=props.folders.find(folder=>folder.id==folderId);
    if (!folder) return <div>Loading...</div>
    return (
        <div className="md:w-[100%] w-[100vw] sm:h-[100vh] bg-[#6FD1D7] mt-[10vh] sm:ml-40 flex flex-col py-4 h-[80vh]">
            <div className="flex flex-row space-x-3"><h2 className="text-left px-5 sm:px-10 text-2xl font-bold my-3">{listName}</h2><button className="my-3 hover:cursor-pointer px-3 rounded-md" onClick={()=>seteditingFolder(true)}>Edit folder name</button></div>
            {
                tasks.length===0?
                <div className="px-5">Add some tasks!!</div>:
                tasks.map(
                    (task)=>!task.completed?<Task 
                        task={task} 
                        onTaskClick={onTaskClick} 
                        setActiveTask={setactiveTask} 
                        key={task.id}
                        setTasks={setTasks}
                        folderId={folderId}
                    />:null
                )
            }
            {tasks.length>0?<h3 className="px-5 mt-4">Completed tasks</h3>:null}
            {
                tasks.length===0?
                null:
                tasks.map(
                    (task)=>task.completed?<Task 
                        task={task} 
                        onTaskClick={onTaskClick} 
                        setActiveTask={setactiveTask} 
                        key={task.id}
                        setTasks={setTasks}
                        folderId={folderId}
                    />:null
                )
            }
            <Add setTasks={setTasks} folderId={folderId}/>
            {activeTask!==null?<Rightbar taskId= {activeTask.id} tasks={tasks} setActiveTask={setactiveTask} folderId={folderId} setTasks={setTasks}/>:null}
            {editingFolder?<EditFolder listName={listName} setlistName={setlistName} seteditingFolder={seteditingFolder} setFolders={props.setFolders} />:null}
        </div>
    )
}

export default List;