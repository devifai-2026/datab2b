/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, CheckCircle2, Star, Zap, ShieldCheck, Download,
  ChevronLeft, ChevronRight, TrendingUp, Users, Building2,
  Database, Award, Globe, Sparkles, Check, BarChart3
} from 'lucide-react';
import {
  FaLaptopCode, FaRocket, FaIndustry, FaShoppingCart, FaHeartbeat, FaBullhorn,
  FaSearch, FaCreditCard, FaDownload
} from 'react-icons/fa';
import { MOCK_DATASETS, TESTIMONIALS } from '../constants';
import DatasetCard from '../components/DatasetCard';
import dataService from '../services/dataService';

// --- Carousel Component ---
const heroSlides = [
  {
    badge: '🚀 The #1 B2B Data Marketplace',
    headline: ['Buy Verified', 'B2B Company Data', 'Instantly'],
    highlight: 1,
    sub: 'Access thousands of verified company databases across industries. Power your sales engine with real, actionable data.',
    cta: 'Browse Datasets',
    ctaLink: '/datasets',
    bg: 'from-orange-50 via-amber-50 to-yellow-50',
    accent: 'text-orange-500',
  },
  {
    badge: '🏆 95%+ Data Accuracy Guaranteed',
    headline: ['Grow Sales with', 'Precision-Targeted', 'Leads'],
    highlight: 1,
    sub: 'Stop wasting time on cold leads. Our verified databases give you direct access to decision makers across India.',
    cta: 'Start Free Trial',
    ctaLink: '/register',
    bg: 'from-orange-50 via-rose-50 to-pink-50',
    accent: 'text-rose-500',
  },
  {
    badge: '⚡ Instant Download, No Wait',
    headline: ['Download Ready', 'Business Data', 'Right Now'],
    highlight: 2,
    sub: 'Pay once and receive your CSV/Excel file instantly in your inbox. Over 50,000 active businesses in our database.',
    cta: 'View Categories',
    ctaLink: '/categories',
    bg: 'from-amber-50 via-orange-50 to-red-50',
    accent: 'text-amber-600',
  },
];

