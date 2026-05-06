import React, { useState } from 'react';
import axios from 'axios';
import { Settings, User, Lock, Camera, X, Check, Trash2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSettingsModal = ({ show, onClose, profileData, fetchProfileData, handleLogout }) => {
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [deleteAccountMode, setDeleteAccountMode] = useState(false);
  const [deleteStep, setDeleteStep] = useState('confirm'); // 'confirm' -> 'otp' -> 'deleting'
  const [deleteOTP, setDeleteOTP] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [passwordStep, setPasswordStep] = useState('otp');
  const [passwordOTP, setPasswordOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [localProfileData, setLocalProfileData] = useState({ ...profileData });
  const [avatarFile, setAvatarFile] = useState(null);
  const [originalEmail, setOriginalEmail] = useState(profileData.email || '');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const navigate = useNavigate();

  // Handle opening/closing states gracefully
  React.useEffect(() => {
    if (show) {
      setLocalProfileData({ ...profileData });
      setOriginalEmail(profileData.email || '');
      setEditProfileMode(false);
      setChangePasswordMode(false);
      setDeleteAccountMode(false);
      setShowOTPInput(false);
      setOtpValue('');
      setAvatarFile(null);
      setPasswordStep('otp');
      setPasswordOTP('');
      setNewPassword('');
      setConfirmPassword('');
      setDeleteStep('confirm');
      setDeleteOTP('');
    }
  }, [show, profileData]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    if (localProfileData.email !== originalEmail && !showOTPInput) {
      try {
        await axios.post('http://localhost:8000/api/accounts/send-otp/', { email: localProfileData.email });
        setShowOTPInput(true);
        alert('An OTP has been sent to your new email. Please enter it to verify.');
        setIsUpdatingProfile(false);
        return;
      } catch (error) {
        console.error('Failed to send OTP:', error);
        alert(error.response?.data?.email ? error.response.data.email[0] : 'Failed to send OTP. Email might be invalid or in use.');
        setIsUpdatingProfile(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('name', localProfileData.name);
      formData.append('email', localProfileData.email);
      formData.append('phone_number', localProfileData.phone_number);
      formData.append('city', localProfileData.city);
      if (localProfileData.organization) {
        formData.append('organization', localProfileData.organization);
      }
      
      if (showOTPInput) {
        formData.append('otp', otpValue);
      }

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await axios.put('http://localhost:8000/api/accounts/profile/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditProfileMode(false);
      setShowOTPInput(false);
      setOtpValue('');
      setOriginalEmail(localProfileData.email);
      setAvatarFile(null);
      if (response.data?.detail === "Profile updated successfully.") {
        fetchProfileData();
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      if (error.response?.data?.otp) {
        alert('Invalid or expired OTP.');
      } else if (error.response?.data?.email) {
        alert(error.response.data.email[0]);
      } else {
        alert('Failed to update profile. Data might be invalid.');
      }
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleInitiateChangePassword = async () => {
    setChangePasswordMode(true);
    setPasswordStep('otp');
    setPasswordOTP('');
    setNewPassword('');
    setConfirmPassword('');
    setIsChangingPassword(true);
    try {
      await axios.post('http://localhost:8000/api/accounts/send-otp/', { email: profileData.email });
      alert('An OTP has been sent to your email. Please enter it to change your password.');
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert('Failed to send OTP. Please try again later.');
      setChangePasswordMode(false);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:8000/api/accounts/verify-otp/', {
        otp: passwordOTP
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPasswordStep('success');
      setTimeout(() => {
        setPasswordStep('new_password');
      }, 1500);
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      if (error.response?.data?.otp) {
        alert(error.response.data.otp[0]);
      } else {
        alert('Failed to verify OTP. Please try again.');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }
    setIsChangingPassword(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:8000/api/accounts/change-password/', {
        otp: passwordOTP,
        new_password: newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Password changed successfully. You will now be logged out.');
      setChangePasswordMode(false);
      handleLogout();
    } catch (error) {
      console.error('Failed to change password:', error);
      if (error.response?.data?.otp) {
        alert(error.response.data.otp[0]);
      } else {
        alert('Failed to change password. Please check your inputs.');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleInitiateDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await axios.post('http://localhost:8000/api/accounts/send-otp/', { email: profileData.email });
      setDeleteStep('otp');
      alert('An OTP has been sent to your email to confirm account deletion.');
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert('Failed to send OTP. Please try again later.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleVerifyDeleteAccount = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:8000/api/accounts/delete-account/', {
        otp: deleteOTP
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Your account has been deleted successfully.');
      handleLogout();
    } catch (error) {
      console.error('Failed to delete account:', error);
      if (error.response?.data?.otp) {
        alert(error.response.data.otp[0]);
      } else {
        alert('Failed to delete account. Please check your OTP.');
      }
      setIsDeleting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
          <div className="modal-header border-0 bg-light p-4 d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-black tracking-tighter d-flex align-items-center gap-2 mb-0">
              {deleteAccountMode ? <AlertTriangle size={20} className="text-danger" /> : <Settings size={20} className="text-success" />}
              {deleteAccountMode ? 'Delete Account' : editProfileMode ? 'Edit Profile' : changePasswordMode ? 'Change Password' : 'Account Settings'}
            </h5>
            <button type="button" className="btn btn-link text-dark p-0 ms-auto" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="modal-body p-4 bg-white">
            {(!editProfileMode && !changePasswordMode && !deleteAccountMode) ? (
              <div className="d-flex flex-column gap-3">
                <button
                  onClick={() => setEditProfileMode(true)}
                  className="btn bg-white border border-success border-2 rounded-4 p-3 text-start fw-bold d-flex align-items-center gap-3 transition-all hover-scale" style={{ transition: 'transform 0.2s' }}>
                  <div className="bg-success bg-opacity-10 text-success rounded-circle p-2 d-flex align-items-center justify-content-center">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="text-dark">Edit Profile</div>
                    <div className="small text-muted fw-normal">Update your personal information</div>
                  </div>
                </button>
                <button onClick={handleInitiateChangePassword} className="btn bg-white border border-success border-2 rounded-4 p-3 text-start fw-bold d-flex align-items-center gap-3 transition-all hover-scale" style={{ transition: 'transform 0.2s' }}>
                  <div className="bg-success bg-opacity-10 text-success rounded-circle p-2 d-flex align-items-center justify-content-center">
                    <Lock size={20} />
                  </div>
                  <div>
                    <div className="text-dark">Change Password</div>
                    <div className="small text-muted fw-normal">Secure your account credentials</div>
                  </div>
                </button>
                <button onClick={() => setDeleteAccountMode(true)} className="btn bg-white border border-danger border-2 rounded-4 p-3 text-start fw-bold d-flex align-items-center gap-3 transition-all hover-scale mt-2" style={{ transition: 'transform 0.2s' }}>
                  <div className="bg-danger bg-opacity-10 text-danger rounded-circle p-2 d-flex align-items-center justify-content-center">
                    <Trash2 size={20} />
                  </div>
                  <div>
                    <div className="text-danger">Delete Account</div>
                    <div className="small text-muted fw-normal">Permanently erase your account and data</div>
                  </div>
                </button>
              </div>
            ) : editProfileMode ? (
              <form onSubmit={handleUpdateProfile} className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-center mb-2">
                  <div className="position-relative">
                    <div className="rounded-circle overflow-hidden bg-success bg-opacity-10 shadow-sm" style={{ width: '80px', height: '80px' }}>
                      <img
                        src={avatarFile ? URL.createObjectURL(avatarFile) : (localProfileData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${localProfileData.name || 'User'}`)}
                        alt="Profile Avatar"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <label className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow-sm cursor-pointer" style={{ cursor: 'pointer' }}>
                      <Camera size={16} className="text-success" />
                      <input type="file" accept="image/*" className="d-none" onChange={(e) => setAvatarFile(e.target.files[0])} />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label className="small fw-bold text-muted mb-1">Full Name</label>
                  <input
                    type="text"
                    className="form-control bg-light border-0 p-3 rounded-3"
                    value={localProfileData.name}
                    onChange={(e) => setLocalProfileData({ ...localProfileData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="small fw-bold text-muted mb-1">Email Address</label>
                  <input
                    type="email"
                    className="form-control bg-light border-0 p-3 rounded-3"
                    value={localProfileData.email}
                    onChange={(e) => setLocalProfileData({ ...localProfileData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="small fw-bold text-muted mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control bg-light border-0 p-3 rounded-3"
                    value={localProfileData.phone_number}
                    onChange={(e) => setLocalProfileData({ ...localProfileData, phone_number: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="small fw-bold text-muted mb-1">City</label>
                  <input
                    type="text"
                    className="form-control bg-light border-0 p-3 rounded-3"
                    value={localProfileData.city}
                    onChange={(e) => setLocalProfileData({ ...localProfileData, city: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="small fw-bold text-muted mb-1">Organization</label>
                  <input
                    type="text"
                    className="form-control bg-light border-0 p-3 rounded-3"
                    value={localProfileData.organization || ''}
                    onChange={(e) => setLocalProfileData({ ...localProfileData, organization: e.target.value })}
                    required
                  />
                </div>
                {showOTPInput && (
                  <div className="form-group mt-2">
                    <label className="small fw-bold text-success mb-1">Enter OTP to verify new email</label>
                    <input
                      type="text"
                      className="form-control bg-success bg-opacity-10 border-success border-opacity-25 p-3 rounded-3"
                      placeholder="6-digit OTP"
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="d-flex gap-2 mt-2">
                  <button type="submit" className="btn btn-success flex-grow-1 rounded-3 fw-bold shadow-sm" disabled={isUpdatingProfile}>
                    {isUpdatingProfile ? 'Saving...' : (showOTPInput ? 'Verify & Save' : 'Save Changes')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light px-4 rounded-3 fw-bold text-muted"
                    onClick={() => { setEditProfileMode(false); setShowOTPInput(false); setOtpValue(''); }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : changePasswordMode ? (
              <form onSubmit={passwordStep === 'otp' ? handleVerifyOTP : handleChangePasswordSubmit} className="d-flex flex-column gap-3">
                {passwordStep === 'otp' ? (
                  <>
                    <div className="form-group">
                      <label className="small fw-bold text-muted mb-1">Enter OTP sent to {profileData.email}</label>
                      <input type="text" className="form-control rounded-3 p-2 bg-light border-0" value={passwordOTP} onChange={(e) => setPasswordOTP(e.target.value)} required placeholder="Enter OTP" />
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      <button type="submit" className="btn btn-success flex-grow-1 rounded-3 fw-bold shadow-sm" disabled={isChangingPassword}>
                        {isChangingPassword ? 'Verifying...' : 'Next'}
                      </button>
                      <button type="button" onClick={() => setChangePasswordMode(false)} className="btn btn-light px-4 rounded-3 fw-bold text-muted" disabled={isChangingPassword}>Cancel</button>
                    </div>
                  </>
                ) : passwordStep === 'success' ? (
                  <div className="text-center py-5 animate-fade-in">
                    <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-3 shadow-sm" style={{ width: '64px', height: '64px', transform: 'scale(1)', transition: 'transform 0.3s ease', animation: 'scaleUp 0.5s ease' }}>
                      <Check size={32} strokeWidth={3} />
                    </div>
                    <h5 className="fw-black text-success">Verified Successfully</h5>
                    <p className="text-muted small mb-0">Proceeding to change password...</p>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label className="small fw-bold text-muted mb-1">New Password</label>
                      <input type="password" className="form-control rounded-3 p-2 bg-light border-0" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="Enter new password" minLength={8} />
                    </div>
                    <div className="form-group">
                      <label className="small fw-bold text-muted mb-1">Confirm New Password</label>
                      <input type="password" className="form-control rounded-3 p-2 bg-light border-0" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm new password" minLength={8} />
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      <button type="submit" className="btn btn-success flex-grow-1 rounded-3 fw-bold shadow-sm" disabled={isChangingPassword}>
                        {isChangingPassword ? 'Saving...' : 'Save Password'}
                      </button>
                      <button type="button" onClick={() => setChangePasswordMode(false)} className="btn btn-light px-4 rounded-3 fw-bold text-muted" disabled={isChangingPassword}>Cancel</button>
                    </div>
                  </>
                )}
              </form>
            ) : deleteAccountMode ? (
              <div className="d-flex flex-column gap-3 text-center">
                {deleteStep === 'confirm' ? (
                  <>
                    <div className="bg-danger bg-opacity-10 text-danger rounded-circle p-3 d-inline-flex mx-auto mb-2">
                      <AlertTriangle size={32} />
                    </div>
                    <h5 className="fw-bold mb-1">Delete Account</h5>
                    <p className="text-muted small mb-4">
                      Are you sure you want to delete your account? This action is <strong>irreversible</strong> and will permanently erase all your data.
                    </p>
                    <div className="d-flex flex-column gap-2">
                      <button onClick={handleInitiateDeleteAccount} className="btn btn-danger rounded-3 fw-bold p-3 shadow-sm" disabled={isDeleting}>
                        {isDeleting ? 'Sending OTP...' : 'Yes, Delete My Account'}
                      </button>
                      <button onClick={() => setDeleteAccountMode(false)} className="btn btn-light rounded-3 fw-bold p-3 text-muted" disabled={isDeleting}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleVerifyDeleteAccount} className="d-flex flex-column gap-3">
                    <div className="bg-danger bg-opacity-10 text-danger rounded-circle p-3 d-inline-flex mx-auto mb-2">
                      <Lock size={32} />
                    </div>
                    <h5 className="fw-bold mb-1">Verify Deletion</h5>
                    <p className="text-muted small mb-3">
                      Please enter the OTP sent to <strong>{profileData.email}</strong> to confirm account deletion.
                    </p>
                    <div className="form-group mb-2">
                      <input type="text" className="form-control rounded-3 p-3 bg-light border-0 text-center fw-bold letter-spacing-2" placeholder="Enter OTP" value={deleteOTP} onChange={(e) => setDeleteOTP(e.target.value.replace(/\D/g, '').slice(0, 6))} required minLength={6} maxLength={6} />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-danger flex-grow-1 rounded-3 fw-bold shadow-sm" disabled={isDeleting || deleteOTP.length !== 6}>
                        {isDeleting ? 'Deleting...' : 'Confirm Deletion'}
                      </button>
                      <button type="button" onClick={() => setDeleteAccountMode(false)} className="btn btn-light px-4 rounded-3 fw-bold text-muted" disabled={isDeleting}>Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            ) : null}
          </div>
          {(!editProfileMode && !changePasswordMode && !deleteAccountMode) && (
            <div className="modal-footer border-0 bg-light p-3 justify-content-center">
              <button
                className="btn btn-light text-muted rounded-pill px-4 py-2 fw-bold w-100"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsModal;
