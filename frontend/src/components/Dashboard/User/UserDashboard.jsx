import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  LayoutDashboard,
  Recycle,
  Coins,
  Calendar,
  Clock,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  Trophy,
  Camera,
  MapPin,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Activity,
  Zap,
  ArrowRight,
  Leaf,
  LifeBuoy,
  X,
  Gift,
  User,
  Lock,
  Check
} from 'lucide-react';
import Impact from './Tab/Impact';
import SettingsModal from './Tab/SettingsModal';
import RewardsModal from './Tab/RewardsModal';
import NotificationsModal from './Tab/NotificationsModal';
import SubmitWasteModal from './Tab/SubmitWasteModal';
// --- Custom Design System for Bootstrap ---
const styles = {
  glassCard: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(16, 185, 129, 0.1)',
    borderRadius: '32px',
    boxShadow: '0 8px 32px 0 rgba(16, 185, 129, 0.05)',
    transition: 'all 0.3s ease'
  },
  brandBg: {
    background: '#2D4A22'
  },
  brandText: {
    color: '#2D4A22'
  },
  emeraldBg: {
    background: '#10b981'
  },
  emeraldText: {
    color: '#10b981'
  },
  header: {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(45, 74, 34, 0.08)',
    zIndex: 1050,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  navLink: {
    fontSize: '0.8rem',
    fontWeight: '800',
    letterSpacing: '0.12em',
    color: 'rgba(45, 74, 34, 0.6)',
    padding: '10px 20px',
    borderRadius: '12px',
    transition: 'all 0.3s ease'
  },
  navLinkActive: {
    color: '#2D4A22',
    background: 'rgba(16, 185, 129, 0.08)'
  }
};

// --- Sub-components for Scalability ---

const GlassCard = ({ children, className = "", style = {} }) => (
  <div
    className={`card border-0 ${className}`}
    style={{ ...styles.glassCard, ...style }}
  >
    <div className="card-body p-0">
      {children}
    </div>
  </div>
);

const StatGauge = ({ value, label, subtext, percentage, className = "" }) => (
  <GlassCard className={`d-flex flex-column align-items-center justify-content-center text-center ${className}`}>
    <div className="position-relative mb-4 d-flex align-items-center justify-content-center" style={{ width: '180px', height: '180px' }}>
      <svg className="w-100 h-100 position-absolute" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx="90"
          cy="90"
          r="80"
          stroke="rgba(16, 185, 129, 0.1)"
          strokeWidth="12"
          fill="transparent"
        />
        <circle
          cx="90"
          cy="90"
          r="80"
          stroke="#10b981"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={502}
          strokeDashoffset={502 - (502 * percentage) / 100}
          strokeLinecap="round"
          style={{ transition: 'all 1s ease-out' }}
        />
      </svg>
      <div className="d-flex flex-column align-items-center justify-content-center position-relative" style={{ zIndex: 1 }}>
        <span className="display-6 fw-black text-dark lh-1">{value}</span>
        <span className="text-uppercase fw-bold text-muted mt-2" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>{label}</span>
      </div>
    </div>
    <p className="fw-bold text-secondary mb-0" style={{ maxWidth: '200px' }}>{subtext}</p>
  </GlassCard>
);

