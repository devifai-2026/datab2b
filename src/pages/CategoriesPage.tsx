/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Database } from 'lucide-react';
import { FaLaptopCode, FaRocket, FaHeartbeat, FaIndustry } from 'react-icons/fa';
import categoryService from '../services/categoryService';
import { Category } from '../types';

// ─── Auto-Sliding Banner Data ───────────────────────────────────────────────
const bannerSlides = [
  {
    tag: '🔥 Most Popular',
    title: 'IT Company Databases',
    desc: '120+ verified datasets with direct contact info for decision-makers in India\'s fastest growing tech companies.',
    cta: 'Explore IT Data',
    href: '/datasets?category=IT Companies',
    bg: 'from-orange-500 via-amber-500 to-yellow-500',
    icon: FaLaptopCode,
    stat1: { val: '120+', label: 'Datasets' },
    stat2: { val: '50K+', label: 'Contacts' },
  },
  {
    tag: '🚀 Trending',
    title: 'Startup Founder Contacts',
    desc: 'Reach founders and C-suite executives at funded startups across Bangalore, Mumbai, and Delhi.',
    cta: 'Browse Startups',
    href: '/datasets?category=Startups',
    bg: 'from-purple-500 via-violet-500 to-indigo-500',
    icon: FaRocket,
    stat1: { val: '85+', label: 'Datasets' },
    stat2: { val: '30K+', label: 'Contacts' },
  },
  {
    tag: '🏥 High Demand',
    title: 'Healthcare Professionals',
    desc: 'Verified contact data for doctors, clinic owners, and hospital administrators across major cities.',
    cta: 'View Healthcare',
    href: '/datasets?category=Healthcare',
    bg: 'from-emerald-500 via-teal-500 to-cyan-500',
    icon: FaHeartbeat,
    stat1: { val: '45+', label: 'Datasets' },
    stat2: { val: '20K+', label: 'Contacts' },
  },
  {
    tag: '🏭 Industrial',
    title: 'Manufacturing Units',
    desc: 'Directory of small to large manufacturing plants with owner details, product categories, and capacity.',
    cta: 'Explore Manufacturing',
    href: '/datasets?category=Manufacturing',
    bg: 'from-rose-500 via-pink-500 to-fuchsia-500',
    icon: FaIndustry,
    stat1: { val: '64+', label: 'Datasets' },
    stat2: { val: '40K+', label: 'Contacts' },
  },
];

