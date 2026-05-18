import React from 'react';

function Rightbar(props){
    //for now just show the stuff. Later add subtasks and edit tasks.
    return (
        <div className="fixed top-[10%] right-0 hidden flex-col sm:flex sm:w-[max(30%,250px)] h-full bg-[#3B7597]">
            <h2 className='text-center text-2xl mb-2'>Edit task</h2>
            <h2 className='ml-7 my-2 text-2xl'><input type="text" value={props.task.title} onChange={(e) => props.task.title = e.target.value}/></h2>
            <p className='w-[80%] mx-auto mt-3 h-[30%]'><input className="h-[30%] w-full" type="text" value={props.task.description}/></p>
            <button className="ml-3 bg-[red] text-white py-2 px-4 rounded-md hover:cursor-pointer absolute top-3 right-3" onClick={() => props.setActiveTask(null)}>X</button>
        </div>
    )
}

export default Rightbar;