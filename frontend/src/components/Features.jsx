import React from 'react';
import FeatureCard from './FeatureCard';
import { Scan, BarChart3, Coins, Users, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    icon: Scan,
    title: "AI Waste Scanner",
    description: "Instantly identify waste types and get sorting instructions using our advanced computer vision AI."
  },
  {
    icon: BarChart3,
    title: "Real-time Tracking",
    description: "Monitor your waste output and environmental impact through interactive dashboards and real-time data."
  },
  {
    icon: Coins,
    title: "Eco Coins Rewards",
    description: "Earn Eco Coins for every successful recycling action. Redeem them for discounts at partner brands."
  },
  {
    icon: Users,
    title: "Partner Network",
    description: "Connect directly with local recycling centers and waste management companies for a seamless circular economy."
  },
  {
    icon: Zap,
    title: "Smart Logistics",
    description: "Optimized collection routes using prediction algorithms that reduce carbon footprint by up to 40%."
  },
  {
    icon: ShieldCheck,
    title: "Certified Impact",
    description: "Blockchain-verified certificates for CSR and environmental reporting that meet global ESG standards."
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section-nature">
      <div className="container">
        <div className="text-center reveal header-block-organic">
          <div className="tag-label">Platform Core</div>
          <h2 className="headline-lg nature-title">Everything you need for <span className="text-accent underline-clay">Smart Sustainability</span></h2>
          <p className="subtitle-nature">Powerful tools built into one unified ecosystem to transform how we manage global resources.</p>
        </div>
        
        <div className="grid grid-3 features-grid-asym">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              delay={`${index * 0.15}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
