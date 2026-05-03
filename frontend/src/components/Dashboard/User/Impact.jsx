import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TreePine, Droplets, Wind, Globe2, Activity, Zap, ShieldCheck, User, RefreshCw, Box, Trash2 } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Impact = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('personal'); // 'personal' | 'global'
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    document.title = "EcoEfficient | Your Impact";
  }, []);

  const stats = {
    personal: { saved: 42, trees: '+3', water: '2.5k', co2: '-12.5%' },
    global: { saved: '1.2M', trees: '+85k', water: '900M', co2: '-34%' }
  };

  const currentStats = stats[viewMode];

  return (
    <div className="impact-container pb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .impact-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(16, 185, 129, 0.1);
          border-radius: 32px;
          box-shadow: 0 8px 32px 0 rgba(16, 185, 129, 0.05);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
        }
        .impact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.15);
        }
        .hero-gradient {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          transition: all 0.5s ease;
        }
        .hero-gradient.global {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }
        /* Interactive Toggle Switch */
        .toggle-switch {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 4px;
          display: inline-flex;
          position: relative;
        }
        .toggle-btn {
          padding: 8px 24px;
          border-radius: 50px;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .toggle-btn.active {
          color: #10b981;
        }
        .hero-gradient.global .toggle-btn.active {
          color: #3b82f6;
        }
        .toggle-bg {
          position: absolute;
          top: 4px;
          bottom: 4px;
          width: calc(50% - 4px);
          background: white;
          border-radius: 50px;
          transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        /* Progress Bar Animation */
        .stat-progress {
          height: 6px;
          border-radius: 6px;
          background: rgba(0,0,0,0.05);
          overflow: hidden;
          margin-top: 15px;
        }
        .stat-progress-bar {
          height: 100%;
          border-radius: 6px;
          transition: width 1s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Interactive Pictorial Steps */
        .step-card {
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        .step-card:hover, .step-card.active {
          border-color: #10b981;
          background: #ecfdf5 !important;
          transform: translateY(-5px) scale(1.02);
        }
        .step-icon-wrap {
          transition: all 0.3s ease;
        }
        .step-card:hover .step-icon-wrap, .step-card.active .step-icon-wrap {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
      
      <div>

          {/* Hero Section with Interactive Toggle */}
          <div className={`impact-card hero-gradient p-5 mb-5 position-relative ${viewMode === 'global' ? 'global' : ''}`}>
            <Globe2 size={250} className="position-absolute opacity-10" style={{ right: '-50px', top: '-50px' }} />

            <div className="d-flex justify-content-center mb-5 position-relative z-1">
              <div className="toggle-switch shadow-sm" style={{ cursor: 'pointer' }} onClick={() => setViewMode(viewMode === 'personal' ? 'global' : 'personal')}>
                <div className="toggle-bg" style={{ transform: viewMode === 'personal' ? 'translateX(0)' : 'translateX(100%)' }}></div>
                <div className={`toggle-btn d-flex align-items-center gap-2 ${viewMode === 'personal' ? 'active' : ''}`}>
                  <User size={16} /> My Impact
                </div>
                <div className={`toggle-btn d-flex align-items-center gap-2 ${viewMode === 'global' ? 'active' : ''}`}>
                  <Globe2 size={16} /> Global Mission
                </div>
              </div>
            </div>

            <div className="row align-items-center position-relative z-1 text-center text-md-start">
              <div className="col-12 col-md-7">
                <h1 className="display-4 fw-black mb-3 tracking-tighter lh-1">
                  {viewMode === 'personal' ? "Your Actions Matter." : "Together We Heal."}
                </h1>
                <p className="lead fw-bold opacity-75 mb-0" style={{ maxWidth: '500px' }}>
                  {viewMode === 'personal'
                    ? "By choosing to recycle, you are actively healing the planet. Here is the real-world impact of your choices."
                    : "When millions join the cause, the impact is staggering. See what our community has achieved."}
                </p>
              </div>
              <div className="col-12 col-md-5 mt-5 mt-md-0 d-flex justify-content-center justify-content-md-end">
                <div className="bg-white rounded-circle d-flex flex-column align-items-center justify-content-center shadow-lg transition-all"
                  style={{ width: '180px', height: '180px', color: viewMode === 'personal' ? '#10b981' : '#3b82f6', transform: 'scale(1.05)' }}>
                  <span className="display-3 fw-black lh-1 mb-1">{currentStats.saved}</span>
                  <span className="fw-bold text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>{viewMode === 'personal' ? 'KG Saved' : 'Tons Saved'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Pictorial Grid (Animated) */}
          <div className="row g-4 mb-5">
            {/* Forests */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="impact-card h-100 p-4 p-md-5 d-flex flex-column">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                  <div className="rounded-4 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                    <TreePine size={32} />
                  </div>
                  <h2 className="fw-black text-success mb-0">{currentStats.trees}</h2>
                </div>
                <h4 className="fw-black text-dark mb-2">Trees Preserved</h4>
                <p className="text-muted fw-medium small mb-0">Paper recycling directly saves mature trees from being cut down, preserving habitats.</p>
                <div className="stat-progress">
                  <div className="stat-progress-bar" style={{ width: viewMode === 'personal' ? '35%' : '85%', background: '#10b981' }}></div>
                </div>
              </div>
            </div>

            {/* Water */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="impact-card h-100 p-4 p-md-5 d-flex flex-column">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                  <div className="rounded-4 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                    <Droplets size={32} />
                  </div>
                  <h2 className="fw-black text-primary mb-0">{currentStats.water}</h2>
                </div>
                <h4 className="fw-black text-dark mb-2">Liters Conserved</h4>
                <p className="text-muted fw-medium small mb-0">Manufacturing from recycled materials requires drastically less water than raw materials.</p>
                <div className="stat-progress">
                  <div className="stat-progress-bar" style={{ width: viewMode === 'personal' ? '50%' : '92%', background: '#3b82f6' }}></div>
                </div>
              </div>
            </div>

            {/* Emissions */}
            <div className="col-12 col-lg-4">
              <div className="impact-card h-100 p-4 p-md-5 d-flex flex-column">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                  <div className="rounded-4 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                    <Wind size={32} />
                  </div>
                  <h2 className="fw-black mb-0" style={{ color: '#8b5cf6' }}>{currentStats.co2}</h2>
                </div>
                <h4 className="fw-black text-dark mb-2">CO2 Diverted</h4>
                <p className="text-muted fw-medium small mb-0">Diverting waste from landfills prevents the release of methane and greenhouse gases.</p>
                <div className="stat-progress">
                  <div className="stat-progress-bar" style={{ width: viewMode === 'personal' ? '25%' : '75%', background: '#8b5cf6' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Educational Section */}
          <div className="impact-card p-4 p-md-5 mb-5 position-relative overflow-hidden">
            <div className="text-center mb-5 position-relative z-1">
              <h2 className="fw-black text-dark tracking-tighter mb-3">Master the Art of Sorting</h2>
              <p className="text-muted fw-medium mx-auto" style={{ maxWidth: '600px' }}>
                Click on each step to learn the correct way to prepare your recyclables. Clean sorting ensures nothing ends up in a landfill.
              </p>
            </div>

            <div className="row g-4 position-relative z-1">
              {[
                { id: 1, title: 'Rinse', icon: <Droplets />, color: 'primary', desc: 'Wash out food residue. Dirty containers contaminate entire recycling batches.' },
                { id: 2, title: 'Separate', icon: <RefreshCw />, color: 'warning', desc: 'Remove plastic caps from glass bottles. Don\'t mix paper with wet items.' },
                { id: 3, title: 'Flatten', icon: <Box />, color: 'info', desc: 'Break down cardboard boxes. This saves space in transport trucks, cutting emissions.' },
                { id: 4, title: 'No Bags', icon: <Trash2 />, color: 'danger', desc: 'Never put recyclables in plastic bags. Keep them loose to prevent jamming sorting machines.' }
              ].map((step) => (
                <div className="col-6 col-md-3" key={step.id}>
                  <div
                    className={`step-card bg-white p-4 rounded-4 text-center h-100 shadow-sm ${activeStep === step.id ? 'active' : ''}`}
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  >
                    <div className={`step-icon-wrap d-inline-flex bg-${step.color} bg-opacity-10 text-${step.color} rounded-circle p-3 mb-3`}>
                      {React.cloneElement(step.icon, { size: 32 })}
                    </div>
                    <h5 className="fw-bold text-dark mb-0">{step.title}</h5>

                    <div className="collapse show" style={{ height: activeStep === step.id ? 'auto' : '0', overflow: 'hidden', transition: 'height 0.3s ease' }}>
                      <div className="pt-3 border-top mt-3">
                        <p className="small text-muted mb-0">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {activeStep === null && (
              <div className="text-center mt-4">
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill shadow-sm">
                  <ShieldCheck size={14} className="me-1" /> Click a card to reveal details
                </span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Impact;