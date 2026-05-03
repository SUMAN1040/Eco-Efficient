import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, Phone, ArrowRight, ShieldAlert, Briefcase, ChevronLeft, Navigation, Loader2 } from 'lucide-react';
import OtpVerification from './OtpVerification';
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
    phone: '',
    city: '',
    password: '',
    roleId: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [resendTimer, setResendTimer] = useState(0);

  React.useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Handle location suggestions
    if (name === 'city') {
      if (value.length > 1) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`https://photon.komoot.io/api/?q=${query}&limit=5`);
      const data = await response.json();
      const places = data.features.map(f => {
        const city = f.properties.city || f.properties.name;
        const country = f.properties.country;
        return city && country ? `${city}, ${country}` : city || country;
      }).filter(Boolean);
      // Remove duplicates
      setSuggestions([...new Set(places)]);
      setShowSuggestions(places.length > 0);
    } catch (error) {
      console.error("Suggestion error:", error);
    }
  };

  const handleSelectSuggestion = (place) => {
    setFormData(prev => ({ ...prev, city: place }));
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        const city = data.address.city || data.address.town || data.address.village || data.address.suburb;
        const country = data.address.country;
        
        if (city) {
          setFormData(prev => ({ ...prev, city: `${city}, ${country}` }));
        } else {
          setFormData(prev => ({ ...prev, city: country || "Unknown Location" }));
        }
      } catch (error) {
        console.error("Detection error:", error);
        alert("Failed to detect location accurately.");
      } finally {
        setIsDetecting(false);
      }
    }, (error) => {
      console.error("Geolocation error:", error);
      alert("Permission denied or location unavailable.");
      setIsDetecting(false);
    });
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
        setResendTimer(60); // 60 seconds countdown
        setMessage({ type: 'success', text: 'Verification code sent to your email!' });
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
    
    // Explicit stage handling for registration
    if (!isLogin && !isOtpSent) {
      handleGetOtp();
      return;
    }

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
          phone: formData.phone,
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
              {!isOtpSent ? (
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
                    </div>
                  </div>

                  {!isLogin && !isForgot && (
                    <div className="input-group-nature">
                      <label><Phone size={14} /> Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="+1 (555) 000-0000" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  {!isLogin && !isForgot && (
                    <div className="input-group-nature location-group">
                      <label>
                        <MapPin size={14} /> Location
                        <button 
                          type="button" 
                          className="detect-btn" 
                          onClick={handleDetectLocation}
                          disabled={isDetecting}
                          title="Detect current location"
                        >
                          {isDetecting ? <Loader2 size={12} className="spin" /> : <Navigation size={12} />}
                          {isDetecting ? "Detecting..." : "Detect"}
                        </button>
                      </label>
                      <div className="autocomplete-container">
                        <input 
                          type="text" 
                          name="city"
                          placeholder="Search city..." 
                          value={formData.city}
                          onChange={handleInputChange}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                          onFocus={() => formData.city.length > 1 && setShowSuggestions(true)}
                          required
                          autoComplete="off"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                          <div className="suggestions-dropdown">
                            {suggestions.map((place, index) => (
                              <div 
                                key={index} 
                                className="suggestion-item"
                                onClick={() => handleSelectSuggestion(place)}
                              >
                                <MapPin size={12} />
                                <span>{place}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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
                  
                  <button 
                    type="submit" 
                    className={`btn btn-primary btn-full magnetic shimmer ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : (isForgot ? 'Send Reset Link' : (isLogin ? 'Sign In' : 'Create Account'))}
                    {!isLoading && <ArrowRight size={18} />}
                  </button>
                </>
              ) : (
                <OtpVerification 
                  email={formData.email}
                  otp={otp}
                  setOtp={setOtp}
                  onVerify={handleSubmit}
                  onResend={handleGetOtp}
                  resendTimer={resendTimer}
                  isLoading={isLoading}
                />
              )}
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