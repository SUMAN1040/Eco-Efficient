import React from 'react';
import heroImg from '../assets/hero.png';
import { Leaf, Play, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-accent" />
      <div className="container hero-container">
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
        <div className="hero-visual reveal visual-assembly">
          {/* Main Visual Foundation */}
          <div className="layer video-layer image-wrapper">
            <video autoPlay loop muted playsInline className="hero-video" poster={heroImg}>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Floating Metric Node: AI Efficiency */}
          <div className="layer metric-node metric-a">
            <div className="metric-glass">
              <div className="metric-icon-wrap"><Play size={14} fill="currentColor" /></div>
              <div className="metric-data">
                <span className="label">AI Efficiency</span>
                <span className="value">98.4%</span>
              </div>
            </div>
          </div>

          {/* Floating Metric Node: Live Tracking */}
          <div className="layer metric-node metric-b">
            <div className="metric-glass">
              <div className="live-pulse" />
              <div className="metric-data">
                <span className="label">Live Tracking</span>
                <span className="value">Active</span>
              </div>
            </div>
          </div>

          {/* Decorative 3D Leaf */}
          <div className="layer deco-leaf">
             <Leaf className="logo-icon" fill="currentColor" strokeWidth={1.2} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
