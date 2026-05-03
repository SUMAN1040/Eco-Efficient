import React, { useState, useEffect } from 'react';
import heroImg from '../../assets/hero.png';
import sortingImg from '../../assets/sorting_hub.png';
import communityImg from '../../assets/eco_community.png';
import { Leaf, Play, ShieldCheck } from 'lucide-react';

const slides = [
  { image: heroImg, label: 'Eco-Smart Operations' },
  { image: sortingImg, label: 'AI Sorting Hub L-04' },
  { image: communityImg, label: 'Residential Hub P-12' }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    const clockInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(slideInterval);
      clearInterval(clockInterval);
    };
  }, [slides.length]);

  return (
    <section id="home" className="hero-section overflow-hidden position-relative">
      <div className="hero-bg-accent" />
      <div className="container-xxl py-5 px-4 px-lg-5">
        <div className="row align-items-center" style={{ '--bs-gutter-x': 'clamp(40px, 6vw, 80px)', '--bs-gutter-y': '3rem' }}>
          {/* Hero Content Column */}
          <div className="col-lg-6 reveal">
            <div className="tag-label mb-4">Grounding Efficiency</div>
            <h1 className="nature-display">Transforming Waste into <span className="text-accent underline-terracotta text-accent-wrap">Organic Worth</span></h1>
            <p className="hero-description body-lg mb-5">
              Join the smart waste revolution. Our AI-driven platform helps communities track, sort, and monetize recycling efforts in real-time.
            </p>
            <div className="hero-stats-nature d-flex flex-wrap gap-4 gap-md-5">
              <div className="stat-node reveal" style={{ transitionDelay: '0.3s' }}>
                <span className="stat-value">50k+</span>
                <span className="stat-label">Tons Diverted</span>
              </div>
              <div className="stat-node reveal" style={{ transitionDelay: '0.4s' }}>
                <span className="stat-value">12k+</span>
                <span className="stat-label">Eco Stewards</span>
              </div>
              <div className="stat-node reveal" style={{ transitionDelay: '0.5s' }}>
                <span className="stat-value">120+</span>
                <span className="stat-label">Green Cities</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="col-lg-6 reveal visual-assembly position-relative d-flex align-items-center justify-content-center">
            <div className="image-wrapper position-relative w-100 shadow-lg rounded-5 overflow-hidden" style={{ height: '90%' }}>
              <div className="hero-slider position-relative w-100 h-100">
                {slides.map((slide, idx) => (
                  <img
                    key={idx}
                    src={slide.image}
                    alt={slide.label}
                    className={`slide-image position-absolute top-0 start-0 w-100 h-100 object-fit-cover ${idx === currentSlide ? 'active' : ''}`}
                  />
                ))}

                {/* Dynamic Timestamp Overlay */}
                <div className="live-timestamp-box position-absolute top-0 start-0 m-4 p-3 rounded-4 text-white shadow-sm" style={{ zIndex: 20, background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)' }}>
                  <span className="timestamp-label d-block small fw-bold text-uppercase tracking-widest text-success mb-1">System Active Time</span>
                  <span className="timestamp-value fs-4 fw-medium font-monospace">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                  </span>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <div className="live-pulse" />
                    <span className="small text-white-50 fw-bold" style={{ fontSize: '0.55rem' }}>AI CORE SYNCED</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="system-status-indicator position-absolute bottom-0 end-0 m-4 p-2 px-3 rounded-pill bg-white shadow-sm d-flex align-items-center gap-3" style={{ zIndex: 20 }}>
                  <ShieldCheck size={14} className="text-success" />
                  <span className="small fw-bold text-uppercase tracking-tighter text-dark">{slides[currentSlide].label}</span>
                </div>
              </div>
            </div>

            {/* Floating Metric Node: AI Efficiency */}
            <div className="layer metric-node metric-a position-absolute translate-middle-y">
              <div className="metric-glass p-3 rounded-4 shadow-sm border d-flex align-items-center gap-3" style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)' }}>
                <div className="metric-icon-wrap d-flex align-items-center justify-content-center bg-success text-white rounded-circle" style={{ width: '32px', height: '32px' }}><Play size={14} fill="currentColor" /></div>
                <div className="metric-data">
                  <span className="label small text-uppercase text-muted fw-bold tracking-tighter" style={{ fontSize: '0.65rem' }}>AI Efficiency</span>
                  <span className="value m-1 fw-bold text-dark fs-6">98.4%</span>
                </div>
              </div>
            </div>

            {/* Floating Metric Node: Live Tracking */}
            <div className="layer metric-node metric-b position-absolute translate-middle-y">
              <div className="metric-glass p-3 rounded-4 shadow-sm border d-flex align-items-center gap-3" style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)' }}>
                <div className="live-pulse" />
                <div className="metric-data">
                  <span className="label small text-uppercase text-muted fw-bold tracking-tighter" style={{ fontSize: '0.65rem' }}>Live Tracking</span>
                  <span className="value m-1 text-dark fs-6">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section { 
          min-height: 750px; 
          background: linear-gradient(135deg, #Fcfdfc 0%, #Eef2eb 100%); 
        }
        .hero-bg-accent {
          position: absolute; top: 0; right: 0; width: 60%; height: 100%;
          background: radial-gradient(circle at 70% 30%, rgba(130, 147, 117, 0.15), transparent 70%);
          z-index: -1; pointer-events: none;
        }
        .nature-display { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.05; margin: 24px 0 32px; color: var(--primary); letter-spacing: -0.02em; }
        .underline-terracotta { text-decoration: underline 4px var(--accent); text-underline-offset: 8px; }
        .text-accent-wrap { display: inline-block; }
        .stat-value { font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; color: var(--primary); display: block; }
        .stat-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); }
        .visual-assembly { height: clamp(350px, 70vh, 85vh); }
        .slide-image { opacity: 0; transition: opacity 1.5s ease-in-out, transform 1.5s ease-in-out; transform: scale(1.1); filter: saturate(1.1) contrast(1.05); }
        .slide-image.active { opacity: 1; transform: scale(1); }
        .metric-node { z-index: 10; animation: float 6s ease-in-out infinite; }
        .metric-a { top: 10%; right: -8%; animation-delay: 0s; }
        .metric-b { bottom: 15%; left: -8%; animation-delay: 1.5s; }
        .live-pulse { width: 10px; height: 10px; background: #4CAF50; border-radius: 50%; position: relative; }
        .live-pulse::after {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: inherit; border-radius: inherit; animation: pulse 2s ease-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @media (max-width: 1200px) { .metric-a { right: -2%; } .metric-b { left: -2%; } }
        @media (max-width: 1024px) {
          .hero-section { height: auto; padding: 140px 0 80px; min-height: 100vh; }
          .visual-assembly { height: clamp(350px, 50vh, 500px); max-width: 700px; margin: 0 auto; }
          .metric-a { right: 2%; top: 5%; transform: scale(0.8); }
          .metric-b { left: 2%; bottom: 5%; transform: scale(0.8); }
        }
        @media (max-width: 768px) { .visual-assembly { height: clamp(300px, 40vh, 400px); } }
        @media (max-width: 600px) {
          .hero-section { padding: 100px 0 60px; }
          .metric-node { display: none; }
        }
        @media (max-width: 480px) {
          .nature-display { font-size: clamp(2rem, 10vw, 2.8rem); line-height: 1.15; }
          .stat-value { font-size: 1.6rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;