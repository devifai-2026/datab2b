import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDataset, MdClose, MdMenu, MdLogout, MdDashboard } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { logout, reset } from '../store/slices/authSlice';
import { cn } from '../lib/utils';
import { toast } from 'react-toastify';
import logo from '../assets/logoo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
    toast.info('Logged out successfully');
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Datasets', href: '/datasets' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-orange-100 shadow-sm shadow-orange-50'
          : 'bg-white/70 backdrop-blur-md border-b border-orange-50'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-200 group-hover:shadow-lg group-hover:shadow-orange-300 transition-all">
                <img className='h-full w-full object-contain' src={logo} alt="Data B2B Logo" />
              </div>
              <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <span className="text-stone-900">data</span>
                <span className="gradient-text">.b2b</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'text-sm font-semibold transition-all hover:text-orange-600 relative group py-1',
                    location.pathname === link.href ? 'text-orange-600' : 'text-stone-600'
                  )}
                >
                  {link.name}
                  <span className={cn(
                    'absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300',
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  )} />
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <div className="flex items-center gap-2 mr-2">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-bold text-stone-700">
                    Hi, {user.name?.split(' ')[0]}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors px-3 py-2"
                >
                  <MdDashboard size={18} />
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors px-3 py-2"
                >
                  <MdLogout size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-orange px-5 py-2.5 text-sm rounded-xl"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-stone-500 hover:bg-orange-50 hover:text-orange-600 focus:outline-none transition-all"
            >
              {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-orange-100 bg-white/95 backdrop-blur-xl">
          <div className="space-y-1 px-4 pb-4 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'block rounded-xl px-4 py-3 text-base font-semibold transition-all',
                  location.pathname === link.href
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-stone-600 hover:bg-orange-50 hover:text-orange-600'
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-orange-50 mb-1">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">{user.name}</p>
                      <p className="text-xs text-stone-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-600 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <MdDashboard size={20} />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-rose-600 hover:bg-rose-50 transition-all"
                  >
                    <MdLogout size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block rounded-xl px-4 py-3 text-center text-base font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-600 transition-all border border-stone-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-orange block px-4 py-3 text-center text-base rounded-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
