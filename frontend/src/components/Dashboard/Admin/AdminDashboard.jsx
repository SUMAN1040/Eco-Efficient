import React, { useState, useEffect } from 'react';
import { 
  User, 
  Coins, 
  Truck, 
  Handshake, 
  CheckSquare, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Leaf
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import OverviewTab from './Tabs/OverviewTab';
import ProfileTab from './Tabs/ProfileTab';
import EcoCoinsTab from './Tabs/EcoCoinsTab';
import PartnersTab from './Tabs/PartnersTab';
import PickupsTab from './Tabs/PickupsTab';
import ApprovalsTab from './Tabs/ApprovalsTab';
import AdminSettingsModal from './Tabs/AdminSettingsModal';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile, setUserProfile] = useState({
    name: 'Loading...',
    email: '',
    role: 'Admin',
    organization: '',
    city: '',
    photo: '',
    joinedDate: 'Present',
    phone_number: '',
    adminId: ''
  });

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/accounts/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile({
        name: response.data.name || 'Admin',
        email: response.data.email || '',
        role: response.data.role || 'Admin',
        organization: response.data.organization || '',
        city: response.data.city || '',
        photo: response.data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.data.name || 'Admin'}`,
        joinedDate: response.data.date_joined || 'Recently',
        phone_number: response.data.phone_number || '',
        adminId: response.data.admin_id || 'N/A'
      });
    } catch (error) {
      console.error('Failed to fetch admin profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/auth';
  };

  const [stats, setStats] = useState([
    { title: 'Total Eco Coins', value: '1.2M', icon: <Coins className="text-warning" />, change: '+12%' },
    { title: 'Active Partners', value: '48', icon: <Handshake className="text-primary" />, change: '+5' },
    { title: 'Waste Pickups', value: '842', icon: <Truck className="text-success" />, change: '+18%' },
    { title: 'Pending Approvals', value: '14', icon: <CheckSquare className="text-danger" />, change: '-2' },
  ]);

  const [pickups, setPickups] = useState([
    { id: 'PK-1024', user: 'John Doe', type: 'Plastic', weight: '12kg', status: 'Scheduled', date: '2024-05-10', time: '10:00 AM' },
    { id: 'PK-1025', user: 'Alice Smith', type: 'Electronic', weight: '5kg', status: 'Pending', date: '2024-05-11', time: '02:30 PM' },
    { id: 'PK-1026', user: 'Bob Johnson', type: 'Organic', weight: '25kg', status: 'In Transit', date: '2024-05-10', time: '11:15 AM' },
  ]);

  const [partners, setPartners] = useState([
    { id: 1, name: 'EcoRecycle Solutions', type: 'Recycling Center', status: 'Connected', impact: 'High' },
    { id: 2, name: 'SwiftLogistics', type: 'Logistics Partner', status: 'Pending', impact: 'N/A' },
    { id: 3, name: 'Green Earth Processing', type: 'Waste Processor', status: 'Connected', impact: 'Medium' },
  ]);

  const SidebarItem = ({ id, icon, label }) => (
    <div 
      className={`sidebar-item ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      <div className="icon">{icon}</div>
      <span className="label">{label}</span>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="logo-box">
            <Leaf size={24} className="text-success" />
          </div>
          <h5 className="mb-0 fw-bold" style={{ color: 'var(--primary)', letterSpacing: '-0.02em' }}>EcoEfficient</h5>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <small className="nav-label">MAIN MENU</small>
            <SidebarItem id="overview" icon={<LayoutDashboard size={20} />} label="Overview" />
            <SidebarItem id="profile" icon={<User size={20} />} label="My Profile" />
            <SidebarItem id="eco-coins" icon={<Coins size={20} />} label="Eco Coin Manage" />
          </div>

          <div className="nav-group">
            <small className="nav-label">OPERATIONS</small>
            <SidebarItem id="partners" icon={<Handshake size={20} />} label="Partner Connections" />
            <SidebarItem id="pickups" icon={<Truck size={20} />} label="Waste Pickups" />
            <SidebarItem id="approvals" icon={<CheckSquare size={20} />} label="Waste Accept" />
          </div>

          <div className="nav-group mt-auto">
            <div className="sidebar-item" onClick={() => setShowSettingsModal(true)}>
              <div className="icon"><Settings size={20} /></div>
              <span className="label">Settings</span>
            </div>
            <div className="sidebar-item text-danger" onClick={handleLogout}>
              <div className="icon"><LogOut size={20} /></div>
              <span className="label">Logout</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="main-header">
          <div className="ms-auto header-actions">
            <div className="user-dropdown">
              <div className="user-info d-none d-md-block text-end me-3">
                <p className="user-name mb-0">{userProfile.name}</p>
                <small className="user-role">{userProfile.organization}</small>
              </div>
              <img src={userProfile.photo} alt="Profile" className="profile-img shadow-sm" />
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="content-body">
          {activeTab === 'overview' && <OverviewTab userProfile={userProfile} stats={stats} pickups={pickups} />}
          {activeTab === 'profile' && (
            <ProfileTab 
              userProfile={userProfile} 
              onEditClick={() => setShowSettingsModal(true)} 
            />
          )}
          {activeTab === 'eco-coins' && <EcoCoinsTab />}
          {activeTab === 'partners' && <PartnersTab partners={partners} />}
          {activeTab === 'pickups' && <PickupsTab />}
          {activeTab === 'approvals' && <ApprovalsTab />}
        </div>
      </main>

      {/* Admin Settings Modal reused from UserDashboard */}
      {showSettingsModal && (
        <AdminSettingsModal 
          show={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          profileData={userProfile}
          fetchProfileData={fetchProfileData}
          handleLogout={handleLogout}
        />
      )}

      <style>{`
        :root {
          --sidebar-width: 280px;
          --header-height: 80px;
          --primary-soft: #f0fdf4;
          --surface-bg: #f4f7f6;
          --border-light: #eef2f5;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--surface-bg);
          color: #1e293b;
        }

        /* Sidebar Styling */
        .dashboard-sidebar {
          width: var(--sidebar-width);
          background-color: #ffffff;
          border-right: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; bottom: 0; left: 0;
          z-index: 100;
        }

        .sidebar-header {
          height: var(--header-height);
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--border-light);
        }

        .logo-box {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--primary-soft);
          display: flex; align-items: center; justify-content: center;
        }

        .sidebar-nav {
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          flex-grow: 1;
        }

        .nav-label {
          color: #94a3b8;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
          display: block;
          padding-left: 12px;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 4px;
        }

        .sidebar-item:hover {
          background: var(--primary-soft);
          color: var(--primary);
        }

        .sidebar-item.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(45, 74, 34, 0.2);
        }

        /* Main Content Styling */
        .dashboard-main {
          flex-grow: 1;
          margin-left: var(--sidebar-width);
          display: flex;
          flex-direction: column;
        }

        .main-header {
          height: var(--header-height);
          background: white;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-light);
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          padding: 10px 18px;
          border-radius: 100px;
          width: 350px;
          border: 1px solid var(--border-light);
        }

        .search-bar input {
          border: none; background: transparent; outline: none; flex-grow: 1;
          font-size: 0.9rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .notification-btn {
          position: relative;
          background: none; border: none; color: #64748b;
        }

        .badge-dot {
          position: absolute; top: 0; right: 0;
          width: 8px; height: 8px; background: var(--primary);
          border-radius: 50%; border: 2px solid white;
        }

        .user-dropdown {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .user-name { font-weight: 700; color: #1e293b; font-size: 0.95rem; }
        .user-role { color: #94a3b8; font-size: 0.75rem; font-weight: 600; }

        .profile-img {
          width: 40px; height: 40px; border-radius: 12px; object-fit: cover;
        }

        .content-body {
          padding: 40px;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
        }

        /* Dashboard Cards */
        .dashboard-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          border: 1px solid var(--border-light);
        }

        .stat-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border-light);
          transition: transform 0.3s ease;
        }
        .stat-card:hover { transform: translateY(-5px); }

        .stat-icon-box {
          width: 48px; height: 48px; border-radius: 14px;
          background: #f8fafc; display: flex; align-items: center; justify-content: center;
          font-size: 1.25rem;
        }

        /* Tables */
        .custom-table {
          margin-bottom: 0;
        }
        .custom-table thead th {
          border-top: none; color: #94a3b8; font-size: 0.75rem; text-transform: uppercase;
          letter-spacing: 0.05em; padding: 16px;
        }
        .custom-table tbody td {
          padding: 16px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem;
        }

        .status-pill {
          padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 700;
          display: inline-block;
        }
        .status-pill.scheduled { background: #eff6ff; color: #3b82f6; }
        .status-pill.pending { background: #fff7ed; color: #f97316; }
        .status-pill.in-transit { background: #f0fdf4; color: #22c55e; }
        .status-pill.connected { background: #f0fdf4; color: #22c55e; }

        .btn-icon-sm {
          width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0;
          background: white; color: #64748b; display: flex; align-items: center; justify-content: center;
        }

        /* Profile Special Styling */
        .profile-header-banner {
          height: 180px; background: var(--primary); border-radius: 16px;
          background-image: linear-gradient(135deg, var(--primary) 0%, #1a3a25 100%);
        }
        .profile-img-lg { width: 140px; height: 140px; border-radius: 32px; object-fit: cover; }
        .btn-edit-photo {
          position: absolute; bottom: 8px; right: 8px; width: 36px; height: 36px;
          border-radius: 50%; border: none; background: white; color: var(--primary);
          display: flex; align-items: center; justify-content: center;
        }

        .bg-gradient-coins {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
        }

        .partner-logo-box {
          width: 56px; height: 56px; border-radius: 16px; background: var(--primary-soft);
          display: flex; align-items: center; justify-content: center;
        }

        .hover-lift { transition: all 0.3s ease; }
        .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(0,0,0,0.06) !important; }

        .sm-avatar {
          width: 32px; height: 32px; border-radius: 8px; display: flex;
          align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800;
        }

        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1024px) {
          .dashboard-sidebar { width: 80px; }
          .sidebar-item .label, .nav-label, .sidebar-header h5 { display: none; }
          .dashboard-main { margin-left: 80px; }
          .search-bar { width: 200px; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
