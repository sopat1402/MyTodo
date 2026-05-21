import {useState} from "react";

function AddTask(props){
    const [formData,setformData]=useState({title:"",description:""});
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch("/api/addTask",{
            method:"POST",
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                taskTitle:formData.title,
                taskDescription:formData.description,
                taskParent:null,
                folderId:props.folderId,
            })
        })
        .then(result=>result.json())
        .then(data=>{
            props.setAdding(false);
            props.setTasks(prev=>[...prev,{title:data.title,id:data.id,description:data.description}]);
        })
    }
    return (
        <form className="rounded-md w-[max(30%,250px)] fixed z-10 bg-[#3B7597] right-[7.5vw] bottom-[12%] h-[400px] p-5 flex flex-col space-y-2" onSubmit={handleSubmit} >
            <h1 className="text-center mb-3 text-xl">Add a task</h1>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border-[white] rounded-md my-2 h-[40px] px-3"/>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border-[white] rounded-md my-2 h-[40px] px-3"/>
            <button type="submit" className="hover:cursor-pointer mt-4">Add task</button>
            <button type="button" onClick={()=>props.setAdding(false)} className="hover:cursor-pointer absolute bottom-[15px] right-[10px]" >Cancel</button>
        </form>
    )
}

export default AddTask;