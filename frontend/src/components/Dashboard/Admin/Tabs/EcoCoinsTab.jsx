import React from 'react';
import { Coins, TrendingUp } from 'lucide-react';

const EcoCoinsTab = () => {
  return (
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
  );
};

export default EcoCoinsTab;
