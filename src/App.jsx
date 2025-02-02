import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import Mylist from './pages/Mylist/Mylist'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recommendations from './pages/Recommendations/Recommendations'
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <ToastContainer theme='dark' />
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/player/:id' element={<ProtectedRoute><Player /></ProtectedRoute>} />
          <Route path='/mylist' element={<ProtectedRoute><Mylist /></ProtectedRoute>} />
          <Route path='/recommendations' element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;