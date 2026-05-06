import React from 'react';
import { Calendar, Truck, MapPin, Clock } from 'lucide-react';

const PickupsTab = () => {
  return (
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
  );
};

export default PickupsTab;
