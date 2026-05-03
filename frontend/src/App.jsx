import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Landing from './pages/Landing';
import Auth from './components/Auth/Auth';
import UserDashboard from './components/Dashboard/User/UserDashboard';
import HelpSupport from './components/Dashboard/User/HelpSupport';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <div className="app">
      {!isDashboardPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/help" element={<HelpSupport />} />
      </Routes>
      {!isAuthPage && !isDashboardPage && <Footer />}
    </div>
  );
}

export default App;
