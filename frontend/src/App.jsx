import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/LandingPage/Navbar';
import Footer from './components/LandingPage/Footer';
import Landing from './pages/Landing';
import Auth from './components/Auth/Auth';
import UserDashboard from './components/Dashboard/User/UserDashboard';
import HelpSupport from './components/Dashboard/User/HelpSupport';
import Redeem from './components/Dashboard/User/Redeem';
import Impact from './components/Dashboard/User/Impact';

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
        <Route path="/dashboard/redeem" element={<Redeem />} />
        <Route path="/dashboard/help" element={<HelpSupport />} />
        <Route path="/dashboard/impact" element={<Impact />} />
      </Routes>
      {!isAuthPage && !isDashboardPage && <Footer />}
    </div>
  );
}

export default App;
