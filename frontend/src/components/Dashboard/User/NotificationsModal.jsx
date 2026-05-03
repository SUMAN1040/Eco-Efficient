import React from 'react';
import { Bell, X } from 'lucide-react';

const NotificationsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
          <div className="modal-header border-0 bg-light p-4">
            <h5 className="modal-title fw-black tracking-tighter d-flex align-items-center gap-2">
              <Bell size={20} className="text-success" />
              Notifications
            </h5>
            <button type="button" className="btn btn-link text-dark p-0" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="modal-body p-0">
            <div className="list-group list-group-flush">
              <div className="list-group-item p-4 border-0 border-bottom bg-success bg-opacity-10">
                <div className="d-flex w-100 justify-content-between align-items-center mb-1">
                  <h6 className="mb-0 fw-bold text-dark">Pickup Scheduled</h6>
                  <small className="text-success fw-bold">Just now</small>
                </div>
                <p className="mb-0 small text-muted">Your bulk industrial collection is confirmed for Oct 12.</p>
              </div>
              <div className="list-group-item p-4 border-0 border-bottom">
                <div className="d-flex w-100 justify-content-between align-items-center mb-1">
                  <h6 className="mb-0 fw-bold text-dark">Points Credited</h6>
                  <small className="text-muted">2 hrs ago</small>
                </div>
                <p className="mb-0 small text-muted">You earned 150 points for your last paper recycling batch.</p>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 bg-light p-3 justify-content-center">
            <button
              className="btn btn-light text-muted rounded-pill px-4 py-2 fw-bold w-100"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
