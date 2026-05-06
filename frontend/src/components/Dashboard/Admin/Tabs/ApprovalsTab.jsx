import React from 'react';
import { CheckSquare, CheckCircle2, XCircle } from 'lucide-react';

const ApprovalsTab = () => {
  return (
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
  );
};

export default ApprovalsTab;
