import React from 'react';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';

const OtpVerification = ({ email, otp, setOtp, onVerify, onResend, resendTimer, isLoading }) => {
  return (
    <div className="otp-verification-container reveal">
      <div className="otp-header-visual">
        <div className="icon-badge">
          <Mail size={32} className="text-secondary" />
        </div>
        <h2 className="headline-sm">Check your inbox</h2>
        <p className="body-xs text-muted">
          We've sent a 6-digit verification code to <br />
          <span className="text-primary font-bold">{email}</span>
        </p>
      </div>

      <div className="otp-input-section">
        <div className="otp-dashed-box">
          <input
            type="text"
            placeholder="0 0 0 0 0 0"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="otp-field-premium"
            maxLength={6}
            autoFocus
          />
        </div>
        
        <button 
          onClick={onVerify}
          className={`btn btn-primary btn-full shimmer ${isLoading ? 'loading' : ''}`}
          disabled={otp.length !== 6 || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Complete Registration'}
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="otp-footer">
        <p className="body-xs text-muted">Didn't receive the code?</p>
        <button 
          className="btn-resend-premium"
          onClick={onResend}
          disabled={resendTimer > 0 || isLoading}
        >
          {resendTimer > 0 ? (
            <span>Resend available in <strong>{resendTimer}s</strong></span>
          ) : (
            <span className="flex-center gap-2">
              <RefreshCw size={14} /> Resend New Code
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
