import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import FeedbackForm from './pages/FeedbackForm';
import './App.css'

function App() {


  return (
    <>
      <Routes>
        <Route path="/add-feedback" element={<FeedbackForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
