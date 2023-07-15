import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'

const App:React.FC = () => {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
