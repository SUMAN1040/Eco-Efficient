import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled_val = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollWidth(scrolled_val);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div 
        className="nav-progress-leaf" 
        style={{ width: `${scrollWidth}%`, opacity: scrolled ? 1 : 0 }} 
      />
      
      <div className="container nav-container">
        <Link to="/" className="logo magnetic">
          <Leaf className="logo-icon" fill="currentColor" strokeWidth={1.2} />
          <span className="logo-text">EcoEfficient</span>
        </Link>
        
        {!isAuthPage && (
          <>
            <div className="nav-links">
              {['Home', 'Features', 'About', 'Contact'].map((link) => (
                <a 
                  key={link} 
                  href={link === 'Home' ? '/' : `#${link.toLowerCase()}`} 
                  className="nav-link editorial"
                >
                  {link}
                  <span className="organic-underline" />
                </a>
              ))}
            </div>

            <div className="nav-actions">
              <button 
                className="btn btn-primary btn-organic shimmer"
                onClick={() => navigate('/auth')}
              >
                Join Platform
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
