import React from 'react';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import Preview from './Preview';
import { Blog } from '../../../Context/Context';

const Write = () => {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const {publish, setPublish} = Blog();  //another firebase element that needs changing
  return(
   <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
    <input 
        value={title}
        onChange ={(e) => setTitle (e.target.value)}
        type="text" 
        placeholder='Title' 
        className ="text-4xl outline-none w-full font-title" 
    />
    <ReactQuill 
       theme='bubble' 
       value={description} 
       onChange={setDescription} 
       placeholder="Tell your story..."
       className='write my-5 font-title'
       />
       <div
        className ={` ${
            publish ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-200`}>
          <Preview setPublish={setPublish} description={description} title={title} />
       </div>
       </section>
  )
};

export default Write;