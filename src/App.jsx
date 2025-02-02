import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import Mylist from './pages/Mylist/Mylist'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recommendations from './pages/Recommendations/Recommendations'

const App = () => {
  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/mylist' element={<Mylist/>}/>
        <Route path='/recommendations' element={<Recommendations/>}/>
      </Routes>      
    </div>
  )
}

export default App
