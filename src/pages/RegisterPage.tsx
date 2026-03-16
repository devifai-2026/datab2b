import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';
import { MdEmail, MdLock, MdPerson, MdArrowForward, MdDataset, MdShield, MdPhone, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaCheckCircle, FaRocket } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password, phone } = formData;

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
      toast.success('Account created successfully!');
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
    const userData = { name, email, password };
    dispatch(register(userData));
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fff3e0 50%, #fef9f0 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Right panel — branding (desktop only, placed last = right side) */}
      <div className="hidden lg:flex lg:w-1/2 order-last flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
        <div className="absolute top-10 left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 p-10 flex-1 flex flex-col justify-center">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-14">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 border border-white/30 text-white">
              <MdDataset size={22} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              data<span style={{ color: '#fef08a' }}>.b2b</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white font-semibold mb-6 self-start">
            <FaRocket size={14} color="#fef08a" />
            Join 1,200+ businesses today
          </div>

          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Start finding your<br />
            <span style={{ color: '#fef08a' }}>perfect customers</span><br />
            in minutes
          </h1>
          <p className="text-lg leading-relaxed max-w-sm" style={{ color: '#ffedd5' }}>
            Sign up free, browse datasets instantly. No setup fees, no commitment.
          </p>

          <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-5 space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: '#fef08a' }}>What you get for free</p>
            {[
              'Preview any dataset before buying',
              'Sample 10 records from any database',
              'Dashboard to manage all downloads',
              'GST invoice on every purchase',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#fff7ed' }}>
                <FaCheckCircle size={14} color="#fef08a" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-10">
          <p className="text-xs" style={{ color: 'rgba(254,240,138,0.7)' }}>
            © 2026 DataB2B · hello@datab2b.in · +91 81005 37052
          </p>
        </div>
      </div>

      {/* Left panel — form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-10 sm:px-8">
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
              Free Account · No Credit Card
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Create your account
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-orange-600 hover:text-orange-700 hover:underline">
                Sign in here →
              </Link>
            </p>
          </div>

          <div className="rounded-3xl border-2 border-orange-100 bg-white/90 backdrop-blur-sm p-8 shadow-xl shadow-orange-100/50">
            <form className="space-y-4" onSubmit={onSubmit}>

              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-stone-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <MdPerson size={20} color="#fb923c" />
                  </div>
                  <input id="name" name="name" type="text" required
                    value={name}
                    onChange={onChange}
                    className="block w-full rounded-xl border-2 border-orange-100 bg-orange-50/40 py-3 pl-10 pr-4 text-stone-900 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder-stone-400"
                    placeholder="John Doe" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-stone-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <MdPhone size={20} color="#fb923c" />
                  </div>
                  <input id="phone" name="phone" type="tel"
                    value={phone}
                    onChange={onChange}
                    className="block w-full rounded-xl border-2 border-orange-100 bg-orange-50/40 py-3 pl-10 pr-4 text-stone-900 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder-stone-400"
                    placeholder="+91 98765 43210" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-1.5">Work Email</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <MdEmail size={20} color="#fb923c" />
                  </div>
                  <input id="email" name="email" type="email" autoComplete="email" required
                    value={email}
                    onChange={onChange}
                    className="block w-full rounded-xl border-2 border-orange-100 bg-orange-50/40 py-3 pl-10 pr-4 text-stone-900 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder-stone-400"
                    placeholder="name@company.com" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-stone-700 mb-1.5">Password</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <MdLock size={20} color="#fb923c" />
                  </div>
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} required
                    value={password}
                    onChange={onChange}
                    className="block w-full rounded-xl border-2 border-orange-100 bg-orange-50/40 py-3 pl-10 pr-12 text-stone-900 text-sm outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder-stone-400"
                    placeholder="••••••••" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 hover:text-orange-600 transition-colors"
                  >
                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-stone-400">Minimum 8 characters</p>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2.5 pt-1">
                <input id="terms" name="terms" type="checkbox" required
                  className="mt-0.5 h-4 w-4 rounded border-orange-300 accent-orange-500" />
                <label htmlFor="terms" className="text-sm text-stone-600 leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="font-semibold text-orange-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="font-semibold text-orange-600 hover:underline">Privacy Policy</a>
                </label>
              </div>

              {/* Submit */}
              <button type="submit"
                disabled={isLoading}
                className="btn-orange flex w-full items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold mt-1 disabled:opacity-50">
                {isLoading ? 'Creating Account...' : 'Create Free Account'}
                <MdArrowForward size={18} />
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-stone-400">
            <MdShield size={15} color="#fb923c" />
            <span>256-bit SSL encryption · Your data is safe</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


