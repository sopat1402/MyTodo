import { useState,useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import List from "./List.jsx";
import Drawer from "./Drawer.jsx";


function App(props) {
  const [currentList,setcurrentList]=useState("Today");
  const [isdrawerOpen,setisdrawerOpen]=useState(false);
  const [folders,setFolders]=useState([]);
  useEffect(()=>{
    fetch("/api/folders",{
      credentials:"include",
    })
    .then(result=>result.json())
    .then(data=>{
      setFolders(data);
    })
  },[])
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Sidebar folders={folders} setisAuth={props.setisAuth}/>
          <Routes>
            <Route path="/" element={<List folders={folders}/>} />
            <Route path="/folder/:id" element={<List folders={folders}/>}/>
          </Routes>
        {isdrawerOpen?<Drawer folders={folders}/>:null}
        <Footer setisdrawerOpen={setisdrawerOpen}/>
      </BrowserRouter>
    </>
  )
}

export default App