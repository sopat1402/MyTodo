import {useState} from 'react';
import EditTask from './EditTask';

function addsubTask(task,setTasks){
    return (
        <div className="relative z-0 sm:w-[50vw] w-[75vw] h-[8vh] bg-[#5DF8D8] flex items-center px-4 rounded-md h-[min(10vh,50px)] mt-[10px] sm:ml-10 ml-5 flex flex-row space-x-3 border-1 border-[#3B7597]">
            <input type="checkbox" checked={task.completed} className="w-5 h-5" onClick={(e)=>{e.stopPropagation();}}
                onChange={(e)=>{
                    fetch(`/api/task/${task.id}`,{
                        method:"PATCH",
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({
                            folderId:props.folderId,
                            completed:!props.task.completed
                        })
                    })
                    .then(()=>{
                        setTasks(prev=>prev.map(
                            item=>item.id===task.id?{...item,completed:!item.completed}:item
                        ))
                    })
                }}
            />
            <h3 className="text-black">{task.title}</h3>
            <button className="bg-[#5DF8D8] hover:cursor-pointer text-[red] absolute right-3" onClick={(e)=>{
                e.stopPropagation();
                fetch(`/api/deleteTask/${task.id}`,{
                    method:"DELETE",
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(()=>{setTasks(prev=>{
                    return prev.filter(item => item.id !== task.id)
                })});
            }}>Delete</button>
        </div>
    )
}
function Rightbar(props){
    //Later add subtasks.
    const [editing,setEditing]=useState(false);
    const task=props.tasks.find(item=>item.id===props.taskId);
    return (
        <div className="fixed top-[10%] right-0 flex-col flex w-full sm:w-[max(30%,250px)] h-[90vh] bg-[#3B7597] pt-3">
            <h2 className='text-center text-2xl mb-2'>Task details</h2>
            <h2 className='ml-7 my-2 text-2xl'>{task.title}</h2>
            <p className='w-[80%] mx-auto mt-3 h-[30%]'>{task.description}</p>
            <button className="ml-3 bg-[red] text-[white] py-2 px-4 rounded-md hover:cursor-pointer absolute top-3 right-3" onClick={() => props.setActiveTask(null)}>X</button>
            <button className="ml-3 bg-[#5DF8D8] text-[black] py-2 px-4 rounded-md hover:cursor-pointer absolute bottom-[200px] sm:bottom-[max(10vh,100px)] right-3" onClick={()=>setEditing(true)}>Edit</button>
            {editing?<EditTask setEditing={setEditing} title={task.title} description={task.description} id={task.id} folderId={props.folderId} taskParent={null} setTasks={props.setTasks} setActiveTask={props.setActiveTask} />:null}
        </div>
    )
}

export default Rightbar;