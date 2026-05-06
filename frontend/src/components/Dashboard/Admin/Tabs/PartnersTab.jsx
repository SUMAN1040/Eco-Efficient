import React from 'react';
import { Users, Building } from 'lucide-react';

const PartnersTab = ({ partners }) => {
  return (
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
  );
};

export default PartnersTab;
