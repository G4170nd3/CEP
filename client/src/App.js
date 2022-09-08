import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Navbar from './layout/Navbar';
import Login from './pages/AuthUserGateway';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1000)

  return isLoading !== true ? (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/vieworders" element={<Dashboard />} />
          <Route exact path="/lend" element={<Dashboard />} />
          <Route exact path="/borrow" element={<Dashboard />} />
          {/* <Route path='/404' element={<NotFound />}></Route> */}
          {/* <Route element={<NotFound />}></Route> */}
        </Routes>
        {/* <Footer /> */}
      </AuthProvider>
    </Router>
  )
    : (
      <div className="loader-container">
        Loading...
      </div>
    )
}

export default App;