const QuickAction = ({ title, desc, icon, variant = "glass", badge, onClick }) => {
  const getStyles = () => {
    switch (variant) {
      case 'emerald': return {
        bg: 'linear-gradient(135deg, #10b981, #2D4A22)',
        color: '#fff',
        shadow: '0 10px 30px rgba(16, 185, 129, 0.15)',
        border: 'none'
      };
      case 'glass': return {
        bg: 'rgba(255, 255, 255, 0.9)',
        color: '#2D4A22',
        border: '1px solid rgba(45, 74, 34, 0.08)',
        shadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
      };
      case 'outline': return {
        bg: 'rgba(45, 74, 34, 0.02)',
        color: '#2D4A22',
        border: '2px solid rgba(45, 74, 34, 0.08)',
        shadow: '0 2px 10px rgba(0, 0, 0, 0.01)'
      };
      default: return {};
    }
  };

  const vStyle = getStyles();

  return (
    <button
      className={`btn border-0 p-4 p-md-5 w-100 rounded-5 d-flex flex-column align-items-start position-relative overflow-hidden h-100 quick-action-card ${variant}`}
      onClick={onClick}
      style={{
        background: vStyle.bg,
        color: vStyle.color,
        boxShadow: vStyle.shadow,
        border: vStyle.border,
        backdropFilter: variant === 'glass' ? 'blur(10px)' : 'none'
      }}
    >
      {badge && (
        <span
          className="position-absolute top-0 end-0 m-4 px-3 py-1 rounded-pill fw-black text-uppercase shadow-sm"
          style={{ fontSize: '8px', background: '#2D4A22', color: '#fff', letterSpacing: '0.1em', zIndex: 2 }}
        >
          {badge}
        </span>
      )}
      <div
        className="rounded-4 p-3 mb-4 d-flex align-items-center justify-content-center shadow-sm transition-all action-icon-box"
        style={{
          background: variant === 'emerald' ? 'rgba(255,255,255,0.15)' : '#ecfdf5',
          color: variant === 'emerald' ? '#fff' : '#10b981',
          width: '56px',
          height: '56px',
          zIndex: 2
        }}
      >
        {icon && React.isValidElement(icon) && React.cloneElement(icon, { size: 24 })}
      </div>
      <h4 className="h5 fw-black mb-2 text-start position-relative" style={{ zIndex: 2 }}>{title}</h4>
      <p className="small fw-bold opacity-60 mb-0 text-start lh-base position-relative" style={{ maxWidth: '85%', zIndex: 2 }}>{desc}</p>

      {/* Decorative Ghost Watermark */}
      {variant !== 'emerald' && icon && React.isValidElement(icon) && (
        <div
          className="position-absolute bottom-0 end-0 p-0 pointer-events-none watermark-icon transition-all"
          style={{
            transform: 'translate(25%, 25%) rotate(-20deg)',
            opacity: 0.04,
            filter: 'blur(1px)'
          }}
        >
          {React.cloneElement(icon, { size: 180 })}
        </div>
      )}
    </button>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSubmitWasteModal, setShowSubmitWasteModal] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', email: '', phone_number: '', city: '', avatar: '' });
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [pickupDate, setPickupDate] = useState('2026-10-12');
  const [pickupTime, setPickupTime] = useState('09:00 - 11:00 AM');
  const [user] = useState({
    name: 'Suman Kumar',
    rank: 'Elite Guardian',
    balance: '2,450',
    recycled: '85.4 kg',
    impact: '12kg saved',
  });

  useEffect(() => {
    document.title = "EcoEfficient | Dashboard";
    fetchProfileData();
  }, []);

const fetchProfileData = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    const response = await axios.get('http://localhost:8000/api/accounts/profile/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProfileData({
      name: response.data.name || '',
      email: response.data.email || '',
      phone_number: response.data.phone_number || '',
      city: response.data.city || '',
      avatar: response.data.avatar || ''
    });
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return { month: months[isNaN(d.getMonth()) ? 9 : d.getMonth()], day: isNaN(d.getDate()) ? 12 : d.getDate() };
};

const currentDate = formatDate(pickupDate);

const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/auth');
  };

const profileDropdownMenu = (
  <div
    className="position-absolute mt-3 p-2 shadow-lg animate-fade-in"
    style={{
      ...styles.glassCard,
      width: '200px',
      zIndex: 2000,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(45, 74, 34, 0.08)',
      right: 0,
      top: '100%'
    }}
  >
    <div className="d-flex flex-column gap-1">
      <button
        onClick={() => { setShowSettingsModal(true); setProfileOpen(false); fetchProfileData(); }}
        className="btn btn-link w-100 d-flex align-items-center gap-3 px-3 py-2 text-dark text-decoration-none rounded-3 hover-bg-light transition-all"
      >
        <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', background: 'rgba(45, 74, 34, 0.05)', color: '#2D4A22' }}>
          <Settings size={16} />
        </div>
        <span className="small fw-bold">Settings</span>
      </button>
      <button
        onClick={() => navigate('/dashboard/user/help')}
        className="btn btn-link w-100 d-flex align-items-center gap-3 px-3 py-2 text-dark text-decoration-none rounded-3 hover-bg-light transition-all"
      >
        <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', background: 'rgba(16, 185, 129, 0.05)', color: '#10b981' }}>
          <LifeBuoy size={16} />
        </div>
        <span className="small fw-bold">Help Center</span>
      </button>
      <hr className="my-1 opacity-5" />
      <button onClick={handleLogout} className="btn btn-link w-100 d-flex align-items-center gap-3 px-3 py-2 text-danger text-decoration-none rounded-3 hover-bg-light transition-all">
        <div className="rounded-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', background: 'rgba(220, 38, 38, 0.05)', color: '#dc2626' }}>
          <LogOut size={16} />
        </div>
        <span className="small fw-bold">Log Out</span>
      </button>
    </div>
  </div>
);

