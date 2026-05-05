import React from 'react';
import { Filter, Plus } from 'lucide-react';

const AdminRequests = ({ adminRequests }) => {
  return (
    <div className="data-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-bold mb-0">All Administrative Requests</h6>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
            <Filter size={14} /> Filter
          </button>
          <button className="btn btn-primary btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
            <Plus size={14} /> New Request
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminRequests.map((req, i) => (
              <tr key={i}>
                <td className="fw-bold small">{req.id}</td>
                <td><span className="small text-muted">{req.type}</span></td>
                <td>
                  <span className={`badge rounded-pill ${req.priority === 'High' ? 'bg-danger-subtle text-danger' : 'bg-info-subtle text-info'}`}>
                    {req.priority}
                  </span>
                </td>
                <td><span className="small text-muted">{req.date}</span></td>
                <td>
                  <span className={`status-badge badge-${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-success rounded-pill px-3 py-1 fw-bold small">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequests;
