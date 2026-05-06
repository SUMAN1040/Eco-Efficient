import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Package, 
  TrendingUp, 
  Truck,
  Leaf,
  LayoutDashboard,
  FileText,
  Store,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Modular Component Imports (Keeping main content sections modular)
import Overview from './Tab/Overview';
import AdminRequests from './Tab/AdminRequests';
import Inventory from './Tab/Inventory';
import StoreManagement from './Tab/StoreManagement';
import PerformanceMetrics from './Tab/PerformanceMetrics';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock Data
  const userProfile = {
    name: 'Eco Logistic Solutions',
    organization: 'Premium Logistics Partner',
    city: 'Mumbai',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Logistics'
  };

  const stats = [
    { label: 'Pending Requests', value: '04', change: '+2', icon: <Clock size={20} />, color: 'warning' },
    { label: 'Active Inventory', value: '1.2 Tons', change: '+15%', icon: <Package size={20} />, color: 'primary' },
    { label: 'Completed Deliveries', value: '142', change: '+12', icon: <Truck size={20} />, color: 'success' },
    { label: 'Efficiency Score', value: '94%', change: '+2.4%', icon: <TrendingUp size={20} />, color: 'info' }
  ];

  const adminRequestsData = [
    { id: 'REQ-2024-001', type: 'Route Approval', status: 'Pending', date: '2024-10-12', priority: 'High' },
    { id: 'REQ-2024-002', type: 'Expansion Request', status: 'Approved', date: '2024-10-10', priority: 'Medium' },
    { id: 'REQ-2024-003', type: 'Incentive Claim', status: 'Rejected', date: '2024-10-08', priority: 'Low' },
    { id: 'REQ-2024-004', type: 'Site Inspection', status: 'Pending', date: '2024-10-14', priority: 'High' },
  ];

  const inventoryItems = [
    { category: 'Paper & Cardboard', quantity: '450kg', capacity: '75%', lastUpdated: '2 hours ago' },
    { category: 'Plastic (HDPE/PET)', quantity: '320kg', capacity: '55%', lastUpdated: '5 hours ago' },
    { category: 'Glass Bottles', quantity: '180kg', capacity: '30%', lastUpdated: '1 day ago' },
    { category: 'Metal Scrap', quantity: '250kg', capacity: '45%', lastUpdated: '3 hours ago' },
  ];

  const storesData = [
    { name: 'Central Sorting Hub', location: 'Worli, Mumbai', manager: 'Amit Sharma', status: 'Operational', staff: 24, lastAudit: '2024-09-20' },
    { name: 'East Side Collection Point', location: 'Powai, Mumbai', manager: 'Sneha Reddy', status: 'Operational', staff: 12, lastAudit: '2024-10-01' },
    { name: 'Suburban Dispatch Center', location: 'Borivali, Mumbai', manager: 'Vikram Singh', status: 'Maintenance', staff: 8, lastAudit: '2024-09-15' },
  ];

  // Internal Sidebar Component
  const Sidebar = () => (
    <aside className="dashboard-sidebar shadow-sm">
      <div className="sidebar-header">
        <div className="logo-box">
          <Leaf size={24} className="text-success" />
        </div>
        {!sidebarCollapsed && <h5 className="mb-0 fw-bold" style={{ color: 'var(--primary)', letterSpacing: '-0.02em' }}>EcoEfficient</h5>}
      </div>
      <nav className="sidebar-nav">
        {[
          { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
          { id: 'requests', label: 'Admin Requests', icon: <FileText size={20} /> },
          { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
          { id: 'store', label: 'Store Management', icon: <Store size={20} /> },
          { id: 'performance', label: 'Performance', icon: <BarChart3 size={20} /> },
          { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
        ].map(item => (
          <div 
            key={item.id}
            className={`nav-item-custom ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            {!sidebarCollapsed && <span>{item.label}</span>}
          </div>
        ))}
      </nav>
      <div className="p-3 mt-auto border-top">
        <div className="nav-item-custom text-danger" onClick={() => navigate('/auth')}>
          <LogOut size={20} />
          {!sidebarCollapsed && <span>Log Out</span>}
        </div>
      </div>
    </aside>
  );

  // Internal Header Component
  const Header = () => (
    <header className="main-header">
      <h5 className="mb-0 fw-bold text-dark text-capitalize">{activeTab.replace('-', ' ')}</h5>
      <div className="d-flex align-items-center gap-4">
        <div className="d-flex align-items-center gap-3">
          <div className="text-end d-none d-md-block">
            <p className="mb-0 fw-bold small text-dark">{userProfile.name}</p>
            <small className="text-muted">{userProfile.organization}</small>
          </div>
          <img src={userProfile.photo} alt="Profile" className="user-profile-img" />
        </div>
      </div>
    </header>
  );

  return (
    <div className="dashboard-wrapper">
      <style>{`
        :root {
          --sidebar-width: 280px;
          --sidebar-collapsed-width: 80px;
          --primary: #2D4A22;
          --primary-soft: rgba(45, 74, 34, 0.08);
          --secondary: #829375;
          --bg-light: #f8fafc;
          --glass: rgba(255, 255, 255, 0.8);
          --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        body { background: var(--bg-light); font-family: 'Inter', sans-serif; }

        .dashboard-sidebar {
          width: ${sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'};
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: #fff;
          border-right: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          overflow: hidden;
        }

        .logo-box {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--primary-soft);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .sidebar-nav { padding: 12px; flex-grow: 1; }
        
        .nav-item-custom {
          padding: 12px 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #64748b;
          text-decoration: none;
          margin-bottom: 4px;
          transition: all 0.2s;
          cursor: pointer;
        }

        .nav-item-custom:hover, .nav-item-custom.active {
          background: var(--primary-soft);
          color: var(--primary);
        }

        .dashboard-main {
          margin-left: ${sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'};
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 100vh;
          padding: 24px;
        }

        .main-header {
          background: var(--glass);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: var(--card-shadow);
        }

        .stat-card {
          background: #fff;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(0,0,0,0.02);
          box-shadow: var(--card-shadow);
          transition: transform 0.3s;
        }

        .stat-card:hover { transform: translateY(-5px); }

        .stat-icon-box {
          width: 48px; height: 48px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }

        .bg-warning-soft { background: #fffbeb; color: #d97706; }
        .bg-primary-soft { background: #ecfdf5; color: #059669; }
        .bg-success-soft { background: #f0fdf4; color: #15803d; }
        .bg-info-soft { background: #eff6ff; color: #2563eb; }

        .data-card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.03);
          box-shadow: var(--card-shadow);
          overflow: hidden;
        }

        .card-header-custom {
          padding: 24px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge-pending { background: #fff7ed; color: #c2410c; }
        .badge-approved { background: #f0fdf4; color: #15803d; }
        .badge-rejected { background: #fef2f2; color: #b91c1c; }
        .badge-operational { background: #f0fdf4; color: #15803d; }
        .badge-maintenance { background: #fffbeb; color: #d97706; }

        .table-custom th {
          background: #f8fafc;
          padding: 16px 24px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
        }

        .table-custom td { padding: 16px 24px; vertical-align: middle; border-bottom: 1px solid #f1f5f9; }

        .progress-bar-custom {
          height: 8px;
          border-radius: 10px;
          background: #f1f5f9;
          overflow: hidden;
        }

        .progress-fill { height: 100%; border-radius: 10px; transition: width 1s ease; }

        .user-profile-img {
          width: 40px; height: 40px; border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .dashboard-sidebar { left: -100%; }
          .dashboard-main { margin-left: 0; }
        }
      `}</style>

      <Sidebar />

      <main className="dashboard-main">
        <Header />

        <div className="fade-in">
          {activeTab === 'overview' && (
            <Overview 
              stats={stats} 
              adminRequests={adminRequestsData} 
              inventoryItems={inventoryItems} 
            />
          )}

          {activeTab === 'requests' && (
            <AdminRequests adminRequests={adminRequestsData} />
          )}

          {activeTab === 'inventory' && (
            <Inventory inventoryItems={inventoryItems} />
          )}

          {activeTab === 'store' && (
            <StoreManagement stores={storesData} />
          )}

          {activeTab === 'performance' && (
            <PerformanceMetrics />
          )}

          {activeTab === 'settings' && (
            <div className="data-card p-5 text-center">
              <h4 className="fw-bold mb-3">Partner Settings</h4>
              <p className="text-muted">Configuration options for your logistics partnership will appear here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PartnerDashboard;