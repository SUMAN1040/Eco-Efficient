import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/LandingPage/Navbar';
import Footer from './components/LandingPage/Footer';
import Landing from './pages/Landing';
import Auth from './components/Auth/Auth';
import UserDashboard from './components/Dashboard/User/UserDashboard';
import HelpSupport from './components/Dashboard/User/HelpSupport';
import Redeem from './components/Dashboard/User/Redeem';
import Impact from './components/Dashboard/User/Impact';
import AdminDashboard from './components/Dashboard/Admin/AdminDashboard';
import PartnerDashboard from './components/Dashboard/Partner/PartnerDashboard';

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
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/user" replace />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/user/redeem" element={<Redeem />} />
        <Route path="/dashboard/user/help" element={<HelpSupport />} />
        <Route path="/dashboard/user/impact" element={<Impact />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/partner" element={<PartnerDashboard />} />
      </Routes>
      {!isAuthPage && !isDashboardPage && <Footer />}
    </div>
  );
}

export default App;
