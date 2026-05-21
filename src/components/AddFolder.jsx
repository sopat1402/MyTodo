import {useState} from "react";

function AddFolder(props){
    const [formData,setformData]=useState({name:"Folder"});
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch(`/api/addFolder`,{
            method:"POST",
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                folderName:formData.name
            })
        })
        .then(result=>result.json())
        .then(data=>{
            props.setaddFolder(false);
            props.setFolders(prev=>[...prev,{name:formData.name,id:data.id.rows[0].id}]);
        })
    }
    return (
        <form className="rounded-md w-[max(30%,250px)] fixed z-100 bg-[#3B7597] mx-auto right-[7.5vw] bottom-[12%] h-[400px] p-5 flex flex-col space-y-2 border-white border" onSubmit={handleSubmit} >
            <h1 className="text-center mb-3 text-xl">Add folder</h1>
            <input type="text" name="name" placeholder="Name" value={formData.folderName} onChange={handleChange} className="border-[white] rounded-md my-2 h-[40px] px-3"/>
            <button type="submit" className="hover:cursor-pointer mt-4">Add Folder</button>
            <button type="button" onClick={()=>props.setaddFolder(false)} className="hover:cursor-pointer absolute bottom-[15px] right-[10px]" >Cancel</button>
        </form>
    )
}

export default AddFolder;