import React from 'react';
import { Settings, BarChart3 } from 'lucide-react';

const OverviewTab = ({ userProfile, stats, pickups }) => {
  return (
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
  );
};

export default OverviewTab;
