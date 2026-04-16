import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, ArrowRight, ShieldAlert, Briefcase, ChevronLeft } from 'lucide-react';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [role, setRole] = useState('user'); // 'user', 'admin', or 'partner'
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    password: '',
    roleId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setIsForgot(false);
    setIsOtpSent(false);
    setOtp('');
    setMessage({ type: '', text: '' });
    if (isLogin) {
      setRole('user');
    }
  };

  const handleGetOtp = async () => {
    if (!formData.email) {
      setMessage({ type: 'error', text: 'Please enter your email first.' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/accounts/send-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      if (response.ok) {
        setIsOtpSent(true);
        setMessage({ type: 'success', text: 'OTP sent to your email!' });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.email?.[0] || 'Failed to send OTP.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const baseUrl = 'http://localhost:8000/api/accounts';
    const endpoint = isLogin ? `${baseUrl}/login/` : `${baseUrl}/register/`;
    
    const payload = isLogin 
      ? { email: formData.email, password: formData.password, id: formData.roleId }
      : { 
          email: formData.email, 
          password: formData.password, 
          name: formData.name, 
          city: formData.city,
          otp: otp
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          localStorage.setItem('user', JSON.stringify({
            email: data.email,
            role: data.role,
            name: data.name
          }));
          setMessage({ type: 'success', text: `Welcome back, ${data.name || data.email}!` });
        } else {
          setMessage({ type: 'success', text: 'Account created successfully! Please sign in.' });
          setIsLogin(true);
          setIsOtpSent(false);
        }
      } else {
        const errorMsg = data.detail || data.id || data.otp || Object.values(data)[0];
        setMessage({ type: 'error', text: Array.isArray(errorMsg) ? errorMsg[0] : errorMsg });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection failed. Is the backend running?' });
    } finally {
      setIsLoading(false);
    }
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
              {isOtpSent && !isLogin && (
                <button className="back-btn" onClick={() => setIsOtpSent(false)}>
                  <ChevronLeft size={16} /> Edit Details
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
                    : (isOtpSent ? 'Verify your email to complete registration.' : 'Create your account to start monetizing your recycling.'))}
              </p>
            </div>

            {message.text && (
              <div className={`auth-alert ${message.type}`}>
                {message.text}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {!isOtpSent && (
                <>
                  {!isLogin && !isForgot && (
                    <div className="input-group-nature">
                      <label><User size={14} /> Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  <div className="input-group-nature">
                    <label><Mail size={14} /> Email Address</label>
                    <div className="input-with-action">
                      <input 
                        type="email" 
                        name="email"
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {!isLogin && !isForgot && (
                        <button 
                          type="button" 
                          className="btn-inline-otp"
                          onClick={handleGetOtp}
                          disabled={isLoading}
                        >
                          Get OTP
                        </button>
                      )}
                    </div>
                  </div>

                  {!isLogin && !isForgot && (
                    <div className="input-group-nature">
                      <label><MapPin size={14} /> City</label>
                      <input 
                        type="text" 
                        name="city"
                        placeholder="New York, NY" 
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  {!isForgot && (
                    <div className="input-group-nature">
                      <label><Lock size={14} /> Password</label>
                      <input 
                        type="password" 
                        name="password"
                        placeholder="••••••••" 
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  {!isForgot && (
                    <div className="input-group-nature">
                      <label><User size={14} /> Account Type</label>
                      <select 
                        className="select-nature" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        disabled={!isLogin}
                      >
                        <option value="user">User</option>
                        {isLogin && (
                          <>
                            <option value="admin">Admin</option>
                            <option value="partner">Partner</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}

                  {isLogin && !isForgot && (
                    <>
                      {role === 'admin' && (
                        <div className="input-group-nature reveal-input">
                          <label><ShieldAlert size={14} /> Admin ID</label>
                          <input 
                            type="text" 
                            name="roleId"
                            placeholder="ADM-XXXX-XXXX" 
                            value={formData.roleId}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      )}

                      {role === 'partner' && (
                        <div className="input-group-nature reveal-input">
                          <label><Briefcase size={14} /> Partner ID</label>
                          <input 
                            type="text" 
                            name="roleId"
                            placeholder="PRT-XXXX-XXXX" 
                            value={formData.roleId}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      )}
                    </>
                  )}
                  {isLogin && !isForgot && (
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
                </>
              )}

              {isOtpSent && !isLogin && (
                <div className="input-group-nature reveal-input">
                  <label><Lock size={14} /> Verification Code</label>
                  <input 
                    type="text" 
                    placeholder="Enter 6-digit OTP" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="otp-input-large"
                  />
                  <p className="body-xs text-muted" style={{ marginTop: '8px' }}>
                    We've sent a code to <strong>{formData.email}</strong>.
                  </p>
                </div>
              )}

              <button 
                type="submit" 
                className={`btn btn-primary btn-full magnetic shimmer ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isForgot ? 'Send Reset Link' : (isLogin ? 'Sign In' : (isOtpSent ? 'Validate' : 'Create Account')))}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>

            {!isForgot && !isOtpSent && (
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