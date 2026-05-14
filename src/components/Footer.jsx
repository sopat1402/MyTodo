import React from "react";
import {Link} from "react-router-dom";

function Footer(props){
    return (
        <footer className="w-full h-[10%] md:hidden flex flex-row bg-[#093C5D] fixed bottom-0 left-0 items-center justify-around">
            <Link to="/"><button>Today</button></Link>
            <button onClick={()=> props.setisdrawerOpen(isdrawerOpen=>{return !isdrawerOpen})}>Folders</button>
            <button>Profile</button>
        </footer>
    )
}

export default Footer;