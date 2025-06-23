import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {nav} from "../../data";


const DemoHeader =()=>{
   const [isActive, setIsActive ]= useState(false);

   useEffect(() => {
    const scrollMe =() =>{
        window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scrollMe);
   },[]);
   return(
     <header 
        className ={`border-b border-black sticky top-0 z-50 
     ${isActive ? "bg-white" : "bg-banner"} 
     transition-all duration-500 `}>
        <div className ='size h-[70px] flex items-center justify-between'>
            <Link to = {"/"}>
            <img 
            className='h-[5.5rem]'
            src ="/medium_logo-removebg-preview.png"
            alt ="logo"
            />
            </Link>
            
            <div className ='flex items-center gap-5'>
                <div className='hidden text-sm sm:flex items-center gap-5'>
                    {nav.map((link, i) => (
                     <Link to ={link.path}>{link.title}</Link>
                     ))}
                </div>
                <div className ='relative'>
                    <button className ='hidden text-sm sm:flex items-center gap-5'>Sign in</button>
                </div>
                <button 
                className ={`bg-black text-white rounded-full px-3 p-2 text-sm font-medium
                ${isActive ? "bg-green-700":"bg-black"}
                `}>Get Started
                </button>
            </div>
        </div>
    </header>
   );
}
export default DemoHeader;