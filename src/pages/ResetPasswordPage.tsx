import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword, verifyOTP, reset } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';
import { MdLock, MdArrowForward, MdDataset, MdShield, MdVpnKey, MdVisibility, MdVisibilityOff, MdCheckCircle } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi2';

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1); // 1: Verify OTP, 2: New Password
  const location = useLocation();
  const passedEmail = location.state?.email || '';

  const [formData, setFormData] = useState({
    otp: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { otp, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // If no email was passed, redirect back to forgot password
    if (!passedEmail) {
      toast.error('Session expired. Please request a new OTP.');
      navigate('/forgot-password');
    }
  }, [passedEmail, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      if (step === 1) {
        toast.success('OTP verified! Now set your new password.');
        setStep(2);
      } else {
        toast.success('Password reset successfully! Please login.');
        navigate('/login');
      }
      dispatch(reset());
    }
  }, [isError, isSuccess, message, navigate, dispatch, step]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    dispatch(verifyOTP({ email: passedEmail, otp }));
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    dispatch(resetPassword({ email: passedEmail, otp, password }));
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fff3e0 50%, #fef9f0 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)' }}>
                <MdDataset size={22} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                data<span className="gradient-text">.b2b</span>
              </span>
            </Link>
          </div>

          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 border border-orange-200 px-4 py-1.5 text-xs font-bold text-orange-700 mb-4">
              <HiSparkles size={13} color="#f97316" />
              {step === 1 ? 'Step 1: Verification' : 'Step 2: New Password'}
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {step === 1 ? 'Verify your OTP' : 'Set new password'}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              {step === 1 
                ? `Enter the 6-digit code sent to ${passedEmail}` 
                : 'Choose a strong password to secure your account.'}
            </p>
          </div>

          <div className="rounded-3xl border-2 border-orange-100 bg-white/90 backdrop-blur-sm p-8 shadow-xl shadow-orange-100/50">
            {step === 1 ? (
              <form className="space-y-5" onSubmit={handleVerifyOTP}>
                {/* OTP */}
                <div>
                  <label htmlFor="otp" className="block text-sm font-bold text-stone-700 mb-1.5">
                    6-Digit Code
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <MdVpnKey size={20} color="#fb923c" />
                    </div>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={onChange}
                      className="block w-full rounded-xl border-2 border-orange-100 bg-orange-50/40 py-3 pl-10 pr-4 text-stone-900 text-sm font-mono tracking-[0.5em] text-center outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder-stone-400"
                      placeholder="000000"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-orange flex w-full items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                  <MdArrowForward size={18} />
                </button>
              </form>
            ) : (
              <form className="space-y-5" onSubmit={handleResetPassword}>
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-stone-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <MdLock size={20} color="#fb923c" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={onChange}
                      className="block w-full rounded-xl border-2 border-orange-100 bg-orange-50/40 py-3 pl-10 pr-12 text-stone-900 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder-stone-400"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 hover:text-orange-600 transition-colors"
                    >
                      {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-bold text-stone-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <MdCheckCircle size={20} color="#fb923c" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={onChange}
                      className="block w-full rounded-xl border-2 border-orange-100 bg-orange-50/40 py-3 pl-10 pr-12 text-stone-900 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder-stone-400"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 hover:text-orange-600 transition-colors"
                    >
                      {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-orange flex w-full items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Reset Password'}
                  <MdArrowForward size={18} />
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 text-center">
             <Link to="/forgot-password" className="text-sm font-bold text-stone-500 hover:text-orange-600 transition-colors">
               ← Go back
             </Link>
          </div>

          {/* Trust note */}
          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-stone-400">
            <MdShield size={15} color="#fb923c" />
            <span>256-bit SSL encryption · Your data is safe</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
