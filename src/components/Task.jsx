import React from 'react'

function Task(props) {
    return (
        <div className="sm:w-[50vw] w-[75vw] h-[8vh] bg-[#5DF8D8] flex items-center px-4 rounded-md h-[min(10vh,50px)] mt-[10px] sm:ml-10 ml-5 flex flex-row space-x-3 border-1 border-[#3B7597]" onClick={props.onTaskClick}>
            <input type="checkbox" className="w-5 h-5"/>
            <h3 className="text-black">{props.task}</h3>
        </div>
    )
}

export default Task;