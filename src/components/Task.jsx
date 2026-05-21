import React from 'react'

function Task(props) {
    return (
        <div className="relative z-0 sm:w-[50vw] w-[75vw] h-[8vh] bg-[#5DF8D8] flex items-center px-4 rounded-md h-[min(10vh,50px)] mt-[10px] sm:ml-10 ml-5 flex flex-row space-x-3 border-1 border-[#3B7597] hover:cursor-pointer" onClick={() => props.onTaskClick(props.task, props.setActiveTask)}>
            <input type="checkbox" checked={props.task.completed} className="w-5 h-5" onClick={(e)=>{e.stopPropagation();}}
                onChange={(e)=>{
                    fetch(`/api/task/${props.task.id}`,{
                        method:"PATCH",
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({
                            folderId:props.folderId,
                            completed:!props.task.completed
                        })
                    })
                    .then(()=>{
                        props.setTasks(prev=>prev.map(
                            task=>task.id===props.task.id?{...task,completed:!task.completed}:task
                        ))
                    })
                }}
            />
            <h3 className="text-black">{props.task.title}</h3>
            <button className="bg-[#5DF8D8] hover:cursor-pointer text-[red] absolute right-3" onClick={(e)=>{
                e.stopPropagation();
                fetch(`/api/deleteTask/${props.task.id}`,{
                    method:"DELETE",
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(()=>{props.setTasks(prev=>{
                    return prev.filter(task => task.id !== props.task.id)
                })});
            }}>Delete</button>
        </div>
    )
}

export default Task;