import React, { useState, useEffect } from 'react';
import { 
  User, 
  Coins, 
  Truck, 
  Handshake, 
  CheckSquare, 
  Calendar, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  BarChart3,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Leaf
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Sustainability',
    email: 'admin@cityofspringfield.gov',
    role: 'City Manager / Admin',
    organization: 'City of Springfield',
    city: 'Springfield, IL',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    joinedDate: 'Jan 2024'
  });

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
            <SidebarItem id="settings" icon={<Settings size={20} />} label="Settings" />
            <div className="sidebar-item text-danger">
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
          {activeTab === 'overview' && (
            <div className="fade-in">
              <div className="welcome-section mb-4">
                <h3 className="fw-bold text-dark">Welcome back, {userProfile.name.split(' ')[0]}! 👋</h3>
                <p className="text-muted">Here's what's happening in {userProfile.city} today.</p>
              </div>

              {/* Stats Grid */}
              <div className="row g-4 mb-4">
                {stats.map((stat, i) => (
                  <div className="col-12 col-sm-6 col-xl-3" key={i}>
                    <div className="stat-card shadow-sm h-100">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="stat-icon-box">{stat.icon}</div>
                        <span className={`badge ${stat.change.startsWith('+') ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="fw-bold mb-1">{stat.value}</h3>
                      <p className="text-muted mb-0 small">{stat.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-4">
                <div className="col-lg-8">
                  <div className="dashboard-card shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0">Upcoming Waste Pickups</h5>
                      <button className="btn btn-sm btn-outline-primary rounded-pill px-3">View All</button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover align-middle custom-table">
                        <thead className="table-light">
                          <tr>
                            <th>User</th>
                            <th>Type</th>
                            <th>Weight</th>
                            <th>Status</th>
                            <th>Schedule</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pickups.map((p, i) => (
                            <tr key={i}>
                              <td>
                                <div className="fw-bold">{p.user}</div>
                                <small className="text-muted">{p.id}</small>
                              </td>
                              <td><span className="badge bg-light text-dark border">{p.type}</span></td>
                              <td>{p.weight}</td>
                              <td>
                                <span className={`status-pill ${p.status.toLowerCase().replace(' ', '-')}`}>
                                  {p.status}
                                </span>
                              </td>
                              <td>
                                <div className="small fw-medium">{p.date}</div>
                                <div className="small text-muted">{p.time}</div>
                              </td>
                              <td><button className="btn-icon-sm"><Settings size={14} /></button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="dashboard-card shadow-sm h-100">
                    <h5 className="fw-bold mb-4">Eco Coin Distribution</h5>
                    <div className="chart-placeholder d-flex flex-column align-items-center justify-content-center p-5 text-center">
                      <div className="mb-3"><BarChart3 size={48} className="text-primary opacity-25" /></div>
                      <p className="text-muted small">Impact visualization of coins earned vs spent in your region.</p>
                    </div>
                    <hr />
                    <div className="mt-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="small text-muted">Recycling Rewards</span>
                        <span className="small fw-bold">75%</span>
                      </div>
                      <div className="progress mb-3" style={{ height: '8px' }}>
                        <div className="progress-bar bg-success" style={{ width: '75%' }}></div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="small text-muted">Voucher Redemptions</span>
                        <span className="small fw-bold">25%</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div className="progress-bar bg-warning" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="fade-in">
              <div className="dashboard-card shadow-sm">
                <div className="profile-header-banner"></div>
                <div className="profile-content px-4">
                  <div className="d-flex flex-column flex-md-row align-items-end gap-4 mb-4" style={{ marginTop: '-60px' }}>
                    <div className="position-relative">
                      <img src={userProfile.photo} alt="Large Profile" className="profile-img-lg shadow-lg border border-4 border-white" />
                      <button className="btn-edit-photo shadow-sm"><User size={16} /></button>
                    </div>
                    <div className="flex-grow-1 pb-2">
                      <h2 className="fw-bold mb-1 text-dark">{userProfile.name}</h2>
                      <div className="d-flex flex-wrap gap-3 text-muted fw-medium">
                        <span className="d-flex align-items-center gap-1"><Building size={16} /> {userProfile.organization}</span>
                        <span className="d-flex align-items-center gap-1"><MapPin size={16} /> {userProfile.city}</span>
                        <span className="d-flex align-items-center gap-1"><Calendar size={16} /> Joined {userProfile.joinedDate}</span>
                      </div>
                    </div>
                    <div className="pb-2">
                      <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">Edit Profile</button>
                    </div>
                  </div>

                  <hr className="my-5" />

                  <div className="row g-5">
                    <div className="col-md-7">
                      <h5 className="fw-bold mb-4">Official Information</h5>
                      <div className="row g-4">
                        <div className="col-sm-6">
                          <label className="small text-muted mb-1">Official Email</label>
                          <p className="fw-bold">{userProfile.email}</p>
                        </div>
                        <div className="col-sm-6">
                          <label className="small text-muted mb-1">Administrative Role</label>
                          <p className="fw-bold">{userProfile.role}</p>
                        </div>
                        <div className="col-sm-6">
                          <label className="small text-muted mb-1">Organization</label>
                          <p className="fw-bold">{userProfile.organization}</p>
                        </div>
                        <div className="col-sm-6">
                          <label className="small text-muted mb-1">Verified Location</label>
                          <p className="fw-bold">{userProfile.city}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="p-4 rounded-4 bg-light border">
                        <h6 className="fw-bold mb-3 d-flex align-items-center gap-2"><ShieldCheck size={18} className="text-primary" /> Verification Status</h6>
                        <p className="small text-muted mb-4">Your administrative credentials have been verified by the Eco-Efficient Governance protocol.</p>
                        <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border">
                          <CheckCircle2 className="text-success" size={32} />
                          <div>
                            <div className="fw-bold small">Fully Verified</div>
                            <div className="text-muted" style={{ fontSize: '0.7rem' }}>Authorized on Feb 12, 2024</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eco-coins' && (
            <div className="fade-in">
              <div className="dashboard-card shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div>
                    <h4 className="fw-bold text-dark mb-1">Eco Coin Management</h4>
                    <p className="text-muted mb-0">Monitor and regulate coin flow in your jurisdiction.</p>
                  </div>
                  <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold">Set Reward Rates</button>
                </div>

                <div className="row g-4 mb-5">
                  <div className="col-md-6">
                    <div className="p-4 rounded-4 border bg-gradient-coins text-white h-100">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className="opacity-75">Circulation in Springfield</span>
                        <Coins size={24} />
                      </div>
                      <h1 className="display-5 fw-bold mb-2">1,240,500</h1>
                      <div className="d-flex align-items-center gap-2 small opacity-75">
                        <TrendingUp size={16} /> 12.5% increase this month
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="p-3 rounded-4 border bg-white h-100">
                          <small className="text-muted d-block mb-2">Distributed</small>
                          <h4 className="fw-bold mb-0 text-success">850K</h4>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 rounded-4 border bg-white h-100">
                          <small className="text-muted d-block mb-2">Redeemed</small>
                          <h4 className="fw-bold mb-0 text-warning">390K</h4>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 rounded-4 border bg-white h-100">
                          <small className="text-muted d-block mb-2">Pending</small>
                          <h4 className="fw-bold mb-0 text-primary">12K</h4>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 rounded-4 border bg-white h-100">
                          <small className="text-muted d-block mb-2">Efficiency</small>
                          <h4 className="fw-bold mb-0 text-info">94%</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h6 className="fw-bold mb-3">Recent Transactions</h6>
                <div className="table-responsive">
                  <table className="table table-hover align-middle custom-table">
                    <thead className="table-light">
                      <tr>
                        <th>Transaction ID</th>
                        <th>User</th>
                        <th>Activity</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <tr key={i}>
                          <td className="small text-muted font-monospace">TRX-77823901</td>
                          <td>User_{i+1}02</td>
                          <td>Plastic Recycling (Verified)</td>
                          <td className="fw-bold text-success">+ 250 EC</td>
                          <td className="small text-muted">May 09, 2024</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="fade-in">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-dark mb-1">Partner Connections</h4>
                  <p className="text-muted mb-0">Manage logistics and processing partner relationships.</p>
                </div>
                <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2">
                  <Users size={18} /> Find New Partners
                </button>
              </div>

              <div className="row g-4">
                {partners.map((partner) => (
                  <div className="col-md-6 col-xl-4" key={partner.id}>
                    <div className="dashboard-card shadow-sm h-100 partner-card">
                      <div className="d-flex justify-content-between align-items-start mb-4">
                        <div className="partner-logo-box">
                          <Building size={24} className="text-primary" />
                        </div>
                        <span className={`status-pill ${partner.status.toLowerCase()}`}>
                          {partner.status}
                        </span>
                      </div>
                      <h5 className="fw-bold mb-1">{partner.name}</h5>
                      <p className="text-muted small mb-4">{partner.type}</p>
                      
                      <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 mb-4">
                        <div className="text-center flex-grow-1">
                          <small className="text-muted d-block mb-1">Impact</small>
                          <span className="fw-bold">{partner.impact}</span>
                        </div>
                        <div className="vr mx-2"></div>
                        <div className="text-center flex-grow-1">
                          <small className="text-muted d-block mb-1">Trips</small>
                          <span className="fw-bold">142</span>
                        </div>
                      </div>

                      <div className="d-grid gap-2">
                        <button className="btn btn-outline-primary btn-sm rounded-pill fw-bold">View Contracts</button>
                        <button className="btn btn-light btn-sm rounded-pill fw-bold text-danger">Disconnect</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pickups' && (
            <div className="fade-in">
              <div className="dashboard-card shadow-sm">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 mb-5">
                  <div>
                    <h4 className="fw-bold text-dark mb-1">Waste Pickups & Schedule</h4>
                    <p className="text-muted mb-0">Coordinate and monitor active collection routes.</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-light rounded-pill px-4 fw-bold d-flex align-items-center gap-2"><Calendar size={18} /> Calendar View</button>
                    <button className="btn btn-primary rounded-pill px-4 fw-bold d-flex align-items-center gap-2"><Truck size={18} /> New Route</button>
                  </div>
                </div>

                <div className="row g-4 mb-5">
                  <div className="col-md-3 col-6">
                    <div className="text-center p-3 bg-light rounded-4">
                      <h3 className="fw-bold mb-0 text-primary">12</h3>
                      <small className="text-muted">Today's Pickups</small>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="text-center p-3 bg-light rounded-4">
                      <h3 className="fw-bold mb-0 text-success">08</h3>
                      <small className="text-muted">Completed</small>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="text-center p-3 bg-light rounded-4">
                      <h3 className="fw-bold mb-0 text-warning">03</h3>
                      <small className="text-muted">In Progress</small>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="text-center p-3 bg-light rounded-4">
                      <h3 className="fw-bold mb-0 text-danger">01</h3>
                      <small className="text-muted">Delayed</small>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle custom-table">
                    <thead className="table-light">
                      <tr>
                        <th>Pickup Detail</th>
                        <th>Assigned Partner</th>
                        <th>Location</th>
                        <th>ETA</th>
                        <th>Status</th>
                        <th>Live Track</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((_, i) => (
                        <tr key={i}>
                          <td>
                            <div className="fw-bold">Pickup #{i+8421}</div>
                            <small className="text-muted">Organic Waste • 25kg</small>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="sm-avatar bg-primary-subtle text-primary">PT</div>
                              <span className="small fw-medium">SwiftLogistics</span>
                            </div>
                          </td>
                          <td><span className="small d-flex align-items-center gap-1"><MapPin size={12} /> Springfield Hub</span></td>
                          <td><span className="small d-flex align-items-center gap-1"><Clock size={12} /> 12:30 PM</span></td>
                          <td><span className="status-pill in-transit">In Transit</span></td>
                          <td><button className="btn btn-sm btn-light rounded-pill px-3 fw-bold small text-primary">Map</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="fade-in">
              <div className="dashboard-card shadow-sm">
                <div className="mb-5">
                  <h4 className="fw-bold text-dark mb-1">Waste Accept Management</h4>
                  <p className="text-muted mb-0">Verify and approve incoming waste batches from partners.</p>
                </div>

                <div className="row g-4 mb-4">
                  {[1, 2, 3].map((_, i) => (
                    <div className="col-12" key={i}>
                      <div className="p-4 rounded-4 border bg-white shadow-sm hover-lift">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
                          <div className="d-flex align-items-center gap-4">
                            <div className="p-3 bg-primary-subtle text-primary rounded-4">
                              <CheckSquare size={32} />
                            </div>
                            <div>
                              <h5 className="fw-bold mb-1">Batch #B-9921 from SwiftLogistics</h5>
                              <div className="d-flex gap-3 small text-muted fw-medium">
                                <span>Plastic (Type 2)</span>
                                <span>•</span>
                                <span>450 kg</span>
                                <span>•</span>
                                <span>Arrived 2h ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            <button className="btn btn-light rounded-pill px-4 fw-bold text-danger d-flex align-items-center gap-2">
                              <XCircle size={18} /> Reject
                            </button>
                            <button className="btn btn-success rounded-pill px-4 fw-bold text-white d-flex align-items-center gap-2">
                              <CheckCircle2 size={18} /> Approve & Grant Coins
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

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
