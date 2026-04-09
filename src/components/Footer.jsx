import React from 'react';
import { Leaf, MessageCircle, Share2, Globe, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-nature reveal">
      <div className="container footer-grid-organic">
        <div className="footer-brand-nature">
          <div className="logo-nature white-text">
            <Leaf className="logo-icon" fill="currentColor" strokeWidth={1.2} />
            <span className="logo-text">EcoEfficient</span>
          </div>
          <p className="brand-desc-nature body-sm">
            Revolutionizing waste management through AI and data science for a sustainable future. Rooted in the principles of our Nature Sanctuary design.
          </p>
          <div className="social-links-nature">
            <a href="#" className="social-node stone" title="Twitter"><MessageCircle size={20} /></a>
            <a href="#" className="social-node stone" title="Impact Report"><Globe size={20} /></a>
            <a href="#" className="social-node stone" title="Facebook"><Share2 size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links-nature">
          <h4>Platform</h4>
          <a href="#features">Features</a>
          <a href="#roles">Ecosystem</a>
          <a href="#">Roadmap</a>
          <a href="#">Pricing</a>
        </div>
        
        <div className="footer-links-nature">
          <h4>Company</h4>
          <a href="#about">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Impact</a>
          <a href="#">Press</a>
        </div>
        
        <div className="footer-newsletter-nature">
          <h4>Stay Updated</h4>
          <p className="body-xs">Join our network of 120+ smart cities receiving monthly impact reports.</p>
          <div className="newsletter-organic-form tonal-nest-nature">
            <input type="email" placeholder="Your email address" aria-label="Email address" />
            <button className="btn btn-primary btn-icon-pill" aria-label="Subscribe"><Send size={18} /></button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom-nature">
        <div className="container bottom-content-nature">
          <p className="body-xs">&copy; 2026 EcoEfficient Platform. All rights reserved.</p>
          <div className="legal-links-nature">
            <a href="#" className="body-xs">Privacy Policy</a>
            <a href="#" className="body-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
