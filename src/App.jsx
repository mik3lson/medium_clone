import React from 'react';
import {Navigate, Routes, Route} from "react-router-dom";
import Demo from "./components/Demo/Demo";
import Home from "./components/home/home"; 
import DemoHeader from './components/Demo/DemoHeader';
import HomeHeader from './components/Home/HomeHeader';

function App() {
  const currentUser = false;
    return (
      <>
        {currentUser ? <HomeHeader/> : <DemoHeader />}
       <Routes>
        {currentUser && <Route path="/" element={<Home />}/>}
        {!currentUser &&<Route path ="/demo" element= {<Demo />}/>}
        <Route path ="*" element = {<Navigate to ={ ! currentUser ? "/demo" :"/home"}/>}/>
      </Routes>
      </>
      
  );
}

export default App;
