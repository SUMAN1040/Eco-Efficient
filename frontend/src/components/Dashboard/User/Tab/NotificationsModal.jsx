import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';

const NotificationsModal = ({ show, onClose }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Pickup Scheduled', time: 'Just now', message: 'Your bulk industrial collection is confirmed for Oct 12.', unread: true },
    { id: 2, title: 'Points Credited', time: '2 hrs ago', message: 'You earned 150 points for your last paper recycling batch.', unread: false }
  ]);

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
          <div className="modal-header border-0 bg-light p-4 d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-black tracking-tighter d-flex align-items-center gap-2 mb-0">
              <Bell size={20} className="text-success" />
              Notifications
            </h5>
            <button type="button" className="btn btn-link text-dark p-0 ms-auto" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="modal-body p-0">
            {notifications.length > 0 ? (
              <div className="list-group list-group-flush">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`list-group-item p-4 border-0 border-bottom ${notif.unread ? 'bg-success bg-opacity-10' : ''}`}>
                    <div className="d-flex w-100 justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 fw-bold text-dark">{notif.title}</h6>
                      <small className={notif.unread ? 'text-success fw-bold' : 'text-muted'}>{notif.time}</small>
                    </div>
                    <p className="mb-0 small text-muted">{notif.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <Bell size={40} className="text-muted opacity-50 mb-3" />
                <h6 className="fw-bold text-dark mb-1">No notifications</h6>
                <p className="small text-muted mb-0">You're all caught up!</p>
              </div>
            )}
          </div>
          <div className="modal-footer border-0 bg-light p-3 d-flex gap-2 justify-content-center">
            {notifications.length > 0 && (
              <button
                className="btn btn-outline-danger rounded-pill px-4 py-2 fw-bold flex-grow-1"
                onClick={() => setNotifications([])}
              >
                Clear All
              </button>
            )}
            <button
              className="btn btn-light text-muted rounded-pill px-4 py-2 fw-bold flex-grow-1"
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
