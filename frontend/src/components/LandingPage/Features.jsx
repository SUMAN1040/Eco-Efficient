import React from 'react';
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
    <section id="features" className="features-section-architectural overflow-hidden position-relative" style={{ backgroundColor: 'var(--bg-stone)' }}>
      <div className="container">
        {/* Header Section */}
        <div className="section-header-wrap reveal text-center mx-auto" style={{ maxWidth: '800px', marginBottom: '80px' }}>
          <div className="platform-tag d-inline-block px-3 py-1 mb-4 rounded text-success fw-bold text-uppercase" style={{ background: 'rgba(45, 74, 34, 0.04)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
            Efficiency Platform
          </div>
          <h2 className="display-headline text-success mb-4" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Industrialized <span className="text-accent text-decoration-underline" style={{ textDecorationThickness: '4px', textUnderlineOffset: '8px', textDecorationColor: 'var(--accent)' }}>Resource Management</span>
          </h2>
          <p className="platform-description text-muted mx-auto" style={{ fontSize: '1.2rem', maxWidth: '650px', lineHeight: 1.6 }}>
            A unified, enterprise-grade ecosystem designed to maximize recovery and eliminate global waste inefficiencies.
          </p>
        </div>
        
        {/* Features Grid using Bootstrap */}
        <div className="row g-4 g-lg-5">
          {features.map((feature, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <FeatureCard 
                {...feature} 
                delay={`${index * 0.1}s`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Embedded FeatureCard & Custom Styles */}
      <style>{`
        .features-section-architectural { padding: 160px 0; }
        
        /* Feature Card Custom Styling */
        .feature-card {
          position: relative; background: white; border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 12px; padding: 48px 40px; transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          height: 100%; display: flex; flex-direction: column;
        }
        .feature-card-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--accent);
          border-radius: 12px 12px 0 0; opacity: 0; transition: opacity 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px); box-shadow: 0 20px 40px rgba(45, 74, 34, 0.06);
          border-color: rgba(45, 74, 34, 0.1);
        }
        .feature-card:hover .feature-card-accent { opacity: 1; }
        
        /* Icon Wrapper Hover Effects */
        .feature-icon-wrapper.professional-moss {
          width: 54px; height: 54px; background: rgba(45, 74, 34, 0.05); color: var(--primary);
          border-radius: 12px; display: flex; align-items: center; justify-content: center;
          margin-bottom: 32px; transition: transform 0.4s ease, background 0.4s ease, color 0.4s ease;
        }
        .feature-card:hover .feature-icon-wrapper {
          background: var(--primary); color: white; transform: rotate(10deg) scale(1.05);
        }
        
        /* Inner Text Styling */
        .feature-header-inline { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .feature-title { font-size: 1.4rem; font-weight: 700; color: var(--primary); margin: 0; }
        .feature-badge {
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--secondary);
          background: rgba(130, 147, 117, 0.1); padding: 4px 10px; border-radius: 4px;
        }
        .feature-description { font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; margin: 0; }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .features-section-architectural { padding: 100px 0; }
        }
        @media (max-width: 768px) {
          .features-section-architectural { padding: 80px 0; }
          .section-header-wrap { margin-bottom: 48px !important; }
          .feature-card { padding: 32px 24px; }
        }
      `}</style>
    </section>
  );
};

export default Features;
