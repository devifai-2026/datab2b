import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login, reset } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';
import { MdEmail, MdLock, MdArrowForward, MdDataset, MdShield, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Logged in successfully!');
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fff3e0 50%, #fef9f0 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Left panel — branding (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
        <div className="absolute top-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 p-10 flex-1 flex flex-col justify-center">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-14">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 border border-white/30 text-white">
              <MdDataset size={22} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              data<span style={{ color: '#fed7aa' }}>.b2b</span>
            </span>
          </Link>

          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Welcome back to<br />
            <span style={{ color: '#fed7aa' }}>India's #1</span>{' '}
            B2B Data Marketplace
          </h1>
          <p className="text-lg leading-relaxed max-w-sm" style={{ color: '#ffedd5' }}>
            Access 50,000+ verified business contacts across 30+ industries instantly.
          </p>

          <div className="mt-10 space-y-3">
            {[
              '50,000+ Verified Contacts',
              '1,200+ Happy Customers',
              '95%+ Data Accuracy',
              'Instant CSV / Excel Download',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#fff7ed' }}>
                <FaCheckCircle size={15} color="#fed7aa" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-10">
          <p className="text-xs" style={{ color: 'rgba(254,215,170,0.7)' }}>
            © 2026 DataB2B · hello@datab2b.in · +91 81005 37052
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)' }}>
                <MdDataset size={22} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                data<span className="gradient-text">.b2b</span>
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 border border-orange-200 px-4 py-1.5 text-xs font-bold text-orange-700 mb-4">
              <HiSparkles size={13} color="#f97316" />
              Secure Login
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-orange-600 hover:text-orange-700 hover:underline">
                Create one free →
              </Link>
            </p>
          </div>

          <div className="rounded-3xl border-2 border-orange-100 bg-white/90 backdrop-blur-sm p-8 shadow-xl shadow-orange-100/50">
            <form className="space-y-5" onSubmit={onSubmit}>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <MdEmail size={20} color="#fb923c" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={onChange}
                    className="block w-full rounded-xl border-2 border-orange-100 bg-orange-50/40 py-3 pl-10 pr-4 text-stone-900 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder-stone-400"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-bold text-stone-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-orange-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <MdLock size={20} color="#fb923c" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
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

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-orange-300 accent-orange-500"
                />
                <label htmlFor="remember-me" className="text-sm text-stone-600">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-orange flex w-full items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login to Account'}
                <MdArrowForward size={18} />
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

