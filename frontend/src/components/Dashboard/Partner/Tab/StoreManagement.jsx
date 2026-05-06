import React from 'react';
import { Store, Plus, MapPin, Settings } from 'lucide-react';

const StoreManagement = ({ stores }) => {
  return (
    <div className="data-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 px-2">
        <div>
          <h6 className="fw-bold mb-1">Sorting Hubs & Collection Points</h6>
          <p className="small text-muted mb-0">Manage your physical assets and on-ground teams</p>
        </div>
        <button className="btn btn-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2">
          <Plus size={16} /> Add New Hub
        </button>
      </div>
      <div className="row g-4 mt-2">
        {stores.map((store, i) => (
          <div className="col-12 col-md-6 col-lg-4" key={i}>
            <div className="p-4 rounded-5 border-0 shadow-sm" style={{ background: '#fcfdfd', border: '1px solid #f1f5f9' }}>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="rounded-4 p-3 bg-white shadow-sm text-primary">
                  <Store size={24} />
                </div>
                <span className={`status-badge badge-${store.status.toLowerCase()}`}>
                  {store.status}
                </span>
              </div>
              <h5 className="fw-bold text-dark mb-1">{store.name}</h5>
              <p className="small text-muted mb-4 d-flex align-items-center gap-1">
                <MapPin size={12} /> {store.location}
              </p>
              
              <div className="p-3 rounded-4 bg-light mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <small className="fw-bold text-muted">Manager</small>
                  <small className="fw-bold text-dark">{store.manager}</small>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <small className="fw-bold text-muted">Staff Strength</small>
                  <small className="fw-bold text-dark">{store.staff} Members</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="fw-bold text-muted">Last Audit</small>
                  <small className="fw-bold text-dark">{store.lastAudit}</small>
                </div>
              </div>
              
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm flex-grow-1 rounded-pill fw-bold">Manage Hub</button>
                <button className="btn btn-light btn-sm rounded-circle p-2"><Settings size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreManagement;
