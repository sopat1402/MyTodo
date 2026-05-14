import { useState } from 'react';
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Rightbar from "./components/Rightbar.jsx";
import List from "./components/List.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Drawer from "./components/Drawer.jsx";

function onTaskClick(task,setActiveTask){
  setActiveTask(task);
}
function App() {
  const [activeTask,setactiveTask]=useState(null);
  const [currentList,setcurrentList]=useState("Today");
  const [isdrawerOpen,setisdrawerOpen]=useState(false);
  const [folders,setfolders]=useState([{name: "Today",key:1}, {name: "MyTodo",key:2}, {name: "Work",key:3}]);
  const today={name: "Today", tasks: [{title: "Task 1",key:1,completed:false}, {title: "Task 2",key:2,completed:false}, {title: "Task 3",key:3,completed:false}]};
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Sidebar folders={folders}/>
          <Routes>
            <Route path="/" element={<List listName={today.name} tasks={today.tasks} onTaskClick={onTaskClick} setActiveTask={setactiveTask}/>}/>
          </Routes>
        {activeTask!==null?<Rightbar task={activeTask} setActiveTask={setactiveTask}/>:null}
        {isdrawerOpen?<Drawer folders={folders}/>:null}
        <Footer setisdrawerOpen={setisdrawerOpen}/>
      </BrowserRouter>
    </>
  )
}

export default App