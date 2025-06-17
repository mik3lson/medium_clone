import React from 'react';


const DemoHeader =()=>{
   return(
    <header className ='border-b border-black sticky top-0 z-50'>
        <div className ='size h-[70px] flex items-center justify-between'>
          
            <img 
               className='h-[5.5rem]'
               src ="/medium_logo-removebg-preview.png"
               alt ="logo"
            />
          
        </div>
    </header>
   );
}
export default DemoHeader;