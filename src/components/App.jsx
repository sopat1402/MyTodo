import { useState,useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import Rightbar from "./Rightbar.jsx";
import List from "./List.jsx";
import Drawer from "./Drawer.jsx";


function App(props) {

  const [activeTask,setactiveTask]=useState(null);
  const [currentList,setcurrentList]=useState("Today");
  const [isdrawerOpen,setisdrawerOpen]=useState(false);
  const [folders,setFolders]=useState([]);
  useEffect(()=>{
    fetch("/api/folders")
    .then(result=>result.json())
    .then(data=>{
      setFolders(data);
      console.log(folders);
    })
  },[])
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Sidebar folders={folders} setisAuth={props.setisAuth}/>
          <Routes>
            <Route path="/" element={<List listName={today.name} tasks={today.tasks} setActiveTask={setactiveTask}/>}/>
            {folders.map((folder)=><Route path={`/folder/${folder.id}`} element={<List listName={folder.name} id={folder.id} setActiveTask={setactiveTask}/>}/>)}
          </Routes>
        {activeTask!==null?<Rightbar task={activeTask} setActiveTask={setactiveTask}/>:null}
        {isdrawerOpen?<Drawer folders={folders}/>:null}
        <Footer setisdrawerOpen={setisdrawerOpen}/>
      </BrowserRouter>
    </>
  )
}

export default App