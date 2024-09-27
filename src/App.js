import Login from './pages/Login';
import {useCookies} from "react-cookie"
import React, { useEffect } from 'react';
import './App.css';
import ListingPage from './pages/ListingPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserDetails from './pages/UserDetails';
function App() {
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    console.log('Cookie:', cookies.user);
    if (cookies.user) {
      const user = JSON.stringify(cookies.user);
      console.log(user);
    }
  }, [cookies]);
  return (
    
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={!cookies.user ? <Login /> : <Navigate to="/listing" />} />
          <Route path="/listing" element={cookies.user ? <ListingPage /> : <Navigate to="/login" />} />
          <Route path={`/user-details/:userId`} element={cookies.user ? <UserDetails /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={cookies.user ? "/listing" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
