import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MessageSquare,
  Mail,
  Phone,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Zap,
  Shield,
  LifeBuoy,
  Leaf,
  Plus
} from 'lucide-react';

const HelpSupport = () => {
  const navigate = useNavigate();
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState('options');

  const faqs = [
    { q: "How do I schedule a bulk pickup?", a: "Go to your dashboard, scroll to the 'Pickup Schedule' section, and click 'Reschedule Pickup'." },
    { q: "What materials are accepted for recycling?", a: "We accept industrial paper, plastics, glass, and neural material waste. Check the 'Scan Waste' section for AI analysis." },
    { q: "How do I redeem my eco-rewards?", a: "Visit the 'View Rewards' section in your Impact Hub to see available perks and claim them instantly." },
    { q: "Is my industrial data secure?", a: "Yes, all eco-data is encrypted and verified through our secure material tracking system." }
  ];

  const handleEmail = () => {
    window.location.href = "mailto:support@eco-efficient.com?subject=Support%20Request";
  };

  return (
    <div className="min-vh-100 position-relative" style={{ background: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      {/* Background Decor */}
      <div className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="position-absolute rounded-circle" style={{ width: '600px', height: '600px', background: 'rgba(16, 185, 129, 0.04)', top: '-10%', left: '-10%', filter: 'blur(100px)' }}></div>
        <div className="position-absolute rounded-circle" style={{ width: '500px', height: '500px', background: 'rgba(45, 74, 34, 0.04)', bottom: '-5%', right: '-5%', filter: 'blur(100px)' }}></div>
      </div>

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard/user')}
          className="btn btn-link text-success fw-black text-uppercase text-decoration-none p-0 mb-5 d-flex align-items-center gap-2"
          style={{ fontSize: '11px', letterSpacing: '0.1em' }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="text-center mb-5 animate-fade-in">
          <div className="rounded-circle bg-white shadow-sm d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            <LifeBuoy size={40} className="text-success" />
          </div>
          <h1 className="display-5 fw-black text-dark mb-3">How can we help?</h1>
          <p className="lead fw-bold text-muted mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Find answers to common questions or reach out to our sustainability experts for assistance.
          </p>

          {/* Search Bar */}
          <div className="position-relative mx-auto" style={{ maxWidth: '600px' }}>
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-4 text-muted" size={20} />
            <input
              type="text"
              placeholder="Search for answers..."
              className="form-control border-0 rounded-pill shadow-sm py-4 ps-5 pe-4 fw-bold"
              style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}
            />
          </div>
        </div>

        {/* Main Support Categories */}
        <div className="row g-4 mb-5 animate-fade-in d-flex justify-content-center" style={{ animationDelay: '0.1s' }}>
          {[
            {
              icon: <BookOpen size={28} />,
              title: "FAQs",
              desc: "Quick answers to common questions",
              action: "View All Questions",
              onClick: () => setFaqModalOpen(true)
            },
            {
              icon: <MessageSquare size={28} />,
              title: "Contact Support",
              desc: "(Call / Chat / Email)",
              action: "Get in Touch",
              onClick: () => { setContactMethod('options'); setContactModalOpen(true); }
            }
          ].map((card, idx) => (
            <div key={idx} className="col-12 col-md-5 col-lg-4">
              <div
                className="bg-white rounded-5 p-4 p-md-5 h-100 shadow-sm transition-all hover-lift text-center d-flex flex-column align-items-center justify-content-center"
                style={{ border: '2px solid rgba(16, 185, 129, 0.15)' }}
              >
                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center mb-4" style={{ background: '#ecfdf5', color: '#10b981', width: '64px', height: '64px' }}>
                  {card.icon}
                </div>
                <h3 className="h4 fw-black text-dark mb-2">{card.title}</h3>
                <p className="small fw-bold text-muted mb-4 opacity-75">{card.desc}</p>
                <button
                  onClick={card.onClick}
                  className="btn w-100 rounded-pill py-2 fw-black text-uppercase small"
                  style={{ border: '1px solid #10b981', color: '#10b981', fontSize: '9px', letterSpacing: '0.1em' }}
                >
                  {card.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Sections Grid */}
        <div className="row g-5">
          {/* FAQs Section */}
          <div className="col-12 col-lg-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="h5 fw-black text-dark mb-4 text-uppercase tracking-wider" style={{ letterSpacing: '0.1em' }}>Popular Questions</h2>
            <div className="d-flex flex-column gap-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-4 p-4 shadow-sm border-0 transition-all hover-scale" style={{ cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="h6 fw-black text-dark mb-0">{faq.q}</h4>
                    <ChevronRight size={16} className="text-muted" />
                  </div>
                  <p className="small fw-bold text-muted mb-0 lh-base opacity-75">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Feedback & Suggestions Section */}
          <div className="col-12 col-lg-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="fw-black text-dark mb-4 text-uppercase tracking-tighter" style={{ fontSize: '24px', letterSpacing: '-0.02em' }}>Submit Feedback</h2>
            <div className="bg-white rounded-5 p-4 p-md-5 shadow-sm border-0" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
              <div className="mb-4">
                <label className="small fw-black text-muted text-uppercase mb-3 d-block" style={{ fontSize: '10px', letterSpacing: '0.1em', opacity: 0.6 }}>How can we improve?</label>
                <textarea 
                  className="form-control border-0 rounded-4 p-4 fw-bold small" 
                  rows="4"
                  placeholder="Share your ideas or suggestions here..."
                  style={{ background: '#f1f5f9', color: '#2D4A22', resize: 'none', fontSize: '14px' }}
                ></textarea>
              </div>
              <button 
                className="btn btn-success w-100 rounded-pill py-3 fw-black text-uppercase shadow-sm mb-5"
                style={{ background: '#10b981', border: 'none', fontSize: '11px', letterSpacing: '0.05em' }}
              >
                Send Suggestion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Modal Popup */}
      {faqModalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
          style={{
            zIndex: 2000,
            background: 'rgba(45, 74, 34, 0.4)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeIn 0.3s ease forwards'
          }}
        >
          <div
            className="bg-white rounded-5 shadow-lg w-100 position-relative animate-zoom-in"
            style={{ maxWidth: '700px', maxHeight: '85vh', overflowY: 'auto', border: '1px solid rgba(16, 185, 129, 0.1)' }}
          >
            <div className="p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                  <h2 className="h4 fw-black text-dark mb-1">Frequently Asked Questions</h2>
                  <p className="small fw-bold text-muted mb-0">Browse all support documentation</p>
                </div>
                <button
                  onClick={() => setFaqModalOpen(false)}
                  className="btn btn-light rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px' }}
                >
                  <Plus style={{ transform: 'rotate(45deg)' }} size={24} />
                </button>
              </div>

              <div className="d-flex flex-column gap-4">
                {[...faqs,
                { q: "Can I cancel a scheduled pickup?", a: "Yes, you can cancel up to 2 hours before the scheduled time. Just use the 'Reschedule' button and select 'Cancel' in the full scheduler." },
                { q: "Where can I find my recycling invoices?", a: "Invoices are generated automatically and sent to your registered email address at the end of each billing cycle." },
                { q: "How do I update my business location?", a: "Go to Profile Settings > Location to update your industrial pickup address." }
                ].map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-4 bg-light bg-opacity-50 border-0">
                    <h4 className="h6 fw-black text-dark mb-3 d-flex align-items-center gap-2">
                      <div className="rounded-circle bg-success" style={{ width: '6px', height: '6px' }}></div>
                      {faq.q}
                    </h4>
                    <p className="small fw-bold text-muted mb-0 lh-base opacity-75">{faq.a}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-center">
                <button
                  onClick={() => setFaqModalOpen(false)}
                  className="btn btn-success rounded-pill px-5 py-3 fw-black text-uppercase small shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #10b981, #2D4A22)', border: 'none' }}
                >
                  Close Knowledge Base
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support Modal */}
      {contactModalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
          style={{
            zIndex: 2000,
            background: 'rgba(45, 74, 34, 0.4)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeIn 0.3s ease forwards'
          }}
        >
          <div
            className="bg-white rounded-5 shadow-lg w-100 position-relative animate-zoom-in"
            style={{ maxWidth: '500px', border: '1px solid rgba(16, 185, 129, 0.1)' }}
          >
            <div className="p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="h4 fw-black text-dark mb-0">
                  {contactMethod === 'options' ? 'Contact Support' :
                   contactMethod === 'call' ? 'Call Request' : 'Live Chat'}
                </h2>
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="btn btn-light rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px' }}
                >
                  <Plus style={{ transform: 'rotate(45deg)' }} size={24} />
                </button>
              </div>

              {contactMethod === 'options' && (
                <div className="d-flex flex-column gap-3">
                  {[
                    { icon: <Phone />, title: "Call Support", desc: "Request a callback in your language", action: () => setContactMethod('call') },
                    { icon: <MessageSquare />, title: "Live Chat", desc: "Instant chat with our eco-bot", action: () => setContactMethod('chat') },
                    { icon: <Mail />, title: "Email Support", desc: "Open Gmail compose instantly", action: handleEmail }
                  ].map((opt, i) => (
                    <div
                      key={i}
                      onClick={opt.action}
                      className="p-4 rounded-4 bg-light bg-opacity-50 border-0 d-flex align-items-center gap-4 cursor-pointer hover-bg-emerald-50 transition-all"
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="rounded-4 p-3 bg-white shadow-sm text-success">
                        {opt.icon}
                      </div>
                      <div>
                        <h4 className="h6 fw-black text-dark mb-1">{opt.title}</h4>
                        <p className="small fw-bold text-muted mb-0 opacity-75">{opt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {contactMethod === 'call' && (
                <div className="animate-fade-in">
                  <div className="mb-4">
                    <label className="small fw-black text-muted text-uppercase mb-2 d-block" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>Enter Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="form-control border-0 rounded-4 p-3 fw-bold small shadow-sm"
                      style={{ background: 'rgba(16, 185, 129, 0.05)', color: '#2D4A22' }}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="small fw-black text-muted text-uppercase mb-2 d-block" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>Select Language</label>
                    <select
                      className="form-select border-0 rounded-4 p-3 fw-bold small shadow-sm"
                      style={{ background: 'rgba(16, 185, 129, 0.05)', color: '#2D4A22' }}
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Bengali</option>
                    </select>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => setContactModalOpen(false)}
                      className="btn btn-success flex-grow-1 rounded-pill py-3 fw-black text-uppercase shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #10b981, #2D4A22)', border: 'none', fontSize: '10px' }}
                    >
                      Request Call
                    </button>
                    <button
                      onClick={() => setContactMethod('options')}
                      className="btn btn-light rounded-pill px-4 py-3 fw-black text-uppercase shadow-sm"
                      style={{ fontSize: '10px' }}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {contactMethod === 'chat' && (
                <div className="animate-fade-in">
                  <div className="rounded-5 p-4 mb-4 shadow-sm position-relative overflow-hidden" style={{ background: 'rgba(16, 185, 129, 0.05)', height: '250px' }}>
                    <div className="d-flex flex-column gap-3 h-100 justify-content-end">
                      <div className="bg-white rounded-4 p-3 shadow-sm align-self-start border-0" style={{ maxWidth: '80%' }}>
                        <p className="small fw-bold text-dark mb-0">Hi! How can Eco-Bot assist your recycling journey today?</p>
                      </div>
                      <div className="bg-success rounded-4 p-3 shadow-sm align-self-end text-white border-0" style={{ maxWidth: '80%', background: '#2D4A22' }}>
                        <p className="small fw-bold mb-0">I need help with my rewards.</p>
                      </div>
                    </div>
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="form-control border-0 rounded-start-pill p-3 fw-bold small shadow-sm"
                      style={{ background: 'rgba(16, 185, 129, 0.05)', color: '#2D4A22' }}
                    />
                    <button
                      className="btn btn-success rounded-end-pill px-4 shadow-sm"
                      style={{ background: '#2D4A22', border: 'none' }}
                    >
                      Send
                    </button>
                  </div>
                  <button
                    onClick={() => setContactMethod('options')}
                    className="btn btn-link text-success w-100 mt-4 fw-black text-uppercase small text-decoration-none"
                  >
                    Back to options
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease forwards;
        }
        .animate-zoom-in {
          animation: zoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1) !important;
        }
        .hover-bg-emerald-50:hover {
          background: rgba(16, 185, 129, 0.08) !important;
          transform: scale(1.02);
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default HelpSupport;
