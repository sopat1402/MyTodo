import React from 'react';

function Rightbar(props){
    //for now just show the stuff. Later add subtasks and edit tasks.
    return (
        <div className="fixed top-[10%] right-0 hidden flex-col sm:flex sm:w-[30%] h-full bg-[#3B7597]">
            <h2 className='ml-3 my-2 text-2xl'>Name : <input type="text" value={props.task.title} onChange={(e) => props.task.title = e.target.value}/></h2>
            <p>{props.task.description}</p>
            <button className="ml-3 bg-[#5DF8D8] text-black py-2 px-4 rounded-md hover:cursor-pointer absolute top-3 right-3" onClick={() => props.setActiveTask(null)}>Close</button>
        </div>
    )
}

export default Rightbar;