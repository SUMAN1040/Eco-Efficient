import React, { useEffect } from 'react';
import Hero from '../components/LandingPage/Hero';
import Features from '../components/LandingPage/Features';
import About from '../components/LandingPage/About';
import Roles from '../components/LandingPage/Roles';

const Landing = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Also handle a direct check in case the section is already in view on load
    const checkVisibility = () => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          el.classList.add('active');
        }
      });
    };
    
    checkVisibility();

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <Features />
      <About />
      <Roles />
    </main>
  );
};

export default Landing;
