import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

  const navLinks = ['Home', 'Features', 'About', 'Roles'];

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled ? 'bg-white bg-opacity-75 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`} style={{ zIndex: 1000, backdropFilter: scrolled ? 'blur(20px)' : 'none' }}>
      <div 
        className="position-absolute bottom-0 start-0 h-1" 
        style={{ width: `${scrollWidth}%`, background: 'linear-gradient(90deg, #829375, #2D4A22)', transition: 'width 0.1s ease-out', height: '3px' }} 
      />
      
      <div className="container-fluid px-lg-5">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 magnetic text-decoration-none" style={{ transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}>
          <Leaf className="text-success" fill="currentColor" strokeWidth={1.2} size={32} />
          <span className="logo-text fw-bold fs-3 text-success" style={{ letterSpacing: '-0.02em', border: 'none', textDecoration: 'none' }}>EcoEfficient</span>
        </Link>
        
        {!isAuthPage && (
          <>
            <button 
              className="navbar-toggler border-0 shadow-none p-2" 
              type="button" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={28} className="text-success" /> : <Menu size={28} className="text-success" />}
            </button>

            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav mx-auto gap-lg-4 mt-4 mt-lg-0">
                {navLinks.map((link) => (
                  <li key={link} className="nav-item">
                    <a 
                      href={link === 'Home' ? '/' : `#${link.toLowerCase()}`} 
                      className="nav-link fw-semibold text-uppercase small tracking-widest text-secondary-emphasis hover-text-success position-relative organic-hover"
                      onClick={() => setIsOpen(false)}
                      style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="d-flex align-items-center gap-3 mt-4 mt-lg-0">
                <button 
                  className="btn btn-primary rounded-pill px-4 py-2 fw-bold shimmer border-0 shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #2D4A22, #4A6B3E)', fontSize: '0.9rem' }}
                  onClick={() => {
                    navigate('/auth');
                    setIsOpen(false);
                  }}
                >
                  Join Platform
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .backdrop-blur-md { backdrop-filter: blur(20px); }
        .transition-all { transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
        .organic-hover:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #829375;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .organic-hover:hover:after { width: 100%; }
        .hover-text-success:hover { color: #2D4A22 !important; }
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        .magnetic:hover { transform: scale(1.05); }
        @media (max-width: 991px) {
          .navbar-collapse {
            background: rgba(255, 255, 255, 0.98);
            padding: 2rem;
            border-radius: 2rem;
            margin-top: 1rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;