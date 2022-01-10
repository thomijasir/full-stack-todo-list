import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './container/LoginPage/Login.page';
import RegisterPage from './container/RegisterPage/Register.page';
import Dashboard from './container/DashboardPage/Dashboard.page';
import AuthProtect from './middleware/AuthProtect.mid';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <AuthProtect>
              <Dashboard />
            </AuthProtect>
          }
        />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
