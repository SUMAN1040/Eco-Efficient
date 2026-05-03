import React from 'react';
import { Target, Heart, Shield } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="about-nature-section overflow-hidden" style={{ backgroundColor: 'var(--surface-paper)' }}>
      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* Visual Left Column */}
          <div className="col-lg-6 about-visual-organic reveal">
            <div className="nature-stack">
              <div className="about-card-nature card-bark organic-lift magnetic">
                <div className="nature-badge">Mission 2030</div>
                <h4 className="fw-bold mb-3" style={{ fontSize: '1.75rem' }}>Zero Waste. Infinite Potential.</h4>
                <p className="mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.9 }}>
                  At EcoEfficient, we believe that waste is not an end, but a new beginning. Our mission is to transform the city into a circular ecosystem.
                </p>
              </div>
              <div className="about-card-nature card-leaf organic-lift">
                <div className="stat-highlight-nature">98%</div>
                <p className="label-organic">Recycling Efficiency Goal</p>
              </div>
            </div>
          </div>
          
          {/* Content Right Column */}
          <div className="col-lg-6 about-content-nature reveal">
            <div className="platform-tag d-inline-block px-3 py-1 mb-4 rounded text-success fw-bold text-uppercase" style={{ background: 'rgba(45, 74, 34, 0.04)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
              The Vision
            </div>
            <h2 className="display-5 fw-bold mb-4 text-dark" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Empowering Cities for a <span className="text-secondary">Greener Tomorrow</span>
            </h2>
            <p className="text-muted mb-5" style={{ fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '550px' }}>
              Leveraging technology to bridge the gap between human progress and planetary health.
            </p>
            
            <ul className="mission-list-nature list-unstyled d-flex flex-column gap-4 m-0 p-0">
              <li className="d-flex gap-4 align-items-start">
                <div className="leaf-check flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '48px', height: '48px', background: 'rgba(45, 74, 34, 0.05)', color: 'var(--primary)' }}>
                  <Target size={22} />
                </div> 
                <div>
                  <strong className="d-block text-dark mb-1 fs-5">Data-Driven Decisions</strong>
                  <p className="text-muted m-0" style={{ fontSize: '0.95rem' }}>AI analytics that optimize collection routes and reduce fuel consumption.</p>
                </div>
              </li>
              <li className="d-flex gap-4 align-items-start">
                <div className="leaf-check flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '48px', height: '48px', background: 'rgba(45, 74, 34, 0.05)', color: 'var(--primary)' }}>
                  <Heart size={22} />
                </div>
                <div>
                  <strong className="d-block text-dark mb-1 fs-5">Community First</strong>
                  <p className="text-muted m-0" style={{ fontSize: '0.95rem' }}>A rewarding system that incentivizes green behavior in local neighborhoods.</p>
                </div>
              </li>
              <li className="d-flex gap-4 align-items-start">
                <div className="leaf-check flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '48px', height: '48px', background: 'rgba(45, 74, 34, 0.05)', color: 'var(--primary)' }}>
                  <Shield size={22} />
                </div>
                <div>
                  <strong className="d-block text-dark mb-1 fs-5">Transparent Supply Chain</strong>
                  <p className="text-muted m-0" style={{ fontSize: '0.95rem' }}>Track every resource from collection to its new life as a recycled product.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .about-nature-section { padding: 160px 0; }
        .nature-stack { position: relative; height: 500px; }
        
        .about-card-nature {
          position: absolute; padding: 56px 48px; border-radius: var(--radius-lg);
          box-shadow: var(--shadow-ambient); transition: var(--transition-organic);
          display: flex; flex-direction: column; gap: 12px;
        }
        
        .card-bark {
          background-color: var(--primary); color: white; width: 85%;
          top: -10%; left: -5%; z-index: 2;
        }
        
        .card-leaf {
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: white; border: 1px solid rgba(255, 255, 255, 0.1); width: 65%;
          bottom: -15%; right: -5%; z-index: 3; text-align: center;
          box-shadow: 0 20px 48px rgba(45, 74, 34, 0.2);
        }
        
        .nature-badge {
          display: inline-block; padding: 6px 14px; background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 4px;
          font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.15em; margin-bottom: 8px; width: fit-content;
        }
        
        .stat-highlight-nature { font-size: 4rem; font-weight: 800; line-height: 1; margin-bottom: 8px; color: white; }
        .label-organic { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.82; margin: 0; }
        
        @media (max-width: 1024px) {
          .about-nature-section { padding: 100px 0; }
          .about-organic-container { gap: 48px; text-align: center; }
          .nature-stack { height: auto; display: flex; flex-direction: column; align-items: center; gap: 24px; padding-top: 20px; }
          .about-card-nature {
            position: relative; width: 100% !important; max-width: 500px;
            top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
            padding: 40px 32px;
          }
          .card-bark { z-index: 1; }
          .card-leaf { z-index: 2; }
          .about-content-nature { align-items: center; display: flex; flex-direction: column; }
          .mission-list-nature { text-align: left; max-width: 600px; margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 768px) {
          .stat-highlight-nature { font-size: 3rem; }
        }
      `}</style>
    </section>
  );
};

export default About;
