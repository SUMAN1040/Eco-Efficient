import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, badge, delay = '0s', className = "" }) => {
  return (
    <div className={`feature-card reveal ${className}`} style={{ transitionDelay: delay }}>
      <div className="feature-card-accent" />
      <div className="feature-card-content">
        <div className="feature-icon-wrapper professional-moss">
          <Icon className="feature-icon" size={24} strokeWidth={1.5} />
        </div>
        <div className="feature-body">
          <div className="feature-header-inline">
            <h3 className="feature-title">{title}</h3>
            {badge && <span className="feature-badge">{badge}</span>}
          </div>
          <p className="feature-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
