import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, delay = '0s' }) => {
  return (
    <div className="feature-card reveal nature-paper" style={{ transitionDelay: delay }}>
      <div className="feature-icon-wrapper organic-bg">
        <Icon className="feature-icon" size={24} strokeWidth={1.5} />
      </div>
      <h3 className="headline-sm">{title}</h3>
      <p className="body-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
