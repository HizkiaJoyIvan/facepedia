import React, { useContext } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthContext } from './context/AuthContext'
import Profile from './pages/Profile'
import Friends from './pages/Friends'
import Settings from './pages/Settings'

const App:React.FC = () => {

  const {userId} = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={userId ? <Home /> : <Login />}/> 
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={userId ? <Navigate to={'/'}/> : <Login />} />
        <Route path='/profile/:id' element={userId ? <Profile /> : <Login />}/>
        <Route path='/friends/:id' element={<Friends />}/>
        <Route path='/settings/:id' element={<Settings />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
