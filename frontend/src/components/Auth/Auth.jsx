import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin, Phone, ArrowRight, ShieldAlert, Briefcase, ChevronLeft, Navigation, Loader2, CheckCircle } from 'lucide-react';
import OtpVerification from './OtpVerification';

const Auth = () => {
  const navigate = useNavigate();
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
  const [showRoleWarning, setShowRoleWarning] = useState(false);

  React.useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  React.useEffect(() => {
    let warningTimer;
    if ((role === 'admin' || role === 'partner') && isLogin) {
      setShowRoleWarning(true);
      warningTimer = setTimeout(() => {
        setShowRoleWarning(false);
      }, 7000);
    } else {
      setShowRoleWarning(false);
    }
    return () => clearTimeout(warningTimer);
  }, [role, isLogin]);

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
        const city = data.address.city || data.address.town || data.address.village || data.address.municipality || data.address.county || data.address.state_district || data.address.suburb || data.address.name;
        const state = data.address.state || data.address.region || "";
        const country = data.address.country || "";
        
        let locationString = city ? city : "Unknown Area";
        if (state && state !== city) locationString += `, ${state}`;
        if (country) locationString += `, ${country}`;
        
        setFormData(prev => ({ ...prev, city: locationString }));
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/send-otp/`, {
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

  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-=\+\[\]]/.test(formData.password);
  const isLongEnough = formData.password.length >= 12;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Explicit stage handling for registration
    if (!isLogin && !isOtpSent) {
      if (!hasUpperCase || !hasLowerCase || !hasSpecialChar || !isLongEnough) {
        setMessage({ 
          type: 'error', 
          text: 'Password must be at least 12 characters long and contain an uppercase letter, a lowercase letter, and a special symbol.' 
        });
        return;
      }

      handleGetOtp();
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const baseUrl = `${import.meta.env.VITE_API_URL}/api/accounts`;
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
          
          // Small timeout to allow user to see success message before routing
          setTimeout(() => {
            if (data.role === 'ADMIN') {
              navigate('/dashboard/admin');
            } else if (data.role === 'PARTNER') {
              navigate('/dashboard/partner');
            } else {
              navigate('/dashboard/user');
            }
          }, 1000);
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
    <div className="auth-page position-relative overflow-hidden d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-stone)' }}>
      <div className="auth-bg-gradient position-absolute" style={{ top: '-10%', right: '-5%', width: '50%', height: '60%', background: 'radial-gradient(circle at 70% 30%, rgba(130, 147, 117, 0.2), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      
      <div className="container position-relative z-1 d-flex justify-content-center">
        <div className="row bg-white auth-card-wrap overflow-hidden w-100 reveal active shadow-lg" style={{ maxWidth: '1000px', borderRadius: '16px' }}>
          
          {/* Visual Side */}
          <div className="col-lg-5 auth-visual-side p-5 d-none d-lg-flex flex-column justify-content-between position-relative text-white" style={{ background: 'var(--primary)' }}>
            <div className="auth-visual-content position-relative z-1">
              <h2 className="display-6 fw-bold mb-3">Join the <span className="text-secondary">Revolution.</span></h2>
              <p className="text-white-50" style={{ lineHeight: 1.6 }}>
                Be part of a global network transforming urban waste into communal wealth.
              </p>
            </div>
            <div className="auth-visual-footer d-flex gap-5 position-relative z-1">
              <div className="d-flex flex-column">
                <span className="fs-3 fw-bold text-secondary">50k+</span>
                <span className="text-uppercase text-white-50" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>Users</span>
              </div>
              <div className="d-flex flex-column">
                <span className="fs-3 fw-bold text-secondary">120+</span>
                <span className="text-uppercase text-white-50" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>Cities</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="position-absolute bottom-0 end-0" style={{ width: '150px', height: '150px', background: 'rgba(130, 147, 117, 0.1)', borderRadius: '50% 0 0 0' }} />
          </div>

          {/* Form Side */}
          <div className="col-lg-7 auth-form-side p-4 p-md-5 d-flex flex-column bg-white">
            <div className="auth-header mb-4">
              {isForgot && (
                <button className="back-btn text-uppercase d-flex align-items-center gap-2 mb-4 bg-transparent border-0 text-primary fw-bold p-0" style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }} onClick={() => setIsForgot(false)}>
                  <ChevronLeft size={16} /> Back to Sign In
                </button>
              )}
              {isOtpSent && !isLogin && (
                <button className="back-btn text-uppercase d-flex align-items-center gap-2 mb-4 bg-transparent border-0 text-primary fw-bold p-0" style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }} onClick={() => setIsOtpSent(false)}>
                  <ChevronLeft size={16} /> Edit Details
                </button>
              )}
              <h1 className="fs-3 fw-bold text-primary mb-1">
                {isForgot ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Get Started')}
              </h1>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                {isForgot 
                  ? 'Enter your details to receive a secure reset link.'
                  : (isLogin 
                    ? 'Access your eco-dashboard to track your impact.' 
                    : (isOtpSent ? 'Verify your email to complete registration.' : 'Create your account to start monetizing your recycling.'))}
              </p>
            </div>

            {message.text && (
              <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'} py-2 px-3 mb-4`} style={{ fontSize: '0.9rem', borderRadius: '8px' }}>
                {message.text}
              </div>
            )}

            <form className="auth-form d-flex flex-column gap-3" onSubmit={handleSubmit}>
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
                        className="w-100"
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
                        <span className="d-flex align-items-center gap-2"><MapPin size={14} /> Location</span>
                        <button 
                          type="button" 
                          className="detect-btn bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded px-2 py-1 d-flex align-items-center gap-1" 
                          style={{ fontSize: '11px', fontWeight: 600 }}
                          onClick={handleDetectLocation}
                          disabled={isDetecting}
                          title="Detect current location"
                        >
                          {isDetecting ? <Loader2 size={12} className="spin" /> : <Navigation size={12} />}
                          {isDetecting ? "Detecting..." : "Detect"}
                        </button>
                      </label>
                      <div className="autocomplete-container position-relative">
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
                          className="w-100"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                          <div className="suggestions-dropdown">
                            {suggestions.map((place, index) => (
                              <div 
                                key={index} 
                                className="suggestion-item"
                                onClick={() => handleSelectSuggestion(place)}
                              >
                                <MapPin size={12} className="text-secondary" />
                                <span>{place}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {!isForgot && (
                    <div className="d-flex flex-column gap-2 mb-3">
                      <div className="input-group-nature mb-0">
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
                      {!isLogin && (
                        <div className="d-flex flex-wrap gap-2 mt-1 px-1">
                          <div className={`small d-flex align-items-center gap-1 ${hasUpperCase ? 'text-success fw-bold' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
                            <CheckCircle size={12} className={hasUpperCase ? 'text-success' : 'opacity-25'} /> Uppercase
                          </div>
                          <div className={`small d-flex align-items-center gap-1 ${hasLowerCase ? 'text-success fw-bold' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
                            <CheckCircle size={12} className={hasLowerCase ? 'text-success' : 'opacity-25'} /> Lowercase
                          </div>
                          <div className={`small d-flex align-items-center gap-1 ${hasSpecialChar ? 'text-success fw-bold' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
                            <CheckCircle size={12} className={hasSpecialChar ? 'text-success' : 'opacity-25'} /> Special Char
                          </div>
                          <div className={`small d-flex align-items-center gap-1 ${isLongEnough ? 'text-success fw-bold' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
                            <CheckCircle size={12} className={isLongEnough ? 'text-success' : 'opacity-25'} /> 12+ Chars
                          </div>
                        </div>
                      )}
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

                  {showRoleWarning && (
                    <div className="alert alert-warning py-2 px-3 mt-2 mb-2 d-flex gap-2 align-items-start shadow-sm" style={{ fontSize: '0.8rem', borderRadius: '10px', backgroundColor: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' }}>
                      <ShieldAlert size={16} className="flex-shrink-0 mt-1" />
                      <div>
                        <strong>Wait!</strong> If you don't have an approved {role === 'admin' ? 'Admin' : 'Partner'} account, you cannot log in here. Please visit our official website to submit an application request first.
                      </div>
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
                    <div className="auth-options d-flex justify-content-between align-items-center mt-2" style={{ fontSize: '0.85rem' }}>
                      <label className="checkbox-wrap d-flex align-items-center gap-2 text-muted" style={{ cursor: 'pointer' }}>
                        <input type="checkbox" />
                        <span>Remember me</span>
                      </label>
                      <button type="button" className="link-text-btn-alt bg-transparent border-0 text-primary fw-semibold p-0" onClick={() => setIsForgot(true)}>
                        Forgot password?
                      </button>
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className={`btn btn-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 py-2 mt-3 fw-bold magnetic shimmer ${isLoading ? 'loading' : ''}`}
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
              <div className="auth-footer-toggle text-center text-muted mt-4 pt-3" style={{ fontSize: '0.9rem' }}>
                <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                <button className="bg-transparent border-0 text-primary fw-bold ms-2 p-0" style={{ cursor: 'pointer' }} onClick={handleToggleMode}>
                  {isLogin ? 'Create one now' : 'Sign in instead'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Auth CSS */}
      <style>{`
        .auth-page { padding: 120px 24px 60px; }
        .auth-form-side { overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--surface-low) transparent; }
        
        .input-group-nature label {
          font-size: 0.75rem; font-weight: 800; color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 8px;
        }
        
        .input-group-nature input {
          padding: 12px 14px; background: var(--bg-stone); border: 1px solid transparent;
          border-radius: var(--radius-sm); font-size: 0.9rem; transition: all 0.3s ease;
        }
        
        .input-group-nature input:focus {
          outline: none; border-color: var(--secondary); background: white;
          box-shadow: 0 4px 12px rgba(130, 147, 117, 0.1);
        }

        .select-nature {
          width: 100%; box-sizing: border-box; appearance: none; padding: 14px 16px;
          background-color: var(--bg-stone); border: 1px solid transparent; border-radius: var(--radius-sm);
          font-size: 0.95rem; color: var(--primary); font-weight: 500; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232d4a22' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center; background-size: 16px;
          transition: all 0.3s ease;
        }
        
        .select-nature:focus { outline: none; border-color: var(--secondary); background-color: white; box-shadow: 0 4px 12px rgba(130, 147, 117, 0.1); }
        .select-nature:disabled { background-image: none; cursor: default; opacity: 0.8; }

        .suggestions-dropdown {
          position: absolute; top: calc(100% + 4px); left: 0; right: 0;
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); z-index: 1000; overflow: hidden;
          animation: slideDown 0.2s ease-out;
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .suggestion-item {
          padding: 10px 16px; display: flex; align-items: center; gap: 10px;
          cursor: pointer; transition: all 0.2s ease; font-size: 13px; color: #334155;
        }
        
        .suggestion-item:hover { background: rgba(34, 197, 94, 0.05); color: #166534; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .reveal-input { animation: organicReveal 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes organicReveal {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }
        
        @media (max-width: 991px) {
          .auth-card-wrap { max-width: 500px !important; }
        }
        @media (max-width: 768px) {
          .auth-page { padding: 100px 16px 40px; height: auto; align-items: flex-start; }
          .auth-form-side { padding: 40px 24px !important; }
        }
      `}</style>
    </div>
  );
};

export default Auth;