import React, { useState } from 'react';
import { Trophy, X, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RewardsModal = ({ show, onClose }) => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState([
    { id: 1, title: '10% Off EcoStore', description: 'Valid on all reusable products', expiry: 'Expires in 5 days' },
    { id: 2, title: 'Free Pickup Voucher', description: 'One-time free heavy waste pickup', expiry: 'Expires in 12 days' }
  ]);

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
          <div className={`modal-body ${rewards.length > 0 ? 'p-0' : 'p-5 text-center'} bg-white`}>
            {rewards.length > 0 ? (
              <div className="list-group list-group-flush">
                {rewards.map(reward => (
                  <div key={reward.id} className="list-group-item p-4 border-0 border-bottom">
                    <div className="d-flex w-100 justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                        <Gift size={16} className="text-success" />
                        {reward.title}
                      </h6>
                      <small className="text-warning fw-bold">{reward.expiry}</small>
                    </div>
                    <p className="mb-0 small text-muted ps-4">{reward.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3" style={{ width: '60px', height: '60px' }}>
                  <Gift size={24} className="text-muted opacity-50" />
                </div>
                <h6 className="fw-bold text-dark mb-1">No rewards yet</h6>
                <p className="small text-muted mb-0">Your earned perks and vouchers will appear here.</p>
              </>
            )}
          </div>
          <div className="modal-footer border-0 bg-light p-3 d-flex gap-2 justify-content-center flex-wrap">
            <button
              className="btn btn-success rounded-pill px-4 py-2 fw-bold flex-grow-1"
              onClick={() => {
                onClose();
                navigate('/dashboard/redeem');
              }}
            >
              Explore Matrix
            </button>
            {rewards.length > 0 && (
              <button
                className="btn btn-outline-danger rounded-pill px-4 py-2 fw-bold flex-grow-1"
                onClick={() => setRewards([])}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsModal;