return (
  <div className="min-vh-100 position-relative overflow-x-hidden" style={{ background: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
    <style>{`
        @keyframes scaleUp {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease forwards;
        }
        .quick-action-card {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .quick-action-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.12) !important;
        }
        .quick-action-card.glass:hover {
          background: rgba(255, 255, 255, 1) !important;
          border-color: rgba(16, 185, 129, 0.3) !important;
        }
        .quick-action-card.outline:hover {
          background: rgba(16, 185, 129, 0.05) !important;
          border-color: rgba(16, 185, 129, 0.4) !important;
        }
        .action-icon-box {
          transition: all 0.3s ease;
        }
        .quick-action-card:hover .watermark-icon {
          transform: translate(15%, 15%) rotate(0deg) scale(1.1) !important;
          opacity: 0.08 !important;
        }
        .quick-action-card:hover .action-icon-box {
          transform: scale(1.1) rotate(-5deg);
        }
      `}</style>

    {/* Background Decor */}
    <div className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="position-absolute rounded-circle" style={{ width: '600px', height: '600px', background: 'rgba(16, 185, 129, 0.04)', top: '-10%', left: '-10%', filter: 'blur(100px)' }}></div>
      <div className="position-absolute rounded-circle" style={{ width: '800px', height: '800px', background: 'rgba(45, 74, 34, 0.03)', bottom: '-20%', right: '-10%', filter: 'blur(120px)' }}></div>
    </div>

    {/* Top Header Navigation */}
    <nav className="navbar navbar-expand-lg fixed-top py-0" style={styles.header}>
      <div className="container-fluid px-3 px-md-5 d-flex align-items-center justify-content-between" style={{ minHeight: '80px' }}>

        {/* Left: Brand */}
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center justify-content-center rounded-3 shadow-sm" style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.08)' }}>
            <Leaf size={24} className="text-success" />
          </div>
          <span className="h5 mb-0 fw-bold d-none d-sm-inline" style={{ color: '#2D4A22', letterSpacing: '-0.02em' }}>EcoEfficient</span>
        </div>

        {/* Mobile Toggle & Actions */}
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex d-lg-none align-items-center gap-2 me-2 position-relative">
            <button className="btn btn-link text-dark p-2 opacity-75" onClick={() => setShowNotificationsModal(true)}><Bell size={18} /></button>
            <div className="rounded-circle border border-2 border-white p-1 bg-white shadow-sm" style={{ width: '60px', height: '60px' }}>
              <img src={profileData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name || 'User'}`} alt="Avatar" className="w-100 h-100 rounded-circle object-fit-cover" />
            </div>

            {/* Glass Dropdown Menu (Mobile) */}
            {profileOpen && profileDropdownMenu}
          </div>
          <button
            className="navbar-toggler border-0 p-2 text-dark shadow-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <Plus style={{ transform: 'rotate(45deg)' }} /> : <LayoutDashboard size={24} />}
          </button>
        </div>

        {/* Center: Primary Navigation */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarMain">
          <ul className="navbar-nav mx-auto gap-1 gap-lg-3 py-3 py-lg-0">
            <li className="nav-item">
              <a
                onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
                className="nav-link text-uppercase text-center fw-black"
                style={{ ...styles.navLink, ...(activeTab === 'overview' ? styles.navLinkActive : {}) }}
                href="#"
              >
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={(e) => { e.preventDefault(); setActiveTab('market'); }}
                className="nav-link text-uppercase text-center fw-black"
                style={{ ...styles.navLink, ...(activeTab === 'market' ? styles.navLinkActive : {}) }}
                href="#"
              >
                Market
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={(e) => { e.preventDefault(); setActiveTab('impact'); }}
                className="nav-link text-uppercase text-center fw-black"
                style={{ ...styles.navLink, ...(activeTab === 'impact' ? styles.navLinkActive : {}) }}
                href="#"
              >
                Impact
              </a>
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            <button
              className="btn btn-link text-dark opacity-50 p-0 hover:opacity-100 position-relative transition-all"
              onClick={() => setShowNotificationsModal(true)}
            >
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success rounded-circle border border-white"></span>
            </button>
            <div className="vr bg-dark opacity-10 mx-2" style={{ height: '24px' }}></div>

            {/* Profile Toggle & Dropdown */}
            <div className="position-relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="btn btn-light rounded-pill p-1 ps-2 pe-3 d-flex align-items-center gap-2 border-0 shadow-sm hover-scale transition-all"
                style={{ background: 'rgba(255, 255, 255, 0.9)' }}
              >
                <div className="rounded-circle overflow-hidden bg-success" style={{ width: '32px', height: '32px' }}>
                  <img src={profileData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name || 'User'}`} alt="Profile" className="w-100 h-100 object-fit-cover" />
                </div>
                <div className="d-none d-md-block text-start">
                  <div className="fw-bold text-dark small lh-1">{profileData.name || 'Eco Warrior'}</div>
                  <div className="text-success fw-bold lh-1 mt-1" style={{ fontSize: '10px' }}>{profileData.city || 'Global'}</div>
                </div>
                <ChevronDown size={14} className="text-muted ms-1" />
              </button>

              {/* Glass Dropdown Menu (Desktop) */}
              {profileOpen && profileDropdownMenu}
            </div>
          </div>
        </div>
      </div>
    </nav>

    {/* Main Content Workspace */}
    <main className="container-fluid px-3 px-md-5" style={{ paddingTop: '100px', paddingBottom: '80px', position: 'relative', zIndex: 1 }}>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>

        {activeTab === 'overview' && (
          <>
            {/* Hero Section */}
        <section className="text-center mb-5 pb-lg-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-success-subtle rounded-pill mb-4 border border-success-subtle">
            <Zap size={12} className="text-success" />
            <span className="fw-black text-success text-uppercase" style={{ fontSize: '9px', letterSpacing: '0.15em' }}>Eco Analytics Active</span>
          </div>
          <h1 className="display-4 display-md-3 fw-black text-dark mb-3 tracking-tighter" style={{ lineHeight: '1.1' }}>
            Welcome back, <span style={styles.brandText}>{user.name.split(' ')[0]}</span>.
          </h1>
          <p className="lead fw-bold text-secondary mx-auto mb-0 px-2" style={{ maxWidth: '700px', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Your precision efforts have reduced corporate carbon output by <span className="text-success fw-black text-decoration-underline" style={{ textUnderlineOffset: '6px' }}>12.5%</span> this quarter.
          </p>
        </section>

        {/* Metrics Grid */}
        <div className="row g-4 mb-5">
          {/* Eco Coin Card */}
          <div className="col-12 col-lg-6">
            <GlassCard className="h-100 p-4 p-md-5 position-relative overflow-hidden">
              <div className="position-relative z-1 d-flex flex-column justify-content-between h-100">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-4 mb-5">
                  <div className="w-100">
                    <h2 className="text-uppercase fw-black text-muted mb-3" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>Eco Coin Balance</h2>
                    <div className="d-flex align-items-baseline gap-3 flex-wrap">
                      <span className="display-4 fw-black text-dark lh-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>{user.balance}</span>
                      <div className="badge bg-success-subtle text-success border border-success-subtle rounded-3 px-3 py-2 fw-black text-uppercase" style={{ fontSize: '9px' }}>
                        <TrendingUp size={10} className="me-1" /> +124 pts
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn w-100 w-sm-auto px-4 py-3 rounded-4 fw-black text-uppercase text-white shadow-lg transition-all hover-scale"
                    style={{ ...styles.brandBg, fontSize: '10px', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
                    onClick={() => navigate('/dashboard/user/redeem')}
                  >
                    Redeem <ArrowRight size={14} className="ms-2" />
                  </button>
                </div>

                {/* Sparkline Visual */}
                <div className="mt-auto pt-4 overflow-hidden">
                  <div className="d-flex align-items-end gap-1 gap-md-2" style={{ height: '60px' }}>
                    {[40, 70, 45, 90, 65, 80, 55, 95, 75, 100].map((h, i) => (
                      <div key={i} className="flex-fill rounded-top-2" style={{ height: `${h}%`, background: 'rgba(45, 74, 34, 0.1)', minWidth: '4px' }}></div>
                    ))}
                  </div>
                </div>
              </div>
              <Zap size={300} color="#2D4A22" className="position-absolute d-none d-md-block" style={{ top: '-80px', right: '-80px', opacity: 0.03, transform: 'rotate(15deg)' }} />
            </GlassCard>
          </div>

          {/* Impact Gauge */}
          <div className="col-12 col-lg-6">
            <StatGauge
              value="42kg"
              label="Submitted"
              percentage={85}
              subtext="12kg saved from landfills this month"
              className="h-100 py-5 px-3"
            />
          </div>
        </div>

        {/* Quick Actions Hub */}
        <section className="mb-5 py-4 text-center">
          <h2 className="text-uppercase fw-black text-muted mb-4 mb-md-5" style={{ fontSize: '11px', letterSpacing: '0.4em' }}>Impact Hub</h2>
          <div className="row g-3 g-md-4">
            <div className="col-12 col-md-4">
              <QuickAction title="Submit Waste" desc="Log new eco-data" icon={<Plus />} variant="emerald" onClick={() => setShowSubmitWasteModal(true)} />
            </div>
            <div className="col-12 col-md-4">
              <QuickAction title="Scan Waste" desc="Analyze material types" icon={<Camera />} variant="glass" badge="New AI" />
            </div>
            <div className="col-12 col-md-4">
              <QuickAction title="View Rewards" desc="Claim your eco-perks" icon={<Trophy />} variant="outline" onClick={() => setShowRewardsModal(true)} />
            </div>
          </div>
        </section>

        {/* Activity & Scheduler */}
        <div className="row g-4 g-lg-5 pt-4">
          <div className="col-12 col-lg-7">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4 mb-md-5">
              <div>
                <h3 className="h5 fw-black text-dark mb-1">Recent Activities</h3>
                <p className="small fw-bold text-muted mb-0">Track your sustainability journey</p>
              </div>
              <button className="btn btn-link text-success fw-black text-uppercase text-decoration-none p-0 text-start" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>View All <ChevronRight size={14} /></button>
            </div>
            <div className="d-flex flex-column gap-3">
              <ActivityTile title="Industrial Paper Recycling" time="2 hours ago" weight="24.5 kg" />
              <ActivityTile title="Neural Material Scan" time="5 hours ago" weight="Verified" />
              <ActivityTile title="Plastic Batch #402" time="Yesterday" weight="12.8 kg" />
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <h3 className="h5 fw-black text-dark mb-4 mb-md-5">Pickup Schedule</h3>
            <GlassCard className="p-4 p-md-5 border-0 shadow-sm overflow-hidden position-relative">
              <div className="position-relative z-1">
                {!isRescheduling ? (
                  <div className="animate-fade-in">
                    <div className="d-flex align-items-center gap-3 gap-md-4 mb-4">
                      <div className="rounded-4 d-flex flex-column align-items-center justify-content-center p-3 shadow-sm" style={{ background: '#ecfdf5', width: '64px', height: '74px' }}>
                        <span className="fw-black text-success text-uppercase" style={{ fontSize: '10px' }}>{currentDate.month}</span>
                        <span className="h4 fw-black text-success mb-0">{currentDate.day}</span>
                      </div>
                      <div>
                        <h4 className="h6 fw-black text-dark mb-1">Bulk Industrial Collection</h4>
                        <p className="small fw-bold text-muted mb-0"><Clock size={12} className="me-1" /> {pickupTime}</p>
                      </div>
                    </div>
                    <hr className="my-4 opacity-5" />
                    <button
                      onClick={() => setIsRescheduling(true)}
                      className="btn w-100 py-3 rounded-4 fw-black text-uppercase transition-all hover-scale"
                      style={{ border: '2px solid rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '10px' }}
                    >
                      Reschedule Pickup
                    </button>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <div className="mb-3">
                      <label className="small fw-black text-muted text-uppercase mb-2 d-block" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>Choose Date</label>
                      <input
                        type="date"
                        className="form-control border-0 rounded-4 p-3 fw-bold small"
                        style={{ background: 'rgba(16, 185, 129, 0.05)', color: '#2D4A22' }}
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="small fw-black text-muted text-uppercase mb-2 d-block" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>Choose Time</label>
                      <select
                        className="form-select border-0 rounded-4 p-3 fw-bold small"
                        style={{ background: 'rgba(16, 185, 129, 0.05)', color: '#2D4A22' }}
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                      >
                        <option>09:00 AM - 11:00 AM</option>
                        <option>12:00 PM - 02:00 PM</option>
                        <option>03:00 PM - 05:00 PM</option>
                      </select>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => setIsRescheduling(false)}
                        className="btn btn-success flex-grow-1 rounded-4 py-3 fw-black text-uppercase shadow-sm"
                        style={{ background: 'linear-gradient(135deg, #10b981, #2D4A22)', border: 'none', fontSize: '10px' }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setIsRescheduling(false)}
                        className="btn btn-light rounded-4 px-4 py-3 fw-black text-uppercase shadow-sm"
                        style={{ fontSize: '10px' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Calendar size={120} color="#10b981" className="position-absolute d-none d-md-block" style={{ bottom: '-30px', right: '-30px', opacity: 0.05 }} />
            </GlassCard>
          </div>
        </div>
        </>
        )}
        
        {activeTab === 'impact' && (
          <Impact />
        )}
      </div>
    </main>

    {/* Modals */}
    <SubmitWasteModal show={showSubmitWasteModal} onClose={() => setShowSubmitWasteModal(false)} />
    <RewardsModal show={showRewardsModal} onClose={() => setShowRewardsModal(false)} />
    <NotificationsModal show={showNotificationsModal} onClose={() => setShowNotificationsModal(false)} />
    <SettingsModal 
      show={showSettingsModal} 
      onClose={() => setShowSettingsModal(false)} 
      profileData={profileData} 
      fetchProfileData={fetchProfileData}
      handleLogout={handleLogout}
    />
  </div>
);
};

const ActivityTile = ({ title, time, weight }) => (
  <GlassCard className="p-3 p-md-4 border-0 shadow-sm transition-all hover-translate-x" style={{ cursor: 'pointer' }}>
    <div className="d-flex align-items-center justify-content-between gap-2">
      <div className="d-flex align-items-center gap-3 gap-md-4">
        <div className="rounded-4 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px', background: 'rgba(45, 74, 34, 0.05)', color: '#2D4A22' }}>
          <Recycle size={20} />
        </div>
        <div>
          <h5 className="small fw-black text-dark mb-1 mb-md-0" style={{ fontSize: '0.9rem' }}>{title}</h5>
          <p className="fw-bold text-muted mb-0 text-uppercase d-none d-md-block" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>{time}</p>
        </div>
      </div>
      <div className="text-end" style={{ minWidth: '80px' }}>
        <p className="fw-black text-dark mb-1 mb-md-0" style={{ fontSize: '0.9rem' }}>{weight}</p>
        <div className="d-flex align-items-center justify-content-end gap-1">
          <div className="rounded-circle bg-success" style={{ width: '5px', height: '5px' }}></div>
          <span className="fw-black text-success text-uppercase" style={{ fontSize: '8px' }}>Verified</span>
        </div>
      </div>
    </div>
  </GlassCard>
);

export default UserDashboard;