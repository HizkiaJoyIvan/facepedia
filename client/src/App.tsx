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
import NotFound from './pages/NotFound'

const App:React.FC = () => {

  const {userInfo} = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={userInfo?.isLoggedIn ? <Home /> : <Login />}/> 
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={userInfo?.isLoggedIn ? <Navigate to={'/'}/> : <Login />} />
        <Route path='/profile/:id' element={userInfo?.isLoggedIn ? <Profile /> : <Login />}/>
        <Route path='/friends/:id' element={<Friends />}/>
        <Route path='/settings' element={<Settings />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
