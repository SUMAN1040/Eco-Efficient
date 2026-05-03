import React from 'react';
import { Leaf, MessageCircle, Share2, Globe, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-nature reveal" style={{ backgroundColor: '#1E2B1A', color: '#E2E8DF' }}>
      <div className="container pb-5">
        <div className="row g-5 pb-lg-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-12 text-center text-lg-start d-flex flex-column align-items-center align-items-lg-start">
            <div className="logo-nature text-white d-flex align-items-center gap-2 fw-bold fs-4 mb-4">
              <Leaf className="logo-icon" fill="currentColor" strokeWidth={1.2} />
              <span className="logo-text">EcoEfficient</span>
            </div>
            <p className="brand-desc-nature mb-4" style={{ color: 'rgba(226, 232, 223, 0.7)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
              Revolutionizing waste management through AI and data science for a sustainable future. Rooted in the principles of our Nature Sanctuary design.
            </p>
            <div className="social-links-nature d-flex gap-3 justify-content-center justify-content-lg-start">
              <a href="#" className="social-node text-white text-decoration-none" title="Twitter"><MessageCircle size={20} /></a>
              <a href="#" className="social-node text-white text-decoration-none" title="Impact Report"><Globe size={20} /></a>
              <a href="#" className="social-node text-white text-decoration-none" title="Facebook"><Share2 size={20} /></a>
            </div>
          </div>
          
          {/* Platform Links */}
          <div className="col-lg-2 col-md-6 col-6 text-center text-lg-start d-flex flex-column gap-3">
            <h4 className="text-white fs-6 mb-2">Platform</h4>
            <a href="#features" className="footer-link">Features</a>
            <a href="#roles" className="footer-link">Ecosystem</a>
            <a href="#" className="footer-link">Roadmap</a>
          </div>
          
          {/* Company Links */}
          <div className="col-lg-2 col-md-6 col-6 text-center text-lg-start d-flex flex-column gap-3">
            <h4 className="text-white fs-6 mb-2">Company</h4>
            <a href="#about" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Impact</a>
          </div>
          
          {/* Newsletter Column */}
          <div className="col-lg-4 col-md-12 text-center text-lg-start d-flex flex-column align-items-center align-items-lg-start mt-4 mt-lg-0">
            <h4 className="text-white fs-6 mb-3">Stay Updated</h4>
            <p className="mb-4" style={{ color: 'rgba(226, 232, 223, 0.6)', fontSize: '0.85rem' }}>
              Join our network of 120+ smart cities receiving monthly impact reports.
            </p>
            <div className="newsletter-organic-form d-flex w-100" style={{ maxWidth: '400px' }}>
              <input type="email" placeholder="Your email address" aria-label="Email address" className="flex-grow-1" />
              <button className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', padding: 0 }} aria-label="Subscribe">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom-nature" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', padding: '40px 0', background: 'rgba(0, 0, 0, 0.1)' }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3" style={{ color: 'rgba(226, 232, 223, 0.4)' }}>
            <p className="m-0" style={{ fontSize: '0.8rem' }}>&copy; 2026 EcoEfficient Platform. All rights reserved.</p>
            <div className="legal-links-nature d-flex flex-column flex-md-row gap-2 gap-md-4 text-center">
              <a href="#" className="text-decoration-none footer-link" style={{ fontSize: '0.8rem' }}>Privacy Policy</a>
              <a href="#" className="text-decoration-none footer-link" style={{ fontSize: '0.8rem' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-nature { padding-top: 140px; }
        
        .social-node {
          width: 44px; height: 44px; background: rgba(255, 255, 255, 0.05); border-radius: 12px;
          display: flex; align-items: center; justify-content: center; transition: all 0.4s ease;
        }
        .social-node:hover { background: var(--primary-light); transform: translateY(-4px); color: white !important; }
        
        .footer-link { color: rgba(226, 232, 223, 0.6); font-size: 0.9rem; text-decoration: none; transition: color 0.3s ease; }
        .footer-link:hover { color: white !important; }
        
        .newsletter-organic-form {
          background: rgba(255, 255, 255, 0.03); padding: 8px; border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .newsletter-organic-form input {
          background: transparent; border: none; padding: 0 16px; color: white; outline: none;
        }
        .newsletter-organic-form input::placeholder { color: rgba(255, 255, 255, 0.4); }
        
        @media (max-width: 1024px) {
          .footer-nature { padding-top: 80px; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
