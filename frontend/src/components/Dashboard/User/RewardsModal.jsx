import React from 'react';
import { Trophy, X, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RewardsModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
          <div className="modal-header border-0 bg-light p-4 d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-black tracking-tighter d-flex align-items-center gap-2 mb-0">
              <Trophy size={20} className="text-success" />
              Rewards
            </h5>
            <button type="button" className="btn btn-link text-dark p-0 ms-auto" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="modal-body p-5 bg-white text-center">
            <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3" style={{ width: '60px', height: '60px' }}>
              <Gift size={24} className="text-muted opacity-50" />
            </div>
            <h6 className="fw-bold text-dark mb-1">No rewards yet</h6>
            <p className="small text-muted mb-0">Your earned perks and vouchers will appear here.</p>
          </div>
          <div className="modal-footer border-0 bg-light p-3 justify-content-center">
            <button
              className="btn btn-success rounded-pill px-4 py-2 fw-bold w-100"
              onClick={() => {
                onClose();
                navigate('/dashboard/redeem');
              }}
            >
              Explore Rewards Matrix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsModal;
