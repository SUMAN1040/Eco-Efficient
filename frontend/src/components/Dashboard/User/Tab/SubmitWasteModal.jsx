import React, { useState } from 'react';
import { Plus, X, MapPin, Calendar, Scale, AlignLeft, Send, CheckCircle2 } from 'lucide-react';

const SubmitWasteModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    waste_type: '',
    quantity: '',
    pickup_date: '',
    pickup_location: '',
    additional_notes: ''
  });
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Optional: Reverse geocoding using a free API like Nominatim
            // For now, let's put the coordinates if we can't reverse geocode, 
            // or just mock a string to show it works gracefully.
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            if (data && data.display_name) {
              setFormData(prev => ({ ...prev, pickup_location: data.display_name }));
            } else {
              setFormData(prev => ({ ...prev, pickup_location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
            }
          } catch (error) {
            setFormData(prev => ({ ...prev, pickup_location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Could not detect location. Please enter it manually.');
          setIsLocating(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setIsLocating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto close after 2 seconds on success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          waste_type: '',
          quantity: '',
          pickup_date: '',
          pickup_location: '',
          additional_notes: ''
        });
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
          <div className="modal-header border-0 bg-light p-4 d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-black tracking-tighter d-flex align-items-center gap-2 mb-0">
              <Plus size={20} className="text-success" />
              Submit Waste
            </h5>
            <button type="button" className="btn btn-link text-dark p-0 ms-auto" onClick={onClose} disabled={isSubmitting || isSuccess}>
              <X size={24} />
            </button>
          </div>
          <div className="modal-body p-4 bg-white position-relative">
            {isSuccess ? (
              <div className="text-center py-5 animate-fade-in d-flex flex-column align-items-center justify-content-center">
                <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-4 shadow-sm" style={{ width: '80px', height: '80px', animation: 'scaleUp 0.5s ease' }}>
                  <CheckCircle2 size={40} strokeWidth={2.5} />
                </div>
                <h4 className="fw-black text-success mb-2">Request Submitted!</h4>
                <p className="text-muted fw-bold">Our team will arrive on your scheduled date.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-4 animate-fade-in">
                {/* Waste Type */}
                <div className="form-group">
                  <label className="small fw-black text-muted text-uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>Waste Type</label>
                  <select 
                    name="waste_type" 
                    className="form-select border-0 rounded-4 p-3 fw-bold bg-light" 
                    value={formData.waste_type} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="" disabled>Select material...</option>
                    <option value="Organic">Organic Waste</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Metal">Metal</option>
                    <option value="E-Waste">E-Waste</option>
                  </select>
                </div>

                {/* Quantity */}
                <div className="form-group">
                  <label className="small fw-black text-muted text-uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>Quantity</label>
                  <div className="position-relative">
                    <div className="position-absolute top-50 translate-middle-y ms-3 text-success">
                      <Scale size={18} />
                    </div>
                    <input 
                      type="number" 
                      name="quantity" 
                      className="form-control border-0 rounded-4 py-3 pe-3 bg-light fw-bold" 
                      style={{ paddingLeft: '45px' }}
                      placeholder="Estimated weight in kg" 
                      min="1"
                      step="0.1"
                      value={formData.quantity} 
                      onChange={handleChange} 
                      required 
                    />
                    <div className="position-absolute top-50 end-0 translate-middle-y me-4 fw-bold text-muted small">
                      kg
                    </div>
                  </div>
                </div>

                {/* Pickup Date */}
                <div className="form-group">
                  <label className="small fw-black text-muted text-uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>Pickup Date</label>
                  <div className="position-relative">
                    <div className="position-absolute top-50 translate-middle-y ms-3 text-success">
                      <Calendar size={18} />
                    </div>
                    <input 
                      type="date" 
                      name="pickup_date" 
                      className="form-control border-0 rounded-4 py-3 pe-3 bg-light fw-bold text-muted" 
                      style={{ paddingLeft: '45px' }}
                      value={formData.pickup_date} 
                      onChange={handleChange} 
                      required 
                      min={new Date().toISOString().split('T')[0]} // Cannot pick past dates
                    />
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="form-group">
                  <label className="small fw-black text-muted text-uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>Pickup Location</label>
                  <div className="d-flex gap-2">
                    <div className="position-relative flex-grow-1">
                      <div className="position-absolute top-50 translate-middle-y ms-3 text-success">
                        <MapPin size={18} />
                      </div>
                      <input 
                        type="text" 
                        name="pickup_location" 
                        className="form-control border-0 rounded-4 py-3 pe-3 bg-light fw-bold" 
                        style={{ paddingLeft: '45px' }}
                        placeholder="Enter address" 
                        value={formData.pickup_location} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-success text-white border-0 rounded-4 px-3 fw-bold d-flex align-items-center justify-content-center shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #10b981, #2D4A22)' }}
                      onClick={handleDetectLocation}
                      disabled={isLocating}
                      title="Detect current location"
                    >
                      {isLocating ? <div className="spinner-border spinner-border-sm" role="status"></div> : <MapPin size={20} />}
                    </button>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="form-group">
                  <label className="small fw-black text-muted text-uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>Additional Notes <span className="opacity-50 text-lowercase">(optional)</span></label>
                  <div className="position-relative">
                    <div className="position-absolute ms-3 mt-3 text-success">
                      <AlignLeft size={18} />
                    </div>
                    <textarea 
                      name="additional_notes" 
                      className="form-control border-0 rounded-4 py-3 pe-3 bg-light fw-bold" 
                      style={{ paddingLeft: '45px', minHeight: '100px', resize: 'none' }}
                      placeholder="Any specific instructions for the pickup team?" 
                      value={formData.additional_notes} 
                      onChange={handleChange} 
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-2">
                  <button 
                    type="submit" 
                    className="btn w-100 py-3 rounded-4 fw-black text-uppercase text-white d-flex align-items-center justify-content-center gap-2 shadow-sm transition-all hover-scale"
                    style={{ background: 'linear-gradient(135deg, #10b981, #2D4A22)', border: 'none', letterSpacing: '0.1em' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Processing <div className="spinner-border spinner-border-sm ms-2" role="status"></div></>
                    ) : (
                      <>Confirm Submit <Send size={18} /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitWasteModal;