// ─── Card colour palettes per category ──────────────────────────────────────
const cardPalettes = [
  { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', icon: 'from-orange-500 to-amber-500', badge: 'bg-orange-100 text-orange-700 border-orange-200', text: 'text-orange-600', hover: 'hover:border-orange-400' },
  { bg: 'from-purple-50 to-violet-50', border: 'border-purple-200', icon: 'from-purple-500 to-violet-500', badge: 'bg-purple-100 text-purple-700 border-purple-200', text: 'text-purple-600', hover: 'hover:border-purple-400' },
  { bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-200', icon: 'from-emerald-500 to-teal-500', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', text: 'text-emerald-600', hover: 'hover:border-emerald-400' },
  { bg: 'from-rose-50 to-pink-50', border: 'border-rose-200', icon: 'from-rose-500 to-pink-500', badge: 'bg-rose-100 text-rose-700 border-rose-200', text: 'text-rose-600', hover: 'hover:border-rose-400' },
  { bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200', icon: 'from-blue-500 to-indigo-500', badge: 'bg-blue-100 text-blue-700 border-blue-200', text: 'text-blue-600', hover: 'hover:border-blue-400' },
  { bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-200', icon: 'from-yellow-500 to-amber-500', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', text: 'text-yellow-700', hover: 'hover:border-yellow-400' },
];

// ─── Hero Auto-Slider ────────────────────────────────────────────────────────
function HeroBanner() {
  const [current, setCurrent] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + bannerSlides.length) % bannerSlides.length);
  };

  const slide = bannerSlides[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className={`relative bg-gradient-to-br ${slide.bg} px-8 py-14 md:px-16 md:py-20 text-white overflow-hidden`}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          {/* Big react-icon watermark */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 select-none pointer-events-none hidden md:flex items-center justify-center">
            <slide.icon size={220} />
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Tag */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 px-4 py-1.5 text-sm font-bold backdrop-blur-sm mb-6"
            >
              {slide.tag}
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-extrabold leading-tight md:text-5xl"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {slide.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 text-base text-white/85 leading-relaxed max-w-lg"
            >
              {slide.desc}
            </motion.p>

            {/* Stats + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {/* Stats */}
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/15 border border-white/20 px-4 py-2 backdrop-blur-sm text-center">
                  <div className="text-xl font-extrabold">{slide.stat1.val}</div>
                  <div className="text-xs text-white/70">{slide.stat1.label}</div>
                </div>
                <div className="rounded-2xl bg-white/15 border border-white/20 px-4 py-2 backdrop-blur-sm text-center">
                  <div className="text-xl font-extrabold">{slide.stat2.val}</div>
                  <div className="text-xs text-white/70">{slide.stat2.label}</div>
                </div>
              </div>
              {/* CTA */}
              <Link
                to={slide.href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-stone-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                {slide.cta}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={() => go(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-sm hover:bg-white/40 transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-sm hover:bg-white/40 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Pause indicator */}
      {paused && (
        <div className="absolute top-4 right-4 rounded-full bg-black/20 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
          ⏸ Paused
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CategoriesPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data as Category[]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-warm py-10">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-white pb-10 mb-10">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-amber-200/20 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-5 py-2 text-sm font-bold text-orange-700 mb-5">
              <Sparkles size={15} className="text-orange-500" />
              Browse All Categories
            </span>
            <h1
              className="text-5xl font-extrabold text-stone-900 sm:text-6xl"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Data <span className="gradient-text">Categories</span>
            </h1>
            <p className="mt-4 text-lg text-stone-600 max-w-xl mx-auto">
              Browse our extensive collection of verified B2B datasets by industry. Pick your niche and start prospecting.
            </p>
          </motion.div>

          {/* ── AUTO-SLIDER BANNER ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <HeroBanner />
          </motion.div>
        </div>
      </div>

      {/* ── CATEGORY CARDS ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
            <TrendingUp size={18} />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            All Industries
          </h2>
          <span className="rounded-full bg-orange-100 border border-orange-200 px-3 py-0.5 text-sm font-bold text-orange-700">
            {categories.length} Categories
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => {
            const palette = cardPalettes[idx % cardPalettes.length];
            const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Database;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: idx * 0.07, duration: 0.45 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-3xl border-2 ${palette.border} ${palette.hover} bg-gradient-to-br ${palette.bg} p-8 shadow-sm transition-all duration-300 hover:shadow-xl`}
              >
                {/* Decorative circle */}
                <div className={`absolute -top-8 -right-8 h-28 w-28 rounded-full bg-gradient-to-br ${palette.icon} opacity-10 group-hover:opacity-20 transition-opacity`} />

                {/* Icon + Badge row */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${palette.icon} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={28} />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${palette.badge}`}>
                    {category.datasetCount || 0}{category.datasetCount > 0 ? '+' : ''} Datasets
                  </span>
                </div>

                {/* Name */}
                <h2
                  className="text-2xl font-extrabold text-stone-900 group-hover:text-stone-800 transition-colors relative z-10"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {category.name}
                </h2>


                {/* Bottom row */}
                <div className="mt-7 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                    <Database size={13} className={palette.text} />
                    <span>{category.datasetCount || 0}{category.datasetCount > 0 ? '+' : ''} available</span>
                  </div>
                  <Link
                    to={`/datasets?category=${category.name}`}
                    className={`inline-flex items-center gap-1.5 text-sm font-bold ${palette.text} hover:opacity-80 transition-opacity group-hover:underline`}
                  >
                    View Datasets
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover bottom bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${palette.icon} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-3xl`} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 p-10 text-center text-white shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.2)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-3xl font-extrabold" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Can't Find Your Category?
            </h3>
            <p className="mt-3 text-orange-100 text-lg max-w-lg mx-auto">
              We add new datasets every week. Tell us what you need and we'll source it for you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/datasets"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-extrabold text-orange-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Browse All Datasets
                <ArrowRight size={18} />
              </Link>
              <a
                href="mailto:hello@datab2b.in"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                Request a Category
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