function HeroCarousel() {
  const [current, setCurrent] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/datasets?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/datasets');
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section className="relative overflow-hidden py-6 lg:py-8">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-orange-100/40 to-yellow-100/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex flex-col items-center text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 px-5 py-2.5 text-sm font-bold text-orange-700 border border-orange-200 shadow-sm badge-pulse"
            >
              <Zap size={16} className="text-orange-500" />
              <span>{slide.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight text-stone-900 sm:text-7xl leading-[1.1]"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {slide.headline.map((line, i) => (
                <span key={i} className={i === slide.highlight ? 'gradient-text block' : 'block'}>
                  {line}
                </span>
              ))}
            </motion.h1>

            {/* SubText */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-6 max-w-2xl text-lg text-stone-600 sm:text-xl leading-relaxed"
            >
              {slide.sub}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 w-full max-w-2xl"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                  <svg className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search industry, city, company type..."
                  className="block w-full rounded-2xl border-2 border-orange-100 bg-white/90 py-5 pl-14 pr-40 text-base shadow-xl outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all font-medium text-stone-700"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn-orange px-6 py-3 text-sm font-bold rounded-xl"
                >
                  Search
                </button>
              </form>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                to={slide.ctaLink}
                className="btn-orange flex items-center justify-center gap-2 px-8 py-4 text-lg"
              >
                {slide.cta}
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/categories"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-orange-200 bg-white/80 px-8 py-4 text-lg font-bold text-orange-700 transition-all hover:bg-orange-50 hover:border-orange-400 hover:shadow-lg"
              >
                Explore Categories
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500"
            >
              {['50K+ Business Records', '95%+ Accuracy', 'Instant Download', '100% Secure Payment'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-orange-200 text-orange-500 shadow-sm transition-all hover:bg-orange-50 hover:border-orange-400 hover:shadow-md"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-orange-500' : 'w-2.5 bg-orange-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-orange-200 text-orange-500 shadow-sm transition-all hover:bg-orange-50 hover:border-orange-400 hover:shadow-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

// --- Scrolling Marquee ---
const brands = ['IT Companies', 'Startups', 'Healthcare', 'Manufacturing', 'Real Estate', 'E-Commerce', 'Food & Beverage', 'Retail', 'Finance', 'Education', 'Logistics', 'Pharma'];

function MarqueeBanner() {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 py-4">
      <div className="flex">
        <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="flex items-center gap-3 text-white/90 font-semibold text-sm">
              <Sparkles size={14} className="text-white/70" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Stats Section ---
const stats = [
  { icon: Database, value: '50,000+', label: 'Business Records', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
  { icon: Users, value: '1,200+', label: 'Happy Customers', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  { icon: Building2, value: '30+', label: 'Industries Covered', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
  { icon: TrendingUp, value: '95%+', label: 'Data Accuracy', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { icon: Globe, value: '150+', label: 'Cities in India', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
  { icon: Award, value: '#1', label: 'B2B Data Platform', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
];

function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 blob-orange" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700 mb-4">
            <BarChart3 size={16} /> Our Impact in Numbers
          </span>
          <h2 className="text-4xl font-extrabold text-stone-900 sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Trusted by <span className="gradient-text">1,200+ Businesses</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            We power sales teams across India with verified, actionable B2B data.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className={`flex flex-col items-center rounded-2xl border-2 ${stat.border} ${stat.bg} p-6 text-center shadow-sm transition-all`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ${stat.color} mb-4`}>
                <stat.icon size={24} />
              </div>
              <div className={`text-3xl font-extrabold ${stat.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                {stat.value}
              </div>
              <p className="mt-1 text-xs font-semibold text-stone-600 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Featured Categories ---
const categories = [
  {
    name: 'IT Companies',
    icon: FaLaptopCode,
    iconColor: '#3b82f6',
    iconBg: 'bg-blue-100',
    count: '120+',
    color: 'from-blue-50 to-indigo-50',
    border: 'border-blue-100',
    text: 'text-blue-700',
  },
  {
    name: 'Startups',
    icon: FaRocket,
    iconColor: '#8b5cf6',
    iconBg: 'bg-purple-100',
    count: '85+',
    color: 'from-purple-50 to-violet-50',
    border: 'border-purple-100',
    text: 'text-purple-700',
  },
  {
    name: 'Manufacturing',
    icon: FaIndustry,
    iconColor: '#f97316',
    iconBg: 'bg-orange-100',
    count: '64+',
    color: 'from-orange-50 to-amber-50',
    border: 'border-orange-100',
    text: 'text-orange-700',
  },
  {
    name: 'E-commerce',
    icon: FaShoppingCart,
    iconColor: '#f43f5e',
    iconBg: 'bg-rose-100',
    count: '92+',
    color: 'from-rose-50 to-pink-50',
    border: 'border-rose-100',
    text: 'text-rose-700',
  },
  {
    name: 'Healthcare',
    icon: FaHeartbeat,
    iconColor: '#10b981',
    iconBg: 'bg-emerald-100',
    count: '45+',
    color: 'from-emerald-50 to-green-50',
    border: 'border-emerald-100',
    text: 'text-emerald-700',
  },
  {
    name: 'Marketing',
    icon: FaBullhorn,
    iconColor: '#d97706',
    iconBg: 'bg-yellow-100',
    count: '78+',
    color: 'from-yellow-50 to-orange-50',
    border: 'border-yellow-100',
    text: 'text-yellow-700',
  },
];

function CategoriesSection() {
  return (
    <section className="py-20 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700 mb-4">
            <Sparkles size={16} /> Browse by Category
          </span>
          <h2 className="text-4xl font-extrabold text-stone-900 sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="gradient-text">Featured</span> Categories
          </h2>
          <p className="mt-4 text-lg text-stone-600">Explore curated datasets by industry and business type.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <Link
                to={`/datasets?category=${cat.name}`}
                className={`group flex flex-col items-center rounded-3xl border-2 ${cat.border} bg-gradient-to-br ${cat.color} p-6 text-center transition-all hover:shadow-xl`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${cat.iconBg} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                >
                  <cat.icon size={32} color={cat.iconColor} />
                </div>
                <h3 className={`text-sm font-bold ${cat.text}`}>{cat.name}</h3>
                <p className="mt-1 text-xs text-stone-500 font-medium">{cat.count} Datasets</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Popular Datasets ---
function PopularDatasetsSection() {
  const [datasets, setDatasets] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const data = await dataService.getAllData();
        setDatasets((data as any[]).slice(0, 3));
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };
    fetchDatasets();
  }, []);

  const displayDatasets = datasets;

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700 mb-3">
              <TrendingUp size={16} /> Trending Now
            </span>
            <h2 className="text-4xl font-extrabold text-stone-900 sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Popular <span className="gradient-text">Databases</span>
            </h2>
            <p className="mt-2 text-lg text-stone-600">Our most sought-after datasets this month.</p>
          </div>
          <Link
            to="/datasets"
            className="btn-orange flex items-center gap-2 px-6 py-3 text-sm"
          >
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayDatasets.map((dataset, idx) => (
            <motion.div
              key={dataset.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <DatasetCard dataset={dataset} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- How It Works ---
const steps = [
  {
    step: '01',
    icon: FaSearch,
    iconColor: '#f97316',
    iconBg: 'from-orange-500 to-amber-500',
    title: 'Browse & Search',
    description: 'Search and filter through our extensive collection of B2B datasets by industry, city, or company size.',
    color: 'from-orange-100 to-amber-50',
    border: 'border-orange-200',
  },
  {
    step: '02',
    icon: FaCreditCard,
    iconColor: '#f43f5e',
    iconBg: 'from-rose-500 to-pink-500',
    title: 'Purchase Securely',
    description: 'Pay via Razorpay — India\'s most trusted payment gateway. 100% secure, one-time payment.',
    color: 'from-rose-100 to-pink-50',
    border: 'border-rose-200',
  },
  {
    step: '03',
    icon: FaDownload,
    iconColor: '#10b981',
    iconBg: 'from-emerald-500 to-green-500',
    title: 'Instant Download',
    description: 'Get your CSV/Excel file delivered directly to your inbox instantly. Start prospecting immediately.',
    color: 'from-emerald-100 to-green-50',
    border: 'border-emerald-200',
  },
];

function HowItWorksSection() {
  return (
    <section className="py-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-orange-950 to-stone-900 -z-10" />
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_50%,rgba(249,115,22,0.3)_0%,transparent_60%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_70%_50%,rgba(251,146,60,0.2)_0%,transparent_60%)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-bold text-orange-500 mb-4 border border-orange-500">
            Simple Process
          </span>
          <h2 className="text-4xl font-extrabold text-black sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-4 text-lg text-stone-400 max-w-xl mx-auto">Get started in three simple steps and start generating quality leads today.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-orange-500/40 via-amber-400/40 to-orange-500/40 -translate-y-8" />
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative rounded-3xl border ${item.border} bg-gradient-to-br ${item.color} p-8 text-center shadow-2xl`}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-xs font-black text-white shadow-lg">
                {idx + 1}
              </div>
              {/* React-icon centered */}
              <div className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.iconBg} shadow-xl mx-auto mb-5 mt-4 group-hover:scale-110 transition-transform`}>
                <item.icon size={36} color="#ffffff" />
              </div>
              <div className="text-5xl font-black text-stone-200 opacity-20 mb-[-1.5rem]">{item.step}</div>
              <h3 className="text-xl font-bold text-stone-900 mt-6">{item.title}</h3>
              <p className="mt-3 text-stone-600 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



// --- Testimonials ---
function TestimonialsSection() {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50/60 via-amber-50/30 to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700 mb-4">
            <Star size={16} className="text-amber-500 fill-amber-500" /> Customer Stories
          </span>
          <h2 className="text-4xl font-extrabold text-stone-900 sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Trusted by <span className="gradient-text">Sales Teams</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600">Join 1,200+ companies growing with DataB2B.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-8 shadow-lg transition-all hover:shadow-xl"
            >
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-base italic text-stone-700 leading-relaxed">"{testimonial.content}"</p>
              <div className="mt-6 flex items-center gap-4 pt-6 border-t border-orange-100">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-stone-900">{testimonial.name}</h4>
                  <p className="text-sm text-stone-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CTA Section ---
function CTASection() {
  const bgImage = 'https://images.unsplash.com/photo-1724204400838-ca4cd781cc40?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0';

  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[3rem] px-8 py-20 text-center text-white shadow-2xl glow-orange"
        >
          {/* ── Background Image ── */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />

          {/* ── Deep orange overlay so text stays readable ── */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/85 via-amber-600/80 to-orange-900/90" />

          {/* ── Subtle light leak top-left ── */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15)_0%,transparent_55%)]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl" />
          </div>

          {/* ── Content ── */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-bold mb-6 border border-white/30"
            >
              <Zap size={16} /> Limited Time — Get 20% Off First Purchase
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold tracking-tight sm:text-6xl drop-shadow-lg"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Start Growing Your Sales Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-6 max-w-2xl text-xl text-orange-100 drop-shadow"
            >
              Stop wasting time on cold leads. Get access to verified business contacts now and close deals faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/datasets"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-extrabold text-orange-600 transition-all hover:bg-orange-50 hover:scale-105 shadow-xl"
              >
                Browse Databases
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm px-10 py-5 text-lg font-bold text-white transition-all hover:bg-white/20"
              >
                Sign Up Free
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Main Landing Page ---
export default function LandingPage() {
  return (
    <div className="flex flex-col bg-warm">
      <HeroCarousel />
      <MarqueeBanner />
      <StatsSection />
      <CategoriesSection />
      <PopularDatasetsSection />
      <HowItWorksSection />

      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
