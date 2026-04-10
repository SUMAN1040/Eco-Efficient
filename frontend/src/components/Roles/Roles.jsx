import React from 'react';
import './Roles.css';
import { User, ShieldCheck, Factory } from 'lucide-react';

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
    cta: "Join Now"
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
  return (
    <section id="roles" className="roles-nature-section">
      <div className="container">
        <div className="text-center reveal header-block-organic">
          <div className="tag-label">User Ecosystem</div>
          <h2 className="headline-lg nature-title">Built for <span className="text-secondary text-italic">Everyone</span></h2>
          <p className="subtitle-nature">Scalable solutions tailored for every stakeholder in the sustainability lifecycle.</p>
        </div>

        <div className="grid grid-3 roles-nature-grid">
          {roles.map((role, index) => (
            <div 
              key={index} 
              className="role-card-nature reveal organic-lift" 
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="role-icon-box-nature organic-bg">
                <role.icon className="role-icon" size={36} strokeWidth={1.5} />
              </div>
              <h3 className="headline-md nature-title-sm">{role.type}</h3>
              <p className="body-sm">{role.description}</p>
              
              <ul className="role-features-nature">
                {role.features.map((feature, fIndex) => (
                  <li key={fIndex}>
                    <div className="leaf-dot" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`btn pill ${index === 0 ? 'btn-primary' : 'btn-outline'} btn-full magnetic`}>
                {role.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;
