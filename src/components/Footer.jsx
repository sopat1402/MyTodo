import {useState} from "react";
import {Link} from "react-router-dom";
import Drawer from "./Drawer.jsx";
import Hamburger from "./Hamburger";

function Footer(props){
    const [hamburgerOpen,sethamburgerOpen]=useState(false);
    const [isdrawerOpen,setisdrawerOpen]=useState(false);
    return (
        <footer className="w-full h-[10%] md:hidden flex flex-row bg-[#093C5D] fixed bottom-0 left-0 items-center justify-around">
            <Link to="/"><button className="hover:cursor-pointer">Today</button></Link>
            <button className="hover:cursor-pointer" onClick={()=> setisdrawerOpen(!isdrawerOpen)}>Folders</button>
            <button className="hover:cursor-pointer text-xl" onClick={()=>sethamburgerOpen(!hamburgerOpen)}>☰</button>
            {isdrawerOpen?<Drawer folders={props.folders} setisdrawerOpen={setisdrawerOpen} setFolders={props.setFolders}/>:null}
            {hamburgerOpen?<Hamburger sethamburgerOpen={sethamburgerOpen}/>:null}
        </footer>
    )
}

export default Footer;