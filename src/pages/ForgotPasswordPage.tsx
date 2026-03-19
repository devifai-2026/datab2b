import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { forgotPassword, reset } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';
import { MdEmail, MdArrowBack, MdDataset, MdShield, MdKey } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi2';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess && !submitted) {
      toast.success(message || 'OTP sent to your email!');
      setSubmitted(true);
      dispatch(reset());
      // Small delay before redirecting to reset page
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 2000);
    }
  }, [isError, isSuccess, message, dispatch, submitted, navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fff3e0 50%, #fef9f0 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

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

          <div className="mb-8 text-center text-balance">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 border border-orange-200 px-4 py-1.5 text-xs font-bold text-orange-700 mb-4">
              <HiSparkles size={13} color="#f97316" />
              Password Recovery
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Forgot your password?
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              No worries! Enter your email below and we'll send you a 6-digit OTP code to reset your password.
            </p>
          </div>

          <div className="rounded-3xl border-2 border-orange-100 bg-white/90 backdrop-blur-sm p-8 shadow-xl shadow-orange-100/50">
            {!submitted ? (
              <form className="space-y-5" onSubmit={onSubmit}>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-1.5">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <MdEmail size={20} color="#fb923c" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-xl border-2 border-orange-100 bg-orange-50/40 py-3 pl-10 pr-4 text-stone-900 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder-stone-400"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-orange flex w-full items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold disabled:opacity-50"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP Code'}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MdEmail size={32} color="#16a34a" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Check your email</h3>
                <p className="text-stone-500 text-sm mb-6">
                  We've sent a 6-digit OTP code to <span className="font-bold text-stone-700">{email}</span>. You will be redirected shortly to enter your code.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-orange-600 font-bold hover:underline text-sm"
                >
                  Didn't receive the email? Try again
                </button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-orange-100">
              <Link to="/login" className="flex items-center justify-center gap-2 text-sm font-bold text-stone-500 hover:text-orange-600 transition-colors">
                <MdArrowBack size={18} />
                Back to Login
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
