import {useState} from "react";
import Navbar from "./Navbar"

function swap(sethasAccount){
    sethasAccount(false);
}

function Login(props){
    const [formData,setformData]=useState({username:"",password:""});
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch("/login",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                username:formData.username,
                password:formData.password
            })
        })
        .then(result=>result.json())
        .then(data=>{
            if (data.authenticated) props.setisAuth(true);
            else alert(data.message);
        })
    }
    return (
        <>
            <Navbar/>
            <div className="w-full h-[90vh] mt-[10vh] flex flex-col bg-[#3B7597] justify-center items-center">
                <form className="relative rounded-md bg-[#093C5D] flex flex-col w-[max(25%,300px)] p-5 space-y-5" onSubmit={handleSubmit}>
                    <h1 className="text-xl text-center">Login</h1>
                    <input type="text" name="username" className="rounded-md mx-[auto] pl-3 border-white h-[40px] w-[90%]" placeholder="Username" onChange={handleChange} value={formData.username}/>
                    <input type="password" name="password" className="rounded-md pl-3 mx-[auto] border-white h-[40px] w-[90%]" placeholder="Password" onChange={handleChange} value={formData.password}/>
                    <button type="submit" className="bg-[#5DF8D8] text-[black] rounded-lg px-3 py-1 border-none outline-none hover:cursor-pointer mx-[auto]">Login</button>
                    <button type="button" className="absolute bottom-[8px] right-[8px] text-sm hover:cursor-pointer" onClick={()=>swap(props.sethasAccount)}>Sign Up</button>
                    
                </form>
            </div>

        </>
    )
}

export default Login;