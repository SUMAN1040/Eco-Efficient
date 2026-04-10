import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import heroImg from '../assets/hero.png';
import sortingImg from '../assets/sorting_hub.png';
import communityImg from '../assets/eco_community.png';
import { Leaf, Play, ShieldCheck } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [time, setTime] = useState(new Date());

  const slides = [
    { image: heroImg, label: 'Eco-Smart Operations' },
    { image: sortingImg, label: 'AI Sorting Hub L-04' },
    { image: communityImg, label: 'Residential Hub P-12' }
  ];

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
    <section id="home" className="hero-section">
      <div className="hero-bg-accent" />
      <div className="hero-container">
        <div className="hero-content reveal">
          <div className="tag-label">Grounding Efficiency</div>
          <h1 className="nature-display">Transforming Waste into <span className="text-accent underline-terracotta">Organic Worth</span></h1>
          <p className="hero-description body-lg">
            Join the smart waste revolution. Our AI-driven platform helps communities track, sort, and monetize recycling efforts in real-time.
          </p>
          <div className="hero-stats-nature">
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
        <div className="hero-visual reveal visual-assembly">
          <div className="image-wrapper">
            <div className="hero-slider">
              {slides.map((slide, idx) => (
                <img 
                  key={idx}
                  src={slide.image} 
                  alt={slide.label} 
                  className={`slide-image ${idx === currentSlide ? 'active' : ''}`} 
                />
              ))}
              
              {/* Dynamic Timestamp Overlay */}
              <div className="live-timestamp-box">
                <span className="timestamp-label">System Active Time</span>
                <span className="timestamp-value">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <div className="live-pulse" />
                  <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>AI CORE SYNCED</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="system-status-indicator">
                <ShieldCheck size={14} />
                <span>{slides[currentSlide].label}</span>
              </div>
            </div>
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
