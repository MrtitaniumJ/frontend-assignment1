import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PrivateRoute from './components/PrivateRoutes';  
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <Router>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
