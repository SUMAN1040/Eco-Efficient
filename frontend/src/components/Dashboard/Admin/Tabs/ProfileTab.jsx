import React from 'react';
import { Mail, ShieldCheck, CheckCircle2, Building2, MapPin, BadgeCheck, Phone } from 'lucide-react';

const ProfileTab = ({ userProfile, onEditClick }) => {
  return (
    <div className="fade-in">

      {/* ── Header Card ── */}
      <div className="card border-0 shadow-sm mb-4 overflow-hidden" style={{ borderRadius: '16px' }}>
        {/* Green Banner */}
        <div
          className="d-flex align-items-end justify-content-end px-4 pb-3"
          style={{
            background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 60%, #40916c 100%)',
            height: '130px',
          }}
        >
          {userProfile.adminId && userProfile.adminId !== 'N/A' && (
            <span className="badge rounded-pill fw-semibold px-3 py-2"
              style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.35)',
                color: '#fff',
                fontSize: '0.78rem',
                letterSpacing: '0.05em',
                backdropFilter: 'blur(6px)'
              }}>
              🪪 {userProfile.adminId}
            </span>
          )}
        </div>

        {/* Avatar + Name Row */}
        <div className="card-body px-4 pb-4" style={{ marginTop: '-50px' }}>
          <div className="d-flex align-items-end gap-3 flex-wrap">
            <img
              src={userProfile.photo}
              alt="Profile"
              className="border border-4 border-white shadow"
              style={{
                width: '90px', height: '90px',
                borderRadius: '16px',
                objectFit: 'cover',
                background: '#e8f5e9',
                flexShrink: 0
              }}
            />
            <div className="pb-1">
              <h4 className="fw-bold mb-1 text-dark">{userProfile.name}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="row g-4">

        {/* Official Information */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
            <div className="card-body p-4">
              <h6 className="fw-bold text-uppercase text-muted mb-4" style={{ letterSpacing: '0.07em', fontSize: '0.75rem' }}>
                Official Information
              </h6>
              <div className="row g-3">

                {/* Email */}
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light">
                    <div className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '38px', height: '38px', background: '#e6f4ea' }}>
                      <Mail size={17} color="#2d6a4f" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-muted mb-1" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Official Email</div>
                      <div className="fw-bold text-dark text-truncate" style={{ fontSize: '0.88rem' }}>{userProfile.email || '—'}</div>
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light">
                    <div className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '38px', height: '38px', background: '#e6f4ea' }}>
                      <ShieldCheck size={17} color="#2d6a4f" />
                    </div>
                    <div>
                      <div className="text-muted mb-1" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</div>
                      <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>{userProfile.role || '—'}</div>
                    </div>
                  </div>
                </div>

                {/* Organization */}
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light">
                    <div className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '38px', height: '38px', background: '#e6f4ea' }}>
                      <Building2 size={17} color="#2d6a4f" />
                    </div>
                    <div>
                      <div className="text-muted mb-1" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Organization</div>
                      <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>{userProfile.organization || '—'}</div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light">
                    <div className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '38px', height: '38px', background: '#e6f4ea' }}>
                      <MapPin size={17} color="#2d6a4f" />
                    </div>
                    <div>
                      <div className="text-muted mb-1" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</div>
                      <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>{userProfile.city || '—'}</div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                {userProfile.phone_number && (
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light">
                      <div className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: '38px', height: '38px', background: '#e6f4ea' }}>
                        <Phone size={17} color="#2d6a4f" />
                      </div>
                      <div>
                        <div className="text-muted mb-1" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>{userProfile.phone_number}</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
            <div className="card-body p-4">
              <h6 className="fw-bold text-uppercase text-muted mb-2 d-flex align-items-center gap-2" style={{ letterSpacing: '0.07em', fontSize: '0.75rem' }}>
                <ShieldCheck size={16} color="#1565c0" /> Verification Status
              </h6>
              <p className="text-muted mb-4" style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                Your administrative credentials have been verified by the Eco-Efficient Governance protocol.
              </p>

              <div className="d-flex align-items-center gap-3 p-3 rounded-3 border border-success border-opacity-25"
                style={{ background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)' }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{
                    width: '46px', height: '46px',
                    background: 'linear-gradient(135deg, #2e7d32, #43a047)',
                    boxShadow: '0 2px 10px rgba(46,125,50,0.3)'
                  }}>
                  <CheckCircle2 size={22} color="#fff" />
                </div>
                <div>
                  <div className="fw-bold" style={{ color: '#1b5e20', fontSize: '0.92rem' }}>Fully Verified</div>
                  <div style={{ fontSize: '0.73rem', color: '#388e3c', marginTop: '2px' }}>
                    Authorized on {userProfile.joinedDate}
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