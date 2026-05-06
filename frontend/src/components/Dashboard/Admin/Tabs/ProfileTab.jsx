import React from 'react';
import { User, Building, MapPin, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ProfileTab = ({ userProfile }) => {
  return (
    <div className="fade-in">
      <div className="dashboard-card shadow-sm">
        <div className="profile-header-banner"></div>
        <div className="profile-content px-4">
          <div className="d-flex flex-column flex-md-row align-items-end gap-4 mb-4" style={{ marginTop: '-60px' }}>
            <div className="position-relative">
              <img src={userProfile.photo} alt="Large Profile" className="profile-img-lg shadow-lg border border-4 border-white" />
              <button className="btn-edit-photo shadow-sm"><User size={16} /></button>
            </div>
            <div className="flex-grow-1 pb-2">
              <h2 className="fw-bold mb-1 text-dark">{userProfile.name}</h2>
              <div className="d-flex flex-wrap gap-3 text-muted fw-medium">
                <span className="d-flex align-items-center gap-1"><Building size={16} /> {userProfile.organization}</span>
                <span className="d-flex align-items-center gap-1"><MapPin size={16} /> {userProfile.city}</span>
                <span className="d-flex align-items-center gap-1"><Calendar size={16} /> Joined {userProfile.joinedDate}</span>
              </div>
            </div>
            <div className="pb-2">
              <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">Edit Profile</button>
            </div>
          </div>

          <hr className="my-5" />

          <div className="row g-5">
            <div className="col-md-7">
              <h5 className="fw-bold mb-4">Official Information</h5>
              <div className="row g-4">
                <div className="col-sm-6">
                  <label className="small text-muted mb-1">Official Email</label>
                  <p className="fw-bold">{userProfile.email}</p>
                </div>
                <div className="col-sm-6">
                  <label className="small text-muted mb-1">Administrative Role</label>
                  <p className="fw-bold">{userProfile.role}</p>
                </div>
                <div className="col-sm-6">
                  <label className="small text-muted mb-1">Organization</label>
                  <p className="fw-bold">{userProfile.organization}</p>
                </div>
                <div className="col-sm-6">
                  <label className="small text-muted mb-1">Verified Location</label>
                  <p className="fw-bold">{userProfile.city}</p>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="p-4 rounded-4 bg-light border">
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2"><ShieldCheck size={18} className="text-primary" /> Verification Status</h6>
                <p className="small text-muted mb-4">Your administrative credentials have been verified by the Eco-Efficient Governance protocol.</p>
                <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border">
                  <CheckCircle2 className="text-success" size={32} />
                  <div>
                    <div className="fw-bold small">Fully Verified</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>Authorized on Feb 12, 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
