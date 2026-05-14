import React from 'react';

function RightBar(props){
    //for now just show the stuff. Later add subtasks and edit tasks.
    return (
        <div className="fixed top-[10%] right-0 w-[30%] h-full bg-[#3B7597]">
            <h2>{props.task.name}</h2>
            <p>{props.task.description}</p>
        </div>
    )
}

export default RightBar;