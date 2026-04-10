import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, ArrowRight, ShieldAlert, Briefcase, ChevronLeft } from 'lucide-react';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [role, setRole] = useState('user'); // 'user', 'admin', or 'partner'

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setIsForgot(false); // Reset forgot state when switching modes
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-gradient" />
      <div className="container auth-container">
        <div className="auth-card-wrap reveal active">
          <div className="auth-visual-side">
            <div className="auth-visual-content">
              <h2 className="headline-lg text-white">Join the <span className="text-secondary">Revolution.</span></h2>
              <p className="body-sm text-white-muted">
                Be part of a global network transforming urban waste into communal wealth.
              </p>
            </div>
            <div className="auth-visual-footer">
              <div className="auth-stat">
                <span className="stat-num">50k+</span>
                <span className="stat-desc">Users</span>
              </div>
              <div className="auth-stat">
                <span className="stat-num">120+</span>
                <span className="stat-desc">Cities</span>
              </div>
            </div>
          </div>

          <div className="auth-form-side">
            <div className="auth-header">
              {isForgot && (
                <button className="back-btn" onClick={() => setIsForgot(false)}>
                  <ChevronLeft size={16} /> Back to Sign In
                </button>
              )}
              <h1 className="headline-md">
                {isForgot ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Get Started')}
              </h1>
              <p className="body-xs text-muted">
                {isForgot 
                  ? 'Enter your details to receive a secure reset link.'
                  : (isLogin 
                    ? 'Access your eco-dashboard to track your impact.' 
                    : 'Create your account to start monetizing your recycling.')}
              </p>
            </div>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && !isForgot && (
                <div className="input-group-nature">
                  <label><User size={14} /> Full Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
              )}

              <div className="input-group-nature">
                <label><Mail size={14} /> Email Address</label>
                <input type="email" placeholder="john@example.com" />
              </div>

              {!isLogin && !isForgot && (
                <div className="input-group-nature">
                  <label><MapPin size={14} /> City</label>
                  <input type="text" placeholder="New York, NY" />
                </div>
              )}

              {!isForgot && (
                <div className="input-group-nature">
                  <label><Lock size={14} /> Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
              )}

              <div className="input-group-nature">
                <label><User size={14} /> Account Type</label>
                <select 
                  className="select-nature" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="partner">Partner</option>
                </select>
              </div>

              {role === 'admin' && (
                <div className="input-group-nature reveal-input">
                  <label><ShieldAlert size={14} /> Admin ID</label>
                  <input type="text" placeholder="ADM-XXXX-XXXX" />
                </div>
              )}

              {role === 'partner' && (
                <div className="input-group-nature reveal-input">
                  <label><Briefcase size={14} /> Partner ID</label>
                  <input type="text" placeholder="PRT-XXXX-XXXX" />
                </div>
              )}

              {isLogin && !isForgot && role === 'user' && (
                <div className="auth-options">
                  <label className="checkbox-wrap">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="link-text-btn-alt" onClick={() => setIsForgot(true)}>
                    Forgot password?
                  </button>
                </div>
              )}

              <button className="btn btn-primary btn-full magnetic shimmer">
                {isForgot ? 'Send Reset Link' : (isLogin ? 'Sign In' : 'Create Account')}
                <ArrowRight size={18} />
              </button>
            </form>

            {!isForgot && (
              <div className="auth-footer-toggle" style={{ marginTop: '32px' }}>
                <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                <button className="link-text-btn" onClick={handleToggleMode}>
                  {isLogin ? 'Create one now' : 'Sign in instead'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;