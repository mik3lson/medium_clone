import React from 'react';
import {Routes, Route} from "react-router-dom";
import Demo from "./components/Demo/Demo";
import Home from "./components/home/home"; 
import DemoHeader from './components/Demo/DemoHeader';
import HomeHeader from './components/Home/HomeHeader';

function App() {
  const auth = false;
    return (
      <>
        {auth ? <HomeHeader/> : <DemoHeader />}
       <Routes>
        <Route path="/" element={<Home />}/>
        <Route path ="/demo" element= {<Demo />}/>
      </Routes>
      </>
      
  );
}

export default App;
