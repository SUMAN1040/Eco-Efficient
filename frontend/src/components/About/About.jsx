import React from 'react';
import './About.css';
import { Target, Heart, Shield } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="about-nature-section">
      <div className="container grid grid-2 about-organic-container">
        <div className="about-visual-organic reveal">
          <div className="nature-stack">
            <div className="about-card-nature card-bark organic-lift magnetic">
              <div className="nature-badge">Mission 2030</div>
              <h4 className="headline-md">Zero Waste. Infinite Potential.</h4>
              <p className="body-sm">At EcoEfficient, we believe that waste is not an end, but a new beginning. Our mission is to transform the city into a circular ecosystem.</p>
            </div>
            <div className="about-card-nature card-leaf organic-lift">
              <div className="stat-highlight-nature">98%</div>
              <p className="label-organic">Recycling Efficiency Goal</p>
            </div>
          </div>
        </div>
        
        <div className="about-content-nature reveal">
          <div className="tag-label">The Vision</div>
          <h2 className="headline-lg nature-title">Empowering Cities for a <span className="text-secondary">Greener Tomorrow</span></h2>
          <p className="subtitle-nature">Leveraging technology to bridge the gap between human progress and planetary health.</p>
          
          <ul className="mission-list-nature">
            <li>
              <div className="leaf-check"><Target size={20} /></div>
              <div className="mission-text-nature">
                <strong>Data-Driven Decisions</strong>
                <p>AI analytics that optimize collection routes and reduce fuel consumption.</p>
              </div>
            </li>
            <li>
              <div className="leaf-check"><Heart size={20} /></div>
              <div className="mission-text-nature">
                <strong>Community First</strong>
                <p>A rewarding system that incentivizes green behavior in local neighborhoods.</p>
              </div>
            </li>
            <li>
              <div className="leaf-check"><Shield size={20} /></div>
              <div className="mission-text-nature">
                <strong>Transparent Supply Chain</strong>
                <p>Track every resource from collection to its new life as a recycled product.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
