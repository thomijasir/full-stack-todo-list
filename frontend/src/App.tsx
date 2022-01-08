import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './container/LoginPage/Login.page';
import RegisterPage from './container/RegisterPage/Register.page';
import Dashboard from './container/DashboardPage/Dashboard.page';
import useStorage from './hooks/useStorage';
import { ACCESS_TOKEN } from './constants';
import './App.scss';

const App = () => {
  const [token] = useStorage(ACCESS_TOKEN, '');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {token ? <Route path="/dashboard" element={<Dashboard />} /> : null}
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
