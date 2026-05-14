import { useState } from 'react';
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Rightbar from "./components/Rightbar.jsx";
import List from "./components/List.jsx";
import {BrowserRouter, Router, Routes} from "react-router-dom";

function App() {
  const [activeTask,setactiveTask]=useState(null);
  const [currentList,setcurrentList]=useState([]);
  const [isdrawerOpen,setisdrawerOpen]=useState(false);
  const [folders,setfolders]=useState([]);
  return (
    <>
      <Navbar/>
      <Sidebar folders={["MyTodo","Today"]}/>
      <List listName="Today" tasks={["Bathe","Shit"]}/>
      {activeTask!==null?<RightBar task={activeTask}/>:null}
      {isdrawerOpen?<Drawer folders={folders}/>:null}
      <Footer/>
    </>
  )
}

export default App