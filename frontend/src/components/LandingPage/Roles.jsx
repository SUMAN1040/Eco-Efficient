import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ShieldCheck, Factory } from 'lucide-react';
import AdminRequestForm from './AdminRequestForm';
import PartnerRequestForm from './PartnerRequestForm';

const roles = [
  {
    type: "User",
    icon: User,
    description: "For individuals and households tracking their impact.",
    features: [
      "Scan waste with AI",
      "Track personal footprint",
      "Earn and spend Eco Coins",
      "Join community challenges"
    ],
    cta: "Join Now",
    path: "/auth"
  },
  {
    type: "Admin",
    icon: ShieldCheck,
    description: "For city managers and sustainability officers.",
    features: [
      "Manage city ecosystems",
      "Analyze waste data metrics",
      "Configure collection points",
      "Monitor system health"
    ],
    cta: "Dashboard Demo"
  },
  {
    type: "Partner",
    icon: Factory,
    description: "For recycling centers and logistics companies.",
    features: [
      "Optimize collection routes",
      "Receive sorted waste alerts",
      "Inventory management",
      "Performance reporting"
    ],
    cta: "Partner With Us"
  }
];

const Roles = () => {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);

  return (
    <section id="roles" className="roles-nature-section position-relative" style={{ backgroundColor: 'var(--surface-low)', padding: '100px 0' }}>
      <div className="container">
        <div className="text-center reveal header-block-organic mx-auto" style={{ maxWidth: '800px', marginBottom: '50px' }}>
          <div className="platform-tag d-inline-block px-3 py-1 mb-4 rounded text-success fw-bold text-uppercase" style={{ background: 'rgba(45, 74, 34, 0.04)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
            User Ecosystem
          </div>
          <h2 className="display-5 fw-bold text-dark mb-4" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Built for <span className="text-secondary fst-italic">Everyone</span>
          </h2>
          <p className="text-muted mx-auto" style={{ fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '600px' }}>
            Scalable solutions tailored for every stakeholder in the sustainability lifecycle.
          </p>
        </div>

        <div className="row g-4 roles-nature-grid">
          {roles.map((role, index) => (
            <div className="col-12 col-md-6 col-lg-4 role-column" key={index}>
              <div 
                className="role-card-nature reveal organic-lift h-100 bg-white" 
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="role-icon-box-nature">
                  <role.icon className="role-icon" size={36} strokeWidth={1.5} />
                </div>
                <h3 className="fw-bold mb-3" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{role.type}</h3>
                <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{role.description}</p>
                
                <ul className="role-features-nature list-unstyled p-0 m-0 mb-5 d-flex flex-column gap-3 flex-grow-1">
                  {role.features.map((feature, fIndex) => (
                    <li key={fIndex} className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '0.9rem' }}>
                      <div className="leaf-dot rounded-circle flex-shrink-0" style={{ width: '6px', height: '6px', background: 'var(--secondary)' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {role.path ? (
                  <Link to={role.path} className={`btn w-100 rounded-pill ${index === 0 ? 'btn-primary text-white' : 'btn-outline-success'} magnetic text-center py-2 fw-bold`}>
                    {role.cta}
                  </Link>
                ) : (
                  <button 
                    onClick={() => {
                      if (role.type === "Admin") setShowAdminForm(true);
                      if (role.type === "Partner") setShowPartnerForm(true);
                    }}
                    className={`btn w-100 rounded-pill ${index === 0 ? 'btn-primary text-white' : 'btn-outline-success'} magnetic py-2 fw-bold`}
                  >
                    {role.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdminForm && <AdminRequestForm onClose={() => setShowAdminForm(false)} />}
      {showPartnerForm && <PartnerRequestForm onClose={() => setShowPartnerForm(false)} />}

      <style>{`
        /* Desktop Card Hover Effects */
        .role-card-nature {
          padding: 48px; border-radius: var(--radius-lg); border: 1px solid rgba(45, 74, 34, 0.05);
          display: flex; flex-direction: column; transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 4px 12px rgba(45, 74, 34, 0.03);
        }
        .role-card-nature:hover { transform: translateY(-10px); box-shadow: 0 20px 48px rgba(45, 74, 34, 0.12); }
        
        .role-icon-box-nature {
          width: 72px; height: 72px; background: rgba(45, 74, 34, 0.05); color: var(--primary);
          border-radius: 20px; display: flex; align-items: center; justify-content: center;
          margin-bottom: 32px; transition: all 0.4s ease;
        }
        .role-card-nature:hover .role-icon-box-nature { background: var(--primary); color: white; transform: scale(1.1); }
        
        /* Mobile Horizontal Scroll */
        @media (max-width: 1024px) {
          .roles-nature-section { padding: 80px 0 !important; }
          .roles-nature-grid {
            flex-wrap: nowrap !important; overflow-x: auto; scroll-snap-type: x mandatory;
            padding-bottom: 24px; scroll-behavior: smooth; -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .roles-nature-grid::-webkit-scrollbar { display: none; }
          .role-column { flex: 0 0 55%; scroll-snap-align: center; }
          .role-card-nature { padding: 40px 32px; }
        }
        @media (max-width: 768px) {
          .role-column { flex: 0 0 85%; }
          .role-card-nature { padding: 32px 24px; }
        }
      `}</style>
    </section>
  );
};

export default Roles;
