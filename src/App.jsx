import './App.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import { UserProvider } from './components/UserContext'; 

import { Routes, Route, Navigate } from 'react-router-dom';


// pages
import NotFound from './pages/NotFound'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import InterestChallenges from './pages/InterestChallenges';


function App() {

  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <UserProvider>
      {!isAuthPage && <Header />}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='/interest/:id/task' element={<InterestChallenges/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
