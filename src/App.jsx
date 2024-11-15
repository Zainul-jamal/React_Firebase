// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Api_router/Firebase";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for redirect

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      
      if (user) {
        setIsAuthenticated(true); // User is signed in
        // navigate("/dashboard"); // Redirect to dashboard
      } else {
        setIsAuthenticated(false); // User is signed out
        // navigate("/login"); // Redirect to login page
      }
    });

    return () => unsubscribe(); // Clean up the observer when component unmounts
  }, [navigate]);

  return (
    <Routes>
      <Route path="/*" element={<Dashboard /> } />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
