import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Leaf, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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

  // Close mobile menu on resize and handle overflow
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 968) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = ['Home', 'Features', 'About', 'Roles'];

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''} ${isOpen ? 'nav-open' : ''}`}>
      <div 
        className="nav-progress-leaf" 
        style={{ width: `${scrollWidth}%`, opacity: scrolled ? 1 : 0 }} 
      />
      
      <div className="container nav-container">
        <Link to="/" className="logo magnetic" onClick={closeMenu}>
          <Leaf className="logo-icon" fill="currentColor" strokeWidth={1.2} />
          <span className="logo-text">EcoEfficient</span>
        </Link>
        
        {!isAuthPage && (
          <>
            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
              {navLinks.map((link) => (
                <a 
                  key={link} 
                  href={link === 'Home' ? '/' : `#${link.toLowerCase()}`} 
                  className="nav-link editorial"
                  onClick={closeMenu}
                >
                  {link}
                  <span className="organic-underline" />
                </a>
              ))}
              <div className="mobile-only-actions">
                <button 
                  className="btn btn-primary btn-organic shimmer"
                  onClick={() => {
                    navigate('/auth');
                    closeMenu();
                  }}
                >
                  Join Platform
                </button>
              </div>
            </div>

            <div className="nav-actions">
              <button 
                className="btn btn-primary btn-organic shimmer desktop-only"
                onClick={() => navigate('/auth')}
              >
                Join Platform
              </button>
              
              <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`nav-overlay ${isOpen ? 'active' : ''}`} onClick={closeMenu} />
    </nav>
  );
};

export default Navbar;