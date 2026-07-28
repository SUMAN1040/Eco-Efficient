import React, { useState } from 'react';
import { X, Building, Mail, Lock, FileText, UploadCloud, ShieldCheck, Loader2, CheckCircle, MapPin, Navigation, Handshake } from 'lucide-react';

const PartnerRequestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    organization_name: '',
    city: '',
    license_document: null,
    gstin_document: null,
    auth_letter_document: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState({
    license: false,
    gstin: false,
    auth: false
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (name === 'city') {
        if (value.length > 2) {
          fetchSuggestions(value);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
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

  const handleDragOver = (e, field) => {
    e.preventDefault();
    setIsDragging(prev => ({ ...prev, [field]: true }));
  };

  const handleDragLeave = (e, field) => {
    e.preventDefault();
    setIsDragging(prev => ({ ...prev, [field]: false }));
  };

  const handleDrop = (e, field, stateKey) => {
    e.preventDefault();
    setIsDragging(prev => ({ ...prev, [field]: false }));
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFormData(prev => ({ ...prev, [stateKey]: e.dataTransfer.files[0] }));
    }
  };

  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-=\+\[\]]/.test(formData.password);
  const isLongEnough = formData.password.length >= 12;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    if (!hasUpperCase || !hasLowerCase || !hasSpecialChar || !isLongEnough) {
      setMessage({ 
        type: 'error', 
        text: 'Password must be at least 12 characters long and contain an uppercase letter, a lowercase letter, and a special symbol.' 
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('organization_name', formData.organization_name);
      data.append('city', formData.city);
      if (formData.license_document) {
        data.append('license_document', formData.license_document);
      }
      if (formData.gstin_document) {
        data.append('gstin_document', formData.gstin_document);
      }
      if (formData.auth_letter_document) {
        data.append('auth_letter_document', formData.auth_letter_document);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/partner-request/`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorMsg = result.detail || result.email || result.error || 'Failed to submit request.';
        setMessage({ type: 'error', text: Array.isArray(errorMsg) ? errorMsg[0] : errorMsg });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="admin-modal-overlay d-flex align-items-center justify-content-center p-4">
        <div className="bg-white rounded-5 p-5 text-center shadow-lg position-relative premium-card" style={{ maxWidth: '500px', width: '100%' }}>
          <button onClick={onClose} className="btn-close-custom">
            <X size={20} />
          </button>
          <div className="mb-4 d-flex justify-content-center success-icon-wrapper">
            <div className="success-icon-bg partner-success-bg">
              <Handshake size={48} className="text-white" />
            </div>
          </div>
          <h2 className="fw-bold mb-3 text-dark">Partnership Request Sent!</h2>
          <p className="text-muted mb-4 fs-5" style={{ lineHeight: '1.6' }}>
            Thank you for applying to be an Eco-Efficient Partner. 
            Our vendor onboarding team will review your organization's credentials and contact you within 24-48 hours.
          </p>
          <button onClick={onClose} className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm w-100 magnetic-btn partner-btn">
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-modal-overlay d-flex align-items-center justify-content-center p-4">
      <div className="bg-white rounded-5 overflow-hidden shadow-lg position-relative d-flex premium-card" style={{ maxWidth: '1000px', width: '100%', minHeight: '600px' }}>
        
        {/* Visual Sidebar */}
        <div className="d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative overflow-hidden partner-sidebar" style={{ width: '45%' }}>
          <div className="position-relative z-2">
            <div className="badge bg-white bg-opacity-25 text-white rounded-pill px-3 py-2 mb-4 d-inline-flex align-items-center gap-2 fw-semibold" style={{ backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Handshake size={16} /> Partner Portal
            </div>
            <h2 className="display-6 fw-bolder mb-3 text-white">Partner With Us</h2>
            <p className="text-white opacity-75 fs-5" style={{ lineHeight: '1.6' }}>
              Scale your recycling or logistics business with our smart ecosystem. Join a network of sustainable innovators.
            </p>
          </div>
          <div className="position-relative z-2 mt-4">
            <ul className="list-unstyled mb-0 d-flex flex-column gap-3 opacity-75">
              <li className="d-flex align-items-center gap-3"><CheckCircle size={18} /> Optimize collection routes</li>
              <li className="d-flex align-items-center gap-3"><CheckCircle size={18} /> Receive sorted waste alerts</li>
              <li className="d-flex align-items-center gap-3"><CheckCircle size={18} /> Inventory management tools</li>
              <li className="d-flex align-items-center gap-3"><CheckCircle size={18} /> Performance reporting</li>
            </ul>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 p-md-5 bg-white position-relative form-side d-flex flex-column" style={{ flex: 1, maxHeight: '90vh', overflowY: 'auto' }}>
          <button onClick={onClose} className="btn-close-custom">
            <X size={20} />
          </button>
          
          <div className="mb-4">
            <h3 className="fw-bolder mb-1 text-dark">Partner Registration</h3>
            <p className="text-muted">Submit your company details for verification.</p>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} py-3 px-4 rounded-4 shadow-sm border-0 d-flex align-items-start gap-3`}>
              <ShieldCheck size={20} className="flex-shrink-0 mt-1" />
              <div>{message.text}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4 flex-grow-1 justify-content-center">
            
            <div className="premium-input-group">
              <div className="input-icon"><Building size={18} /></div>
              <input type="text" name="organization_name" placeholder="Company Name (e.g., GreenRecycle Ltd)" value={formData.organization_name} onChange={handleInputChange} required className="premium-input" />
            </div>

            <div className="premium-input-group position-relative">
              <div className="input-icon"><MapPin size={18} /></div>
              <input 
                type="text" 
                name="city" 
                placeholder="Operation Base (City)" 
                value={formData.city} 
                onChange={handleInputChange} 
                required 
                className="premium-input" 
                autoComplete="off"
              />
              <button 
                type="button" 
                onClick={handleDetectLocation} 
                className="btn btn-sm btn-light position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center gap-1 border-0 fw-semibold"
                disabled={isDetecting}
                style={{ background: 'var(--surface-low)', color: 'var(--primary)', borderRadius: '8px' }}
              >
                {isDetecting ? <Loader2 size={14} className="spin" /> : <Navigation size={14} />}
                Auto Detect
              </button>
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown position-absolute w-100 bg-white shadow-lg rounded-3 mt-1 z-3" style={{ top: '100%', border: '1px solid var(--border-color)' }}>
                  {suggestions.map((place, index) => (
                    <div 
                      key={index} 
                      className="suggestion-item p-3 border-bottom d-flex align-items-center gap-2"
                      onClick={() => handleSelectSuggestion(place)}
                      style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                    >
                      <MapPin size={14} className="text-secondary" />
                      <span className="text-dark small fw-medium">{place}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="premium-input-group">
              <div className="input-icon"><Mail size={18} /></div>
              <input type="email" name="email" placeholder="Business Email" value={formData.email} onChange={handleInputChange} required className="premium-input" />
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="premium-input-group">
                <div className="input-icon"><Lock size={18} /></div>
                <input type="password" name="password" placeholder="Secure Password" value={formData.password} onChange={handleInputChange} required className="premium-input" />
              </div>
              <div className="d-flex flex-wrap gap-3 mt-1 px-1">
                <div className={`small d-flex align-items-center gap-1 ${hasUpperCase ? 'text-success fw-bold' : 'text-muted'}`}>
                  <CheckCircle size={14} className={hasUpperCase ? 'text-success' : 'opacity-25'} /> Uppercase
                </div>
                <div className={`small d-flex align-items-center gap-1 ${hasLowerCase ? 'text-success fw-bold' : 'text-muted'}`}>
                  <CheckCircle size={14} className={hasLowerCase ? 'text-success' : 'opacity-25'} /> Lowercase
                </div>
                <div className={`small d-flex align-items-center gap-1 ${hasSpecialChar ? 'text-success fw-bold' : 'text-muted'}`}>
                  <CheckCircle size={14} className={hasSpecialChar ? 'text-success' : 'opacity-25'} /> Special Char
                </div>
                <div className={`small d-flex align-items-center gap-1 ${isLongEnough ? 'text-success fw-bold' : 'text-muted'}`}>
                  <CheckCircle size={14} className={isLongEnough ? 'text-success' : 'opacity-25'} /> 12+ Chars
                </div>
              </div>
            </div>

            <div className="upload-section mt-2">
              <label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2"><FileText size={16} /> Business License / Incorporation</label>
              <div 
                className={`upload-dropzone ${isDragging.license ? 'dragging' : ''} ${formData.license_document ? 'has-file' : ''}`}
                onDragOver={(e) => handleDragOver(e, 'license')}
                onDragLeave={(e) => handleDragLeave(e, 'license')}
                onDrop={(e) => handleDrop(e, 'license', 'license_document')}
              >
                <input 
                  type="file" 
                  name="license_document" 
                  onChange={handleInputChange} 
                  accept=".pdf,image/*" 
                  className="file-input-hidden" 
                  required
                />
                <div className="upload-content d-flex flex-column align-items-center justify-content-center text-center p-3">
                  <div className="upload-icon-wrapper mb-2" style={{ width: '48px', height: '48px' }}>
                    <UploadCloud size={20} className={formData.license_document ? "text-primary" : "text-success"} />
                  </div>
                  <div className="fw-bold text-dark mb-0 small">
                    {formData.license_document ? formData.license_document.name : "Company License"}
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="upload-section">
                  <label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2"><Building size={16} /> GSTIN Certificate</label>
                  <div 
                    className={`upload-dropzone ${isDragging.gstin ? 'dragging' : ''} ${formData.gstin_document ? 'has-file' : ''}`}
                    onDragOver={(e) => handleDragOver(e, 'gstin')}
                    onDragLeave={(e) => handleDragLeave(e, 'gstin')}
                    onDrop={(e) => handleDrop(e, 'gstin', 'gstin_document')}
                  >
                    <input 
                      type="file" 
                      name="gstin_document" 
                      onChange={handleInputChange} 
                      accept=".pdf,image/*" 
                      className="file-input-hidden" 
                      required
                    />
                    <div className="upload-content d-flex flex-column align-items-center justify-content-center text-center p-3">
                      <div className="upload-icon-wrapper mb-2" style={{ width: '48px', height: '48px' }}>
                        <UploadCloud size={20} className={formData.gstin_document ? "text-primary" : "text-success"} />
                      </div>
                      <div className="fw-bold text-dark mb-0 small">
                        {formData.gstin_document ? formData.gstin_document.name : "Upload GSTIN"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="upload-section">
                  <label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2"><FileText size={16} /> Auth Letter / MoA</label>
                  <div 
                    className={`upload-dropzone ${isDragging.auth ? 'dragging' : ''} ${formData.auth_letter_document ? 'has-file' : ''}`}
                    onDragOver={(e) => handleDragOver(e, 'auth')}
                    onDragLeave={(e) => handleDragLeave(e, 'auth')}
                    onDrop={(e) => handleDrop(e, 'auth', 'auth_letter_document')}
                  >
                    <input 
                      type="file" 
                      name="auth_letter_document" 
                      onChange={handleInputChange} 
                      accept=".pdf,image/*" 
                      className="file-input-hidden" 
                      required
                    />
                    <div className="upload-content d-flex flex-column align-items-center justify-content-center text-center p-3">
                      <div className="upload-icon-wrapper mb-2" style={{ width: '48px', height: '48px' }}>
                        <UploadCloud size={20} className={formData.auth_letter_document ? "text-primary" : "text-success"} />
                      </div>
                      <div className="fw-bold text-dark mb-0 small">
                        {formData.auth_letter_document ? formData.auth_letter_document.name : "Auth Document"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg rounded-pill py-3 mt-4 fw-bold w-100 d-flex align-items-center justify-content-center gap-2 magnetic-btn partner-btn shadow-sm" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 size={20} className="spin" /> Processing...</>
              ) : (
                <><ShieldCheck size={20} /> Submit Partnership Request</>
              )}
            </button>
          </form>
        </div>
      </div>
      
      <style>{`
        .admin-modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px);
          z-index: 1050; padding: 20px; overflow-y: auto;
        }
        
        .premium-card {
          animation: slideUpScale 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes slideUpScale {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .partner-sidebar {
          background-color: #0d2e1c;
          background-image: radial-gradient(circle at 0% 0%, #1e4d3a 0%, transparent 50%), radial-gradient(circle at 100% 100%, #051a10 0%, transparent 50%);
          border-right: 1px solid rgba(0,0,0,0.05);
        }

        .partner-success-bg {
          background: #1e4d3a !important;
          box-shadow: 0 0 0 12px rgba(30, 77, 58, 0.1) !important;
        }

        .partner-btn {
          background-color: #1e4d3a !important;
          border-color: #1e4d3a !important;
        }
        .partner-btn:hover {
          background-color: #163d2e !important;
          border-color: #163d2e !important;
          box-shadow: 0 10px 20px rgba(30, 77, 58, 0.2) !important;
        }

        .btn-close-custom {
          position: absolute; top: 24px; right: 24px; width: 40px; height: 40px;
          border-radius: 50%; border: none; background: var(--surface-low); color: var(--text-dark);
          display: flex; align-items: center; justify-content: center; z-index: 10;
          transition: all 0.2s ease; cursor: pointer;
        }
        .btn-close-custom:hover {
          background: #e2e8f0; transform: rotate(90deg);
        }

        /* Premium Inputs */
        .premium-input-group {
          position: relative;
          display: flex; align-items: center;
        }
        .input-icon {
          position: absolute; left: 16px; color: #94a3b8; pointer-events: none; transition: color 0.3s ease;
        }
        .premium-input {
          width: 100%; padding: 16px 16px 16px 48px; border-radius: 12px;
          border: 2px solid #e2e8f0; background: #f8fafc; color: #1e293b;
          font-size: 1rem; transition: all 0.3s ease; font-weight: 500;
        }
        .premium-input::placeholder { color: #94a3b8; font-weight: 400; }
        .premium-input:focus {
          outline: none; border-color: #1e4d3a; background: #ffffff;
          box-shadow: 0 0 0 4px rgba(30, 77, 58, 0.1);
        }
        .premium-input:focus + .input-icon, .premium-input-group:focus-within .input-icon {
          color: #1e4d3a;
        }

        /* Drag & Drop Zone */
        .upload-dropzone {
          border: 2px dashed #cbd5e1; border-radius: 16px; background: #f8fafc;
          position: relative; transition: all 0.3s ease; overflow: hidden;
        }
        .upload-dropzone:hover, .upload-dropzone.dragging {
          border-color: #1e4d3a; background: #f0fdf4;
        }
        .upload-dropzone.has-file {
          border-style: solid; border-color: #1e4d3a; background: #f0fdf4;
        }
        .file-input-hidden {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0; cursor: pointer; z-index: 5;
        }
        .upload-icon-wrapper {
          width: 64px; height: 64px; border-radius: 50%; background: white;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.3s ease;
        }
        .upload-dropzone:hover .upload-icon-wrapper { transform: scale(1.1) translateY(-5px); }

        /* Success Screen */
        .success-icon-wrapper { position: relative; }
        .success-icon-bg {
          width: 96px; height: 96px; background: var(--primary); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 12px rgba(45, 74, 34, 0.1);
          animation: pulseIcon 2s infinite;
        }
        @keyframes pulseIcon {
          0% { box-shadow: 0 0 0 0 rgba(45, 74, 34, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(45, 74, 34, 0); }
          100% { box-shadow: 0 0 0 0 rgba(45, 74, 34, 0); }
        }

        /* Buttons */
        .magnetic-btn {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .magnetic-btn:hover {
          transform: translateY(-2px);
        }
        .magnetic-btn:active {
          transform: translateY(1px);
        }
        
        .suggestion-item:last-child { border-bottom: none !important; }
        .suggestion-item:hover { background: #f8fafc !important; }
      `}</style>
    </div>
  );
};

export default PartnerRequestForm;
