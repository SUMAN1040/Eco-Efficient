import React from 'react';
import { TrendingUp } from 'lucide-react';

const PerformanceMetrics = () => {
  return (
    <div className="data-card p-5 text-center">
      <div className="rounded-circle bg-info-soft mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
        <TrendingUp size={48} />
      </div>
      <h4 className="fw-bold mb-3">Efficiency Metrics</h4>
      <p className="text-muted mb-5 mx-auto" style={{ maxWidth: '500px' }}>
        Your operational efficiency is currently 12% higher than the regional average. 
        Maintain this performance to earn additional Eco-Incentives.
      </p>
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div className="p-4 rounded-4 bg-light">
            <h5 className="fw-bold mb-1">98.2%</h5>
            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Pickup Reliability</small>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="p-4 rounded-4 bg-light">
            <h5 className="fw-bold mb-1">1.4h</h5>
            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Avg Processing Time</small>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="p-4 rounded-4 bg-light">
            <h5 className="fw-bold mb-1">0.02%</h5>
            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Contamination Rate</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
