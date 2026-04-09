import React from 'react';
import heroImg from '../assets/hero.png';
import { Leaf, Play, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero-section nature-bg">
      <div className="container grid grid-2 hero-container">
        <div className="hero-content reveal">
          <div className="tag-label">Grounding Efficiency</div>
          <h1 className="nature-display">Transforming Waste into <span className="text-accent underline-terracotta">Organic Worth</span></h1>
          <p className="hero-description body-lg">
            Join the smart waste revolution. Our AI-driven platform helps communities track, sort, and monetize recycling efforts in real-time.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary pill magnetic">
              Start Journey <ArrowRight size={20} />
            </button>
            <button className="btn btn-outline pill magnetic">
              Watch Demo <Play size={18} fill="currentColor" />
            </button>
          </div>
          <div className="hero-stats-nature">
            <div className="stat-node reveal" style={{ transitionDelay: '0.3s' }}>
              <div className="stat-value">50k+</div>
              <div className="stat-label">Tons Diverted</div>
            </div>
            <div className="stat-node reveal" style={{ transitionDelay: '0.4s' }}>
              <div className="stat-value">12k+</div>
              <div className="stat-label">Eco Stewards</div>
            </div>
            <div className="stat-node reveal" style={{ transitionDelay: '0.5s' }}>
              <div className="stat-value">120+</div>
              <div className="stat-label">Green Cities</div>
            </div>
          </div>
        </div>
        <div className="hero-visual reveal asymmetry">
          <div className="image-wrapper organic-lift">
            <img src={heroImg} alt="EcoEfficient Smart City" />
            <div className="floating-badge glass-leaf">
              <Leaf size={14} className="leaf-icon" fill="currentColor" />
              <span>Live AI Tracking Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
