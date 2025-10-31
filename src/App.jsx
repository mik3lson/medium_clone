import React from 'react';
import {Navigate, Routes, Route} from "react-router-dom";
import Demo from "./components/Demo/Demo";
import Home from "./components/home/home"; 
import DemoHeader from './components/Demo/DemoHeader';
import HomeHeader from './components/Home/Header/HomeHeader';
import { Blog } from './Context/Context';
import { ToastContainer, toast } from 'react-toastify';


function App() {
    const {currentUser} = Blog();
    return (
      <>
        {currentUser ? <HomeHeader/> : <DemoHeader />}
        <ToastContainer />
        <Routes>
        {currentUser && <Route path="/" element={<Home />}/>}
        {!currentUser &&<Route path ="/demo" element= {<Demo />}/>}
        <Route path ="*" element = {<Navigate to ={ ! currentUser ? "/demo" :"/"}/>}/>
      </Routes>
      </>
      
  );
}

export default App;
