import {useState} from "react";

function EditFolder(props){
    const [formData,setformData]=useState({name:props.listName});
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch(`/api/folder/${props.folderId}`,{
            method:"PATCH",
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name:formData.name
            })
        })
        .then(()=>{
            props.seteditingFolder(false);
            props.setFolders(prev =>
                prev.map(folder =>
                    folder.id === props.folderId
                        ? {
                            ...folder,
                            name:formData.name,
                            id:props.folderId
                        }
                        : folder
                )
            );
        })
    }
    return (
        <form className="rounded-md w-[max(30%,250px)] fixed z-10 bg-[#3B7597] mx-auto right-[7.5vw] bottom-[12%] h-[400px] p-5 flex flex-col space-y-2 border-white border" onSubmit={handleSubmit} >
            <h1 className="text-center mb-3 text-xl">Edit folder</h1>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border-[white] rounded-md my-2 h-[40px] px-3"/>
            <button type="submit" className="hover:cursor-pointer mt-4">Edit Folder</button>
            <button type="button" onClick={()=>props.seteditingFolder(false)} className="hover:cursor-pointer absolute bottom-[15px] right-[10px]" >Cancel</button>
        </form>
    )
}

export default EditFolder;