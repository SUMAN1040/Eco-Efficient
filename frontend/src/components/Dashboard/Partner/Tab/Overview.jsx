import React from 'react';
import { Package, MoreVertical, Plus } from 'lucide-react';

const Overview = ({ stats, adminRequests, inventoryItems }) => {
  return (
    <>
      {/* Stats Grid */}
      <div className="row g-4 mb-5">
        {stats.map((stat, i) => (
          <div className="col-12 col-sm-6 col-xl-3" key={i}>
            <div className="stat-card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className={`stat-icon-box bg-${stat.color}-soft`}>
                  {stat.icon}
                </div>
                <span className={`small fw-bold ${stat.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="fw-bold mb-1">{stat.value}</h3>
              <p className="text-muted small mb-0 fw-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Admin Requests Status */}
        <div className="col-12 col-xl-8">
          <div className="data-card">
            <div className="card-header-custom">
              <h6 className="mb-0 fw-bold">Recent Admin Requests</h6>
              <button className="btn btn-sm btn-light rounded-pill px-3 fw-bold">View All</button>
            </div>
            <div className="table-responsive">
              <table className="table table-custom mb-0">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {adminRequests.map((req, i) => (
                    <tr key={i}>
                      <td className="fw-bold text-dark small">{req.id}</td>
                      <td><span className="small fw-medium text-muted">{req.type}</span></td>
                      <td><span className="small text-muted">{req.date}</span></td>
                      <td>
                        <span className={`status-badge badge-${req.status.toLowerCase()}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-link text-muted"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Inventory Snapshot */}
        <div className="col-12 col-xl-4">
          <div className="data-card">
            <div className="card-header-custom">
              <h6 className="mb-0 fw-bold">Inventory Capacity</h6>
              <Plus size={18} className="text-primary cursor-pointer" />
            </div>
            <div className="p-4">
              {inventoryItems.map((item, i) => (
                <div className="mb-4 last-child-mb-0" key={i}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-bold text-dark">{item.category}</span>
                    <span className="small fw-bold text-primary">{item.capacity}</span>
                  </div>
                  <div className="progress-bar-custom mb-1">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: item.capacity, 
                        background: parseInt(item.capacity) > 70 ? '#ef4444' : '#10b981' 
                      }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted" style={{ fontSize: '10px' }}>{item.quantity} stored</small>
                    <small className="text-muted" style={{ fontSize: '10px' }}>{item.lastUpdated}</small>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary w-100 rounded-pill py-2 mt-3 fw-bold small">
                Optimize Inventory
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
