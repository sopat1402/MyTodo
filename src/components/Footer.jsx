import React from "react";

function Footer(){
    return (
        <footer className="w-full h-[10%] md:hidden flex flex-row bg-[#093C5D] fixed bottom-0 left-0 items-center justify-around">
            <button>Today</button>
            <button>Folders</button>
            <button>Profile</button>
        </footer>
    )
}

export default Footer;