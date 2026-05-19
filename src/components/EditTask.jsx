import {useState} from "react";

function EditTask(props){
    const [formData,setformData]=useState({title:props.title,description:props.description});
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch(`/api/task/${props.id}`,{
            method:"PATCH",
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                title:formData.title,
                description:formData.description,
                taskParent:props.taskParent,
                folderId:props.folderId,
            })
        })
        .then(result=>result.json())
        .then(data=>{
            props.setEditing(false);
            props.setTasks(prev =>
                prev.map(task =>
                    task.id === props.id
                        ? {
                            ...task,
                            title: formData.title,
                            description: formData.description
                        }
                        : task
                )
            );
        })
    }
    return (
        <form className="rounded-md w-[max(30%,250px)] fixed z-10 bg-[#3B7597] mx-auto right-[7.5vw] bottom-[12%] h-[400px] p-5 flex flex-col space-y-2 border-white border" onSubmit={handleSubmit} >
            <h1 className="text-center mb-3 text-xl">Edit task</h1>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border-[white] rounded-md my-2 h-[40px] px-3"/>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border-[white] rounded-md my-2 min-h-[120px] px-3"/>
            <button type="submit" className="hover:cursor-pointer mt-4">Edit task</button>
            <button type="button" onClick={()=>props.setEditing(false)} className="hover:cursor-pointer absolute bottom-[15px] right-[10px]" >Cancel</button>
        </form>
    )
}

export default EditTask;