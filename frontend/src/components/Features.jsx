import React from 'react';
import '../styles/Features.css';
import FeatureCard from './FeatureCard';
import { Scan, BarChart3, Coins, Users, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    icon: Scan,
    title: "AI Waste Scanner",
    description: "Industrial-grade computer vision for instant identification and automated sorting protocols.",
    badge: "99.2% Accuracy"
  },
  {
    icon: BarChart3,
    title: "Impact Intelligence",
    description: "Multi-dimensional environmental analytics with real-time ESG reporting and carbon tracking.",
    badge: "Enterprise Ready"
  },
  {
    icon: Coins,
    title: "Tokenized Incentives",
    description: "A proprietary rewards system that monetizes recycling actions through blockchain-verified Eco Coins.",
    badge: "Instant Rewards"
  },
  {
    icon: Zap,
    title: "Smart Logistics",
    description: "Autonomous route optimization algorithms that minimize energy consumption and collection cost.",
    badge: "40% Efficient"
  },
  {
    icon: Users,
    title: "Partner Ecosystem",
    description: "Direct integration with certified waste facilities ensuring a truly circular supply chain.",
    badge: "Global Network"
  },
  {
    icon: ShieldCheck,
    title: "Certified Compliance",
    description: "Immutable ledger tracking for regulatory compliance and transparent sustainability audits.",
    badge: "Verified CSR"
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section-architectural">
      <div className="container">
        <div className="section-header-wrap reveal">
          <div className="platform-tag">Efficiency Platform</div>
          <h2 className="display-headline">Industrialized <span className="text-accent underline-professional">Resource Management</span></h2>
          <p className="platform-description">A unified, enterprise-grade ecosystem designed to maximize recovery and eliminate global waste inefficiencies.</p>
        </div>
        
        <div className="grid grid-3 features-grid-clean">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              delay={`${index * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
