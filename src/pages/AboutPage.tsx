/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight, Target, Zap, ShieldCheck, Users, Globe, Award,
  Heart, Rocket, TrendingUp, Mail, Phone, MapPin, Sparkles,
  CheckCircle2, Database, Star,
} from 'lucide-react';
import { FaRegLightbulb, FaSeedling, FaChartBar, FaUsers, FaRocket, FaTrophy, FaBolt, FaSearch, FaLaptopCode, FaChartLine } from 'react-icons/fa';
import { TbTargetArrow } from 'react-icons/tb';

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { value: '50K+', label: 'Business Records', icon: Database, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
  { value: '1,200+', label: 'Happy Customers', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  { value: '30+', label: 'Industries Covered', icon: Globe, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
  { value: '95%+', label: 'Data Accuracy', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Data Integrity',
    desc: 'Every record is sourced ethically and verified manually before reaching our marketplace.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
  },
  {
    icon: Zap,
    title: 'Speed & Simplicity',
    desc: "Buy in one click, download instantly. We've removed every friction point in data acquisition.",
    color: 'from-orange-500 to-amber-500',
    bg: 'from-orange-50 to-amber-50',
    border: 'border-orange-200',
  },
  {
    icon: Heart,
    title: 'Customer First',
    desc: 'We obsess over your success. Our 7-day refund policy and support team prove it.',
    color: 'from-rose-500 to-pink-500',
    bg: 'from-rose-50 to-pink-50',
    border: 'border-rose-200',
  },
  {
    icon: Rocket,
    title: 'Always Growing',
    desc: 'New datasets added every week. Request a custom dataset and we\'ll source it for you.',
    color: 'from-purple-500 to-violet-500',
    bg: 'from-purple-50 to-violet-50',
    border: 'border-purple-200',
  },
  {
    icon: Globe,
    title: 'India-focused',
    desc: 'Hyper-local data across 150+ Indian cities. We understand the nuances of the Indian market.',
    color: 'from-blue-500 to-indigo-500',
    bg: 'from-blue-50 to-indigo-50',
    border: 'border-blue-200',
  },
  {
    icon: Award,
    title: 'Accuracy Guaranteed',
    desc: '95%+ verified accuracy on all records. If data doesn\'t meet standards, we replace it.',
    color: 'from-yellow-500 to-orange-400',
    bg: 'from-yellow-50 to-orange-50',
    border: 'border-yellow-200',
  },
];

const team = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    bio: 'Ex-sales leader with 8+ years in B2B. Built DataB2B to solve the data problem he faced daily.',
    avatar: 'https://picsum.photos/seed/arjun_ceo/200/200',
    badge: FaRocket,
    badgeColor: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Data Quality',
    bio: 'Former data analyst at a Fortune 500. Leads our team of 20 manual verification specialists.',
    avatar: 'https://picsum.photos/seed/priya_data/200/200',
    badge: FaSearch,
    badgeColor: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Rohan Gupta',
    role: 'CTO',
    bio: 'Full-stack engineer with a passion for clean, fast products. Built our entire platform from scratch.',
    avatar: 'https://picsum.photos/seed/rohan_cto/200/200',
    badge: FaLaptopCode,
    badgeColor: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Sneha Bose',
    role: 'Head of Growth',
    bio: 'Growth hacker who scaled our customer base 10x in the first year. Loves data as much as she sells it.',
    avatar: 'https://picsum.photos/seed/sneha_growth/200/200',
    badge: FaChartLine,
    badgeColor: 'from-emerald-500 to-teal-500',
  },
];

const milestones = [
  { year: '2022', title: 'Company Founded', desc: 'DataB2B was born in Kolkata with a vision to democratize B2B data in India.', icon: FaSeedling },
  { year: '2023', title: '10,000 Records', desc: 'Reached our first 10,000 verified business contacts milestone.', icon: FaChartBar },
  { year: '2023', title: '500 Customers', desc: 'Our growing customer base proved there was real demand for verified B2B data.', icon: FaUsers },
  { year: '2024', title: '50,000+ Records', desc: 'Expanded across 30+ industries and 150+ Indian cities.', icon: FaRocket },
  { year: '2025', title: '1,200+ Customers', desc: 'Trusted by 1,200+ sales teams, marketers, and entrepreneurs across India.', icon: FaTrophy },
  { year: '2026', title: 'API Launch', desc: 'Launching real-time data API access for enterprise customers and developers.', icon: FaBolt },
];

// ─── Section Components ───────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-br from-orange-100/30 to-yellow-100/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-5 py-2 text-sm font-bold text-orange-700 mb-6"
            >
              <Sparkles size={15} className="text-orange-500" />
              Our Story
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-extrabold text-stone-900 sm:text-6xl leading-[1.1]"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              We Make{' '}
              <span className="gradient-text">B2B Data</span>
              {' '}Accessible to Every Business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-stone-600 leading-relaxed max-w-lg"
            >
              DataB2B was built by a sales team that got tired of bad, expensive, and hard-to-access business data. We set out to build the marketplace we always wished existed — verified, affordable, and instant.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/datasets" className="btn-orange flex items-center justify-center gap-2 px-7 py-4 text-base rounded-xl">
                Browse Datasets <ArrowRight size={18} />
              </Link>
              <a
                href="mailto:hello@datab2b.in"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-orange-200 bg-white px-7 py-4 text-base font-bold text-orange-700 hover:bg-orange-50 hover:border-orange-400 transition-all"
              >
                <Mail size={18} /> Contact Us
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-5 text-sm text-stone-500"
            >
              {['Founded 2022', 'Kolkata, India', '1,200+ Customers'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-orange-500" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — decorative card stack */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Background card */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-200/40 blur-sm" />
            <div className="relative rounded-3xl border-2 border-orange-200 bg-white/90 p-8 shadow-2xl shadow-orange-100">
              {/* Mission card */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">Our Mission</p>
                  <p className="text-lg font-extrabold text-stone-900">Democratize B2B Data</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed mb-7">
                Make high-quality, verified business contact data affordable and instantly accessible for every business in India — from solo founders to enterprise sales teams.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className={`rounded-2xl border ${s.border} ${s.bg} p-4`}>
                    <div className={`text-2xl font-extrabold ${s.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
                    <div className="text-xs text-stone-500 font-medium mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="border-y-2 border-orange-100 bg-white/80 backdrop-blur-sm py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color} flex-shrink-0`}>
                <stat.icon size={22} />
              </div>
              <div>
                <div className={`text-2xl font-extrabold ${stat.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-stone-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValuesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-5 py-2 text-sm font-bold text-orange-700 mb-4">
            <Heart size={15} className="text-orange-500" /> What We Stand For
          </span>
          <h2 className="text-4xl font-extrabold text-stone-900 sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our <span className="gradient-text">Core Values</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 max-w-xl mx-auto">
            Every decision we make is guided by these principles — from how we source data to how we serve customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.45 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-3xl border-2 ${v.border} bg-gradient-to-br ${v.bg} p-7 shadow-sm transition-all hover:shadow-xl`}
            >
              <div className={`absolute -top-8 -right-8 h-28 w-28 rounded-full bg-gradient-to-br ${v.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${v.color} text-white shadow-md mb-5 group-hover:scale-110 transition-transform`}>
                <v.icon size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-stone-900 mb-2">{v.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{v.desc}</p>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${v.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-3xl`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-stone-900 via-orange-950 to-stone-900" />
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_50%,rgba(249,115,22,0.4)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_70%_80%,rgba(251,146,60,0.3)_0%,transparent_60%)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/40 px-5 py-2 text-sm font-bold text-orange-600 mb-6">
              <Target size={15} /> Our Mission
            </span>
            <h2 className="text-4xl font-extrabold  sm:text-5xl leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Powering India's Sales Teams with{' '}
              <span className="gradient-text">Precision Data</span>
            </h2>
            <p className="mt-6 text-stone-400 leading-relaxed text-lg">
              In India, good business data has always been hard to find, expensive to buy, and impossible to trust. We changed that. DataB2B is the marketplace where you can discover, preview, and instantly download verified datasets — at prices every business can afford.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Make data acquisition as easy as e-commerce shopping',
                'Verify every record before it ever reaches a customer',
                'Cover every niche — from IT startups to street-side retail',
                'Keep prices honest so small businesses can compete',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-500 text-sm">
                  <CheckCircle2 size={18} className="text-orange-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Story card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-orange-500/20 bg-white/5 backdrop-blur-sm p-8"
          >
            <div className="text-5xl mb-4"><FaRegLightbulb /></div>
            <h3 className="text-2xl font-extrabold  mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              The Problem We Solved
            </h3>
            <div className="space-y-5">
              {[
                { bad: 'Buying data from brokers at ₹10–20 per lead', good: 'Buy full datasets from ₹499. No per-lead pricing.' },
                { bad: 'Getting 60% bounce rates from unverified emails', good: '95%+ verified accuracy on every contact.' },
                { bad: 'Waiting days to receive data via WhatsApp', good: 'Pay online → download instantly from dashboard.' },
                { bad: 'No way to preview before buying', good: 'Sample preview  on every dataset page.' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-start gap-2 text-sm text-rose-400 font-medium mb-2">
                    <span className="text-base">❌</span> {item.bad}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-emerald-400 font-semibold">
                    <span className="text-base">✅</span> {item.good}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="py-20 bg-white/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 border border-amber-200 px-5 py-2 text-sm font-bold text-amber-700 mb-4">
            <TrendingUp size={15} className="text-amber-500" /> Our Journey
          </span>
          <h2 className="text-4xl font-extrabold text-stone-900 sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            From Idea to <span className="gradient-text">1,200+ Customers</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-amber-300 to-orange-200 sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-8">
            {milestones.map((m, idx) => {
              const isRight = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className={`relative flex items-center gap-6 sm:gap-0 ${isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Content card */}
                  <div className={`ml-14 sm:ml-0 w-full sm:w-[calc(50%-2rem)] ${isRight ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'}`}>
                    <div className={`rounded-2xl border-2 border-orange-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all`}>
                      <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">{m.year}</span>
                      <h3 className="text-base font-extrabold text-stone-900 mt-1">{m.title}</h3>
                      <p className="text-sm text-stone-500 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-sm shadow-lg shadow-orange-200 border-2 border-white z-10">
                    <m.icon size={14} />
                  </div>

                  {/* Empty side on desktop */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-5 py-2 text-sm font-bold text-orange-700 mb-4">
            <Users size={15} className="text-orange-500" /> The Team
          </span>
          <h2 className="text-4xl font-extrabold text-stone-900 sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Meet the People <span className="gradient-text">Behind DataB2B</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600">A passionate team obsessed with data quality and customer success.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border-2 border-orange-100 bg-white/90 p-6 text-center shadow-sm hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100 transition-all"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-20 w-20 rounded-2xl object-cover ring-4 ring-orange-100 group-hover:ring-orange-300 transition-all"
                  referrerPolicy="no-referrer"
                />
                <span className={`absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${member.badgeColor} text-white shadow-md border-2 border-white`}>
                  <member.badge size={13} />
                </span>
              </div>

              <h3 className="text-base font-extrabold text-stone-900">{member.name}</h3>
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mt-0.5">{member.role}</p>
              <p className="mt-3 text-sm text-stone-500 leading-relaxed">{member.bio}</p>

              {/* Stars */}
              <div className="mt-4 flex justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="py-14 bg-gradient-to-r from-orange-50 via-amber-50 to-white border-y-2 border-orange-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Get in <span className="gradient-text">Touch</span>
            </h3>
            <p className="mt-1 text-stone-600">We'd love to hear from you — questions, custom requests, or partnerships.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { icon: Mail, label: 'hello@datab2b.in', href: 'mailto:hello@datab2b.in' },
              { icon: Phone, label: '+91 81005 37052', href: 'tel:+918100537052' },
              { icon: MapPin, label: 'Kolkata, India', href: '#' },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-2.5 rounded-xl border-2 border-orange-100 bg-white px-4 py-3 text-sm font-semibold text-stone-700 hover:border-orange-400 hover:text-orange-600 transition-all shadow-sm hover:shadow-md"
              >
                <c.icon size={17} className="text-orange-500" />
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 px-8 py-20 text-center text-white shadow-2xl glow-orange"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.2)_0%,transparent_50%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="text-5xl mb-5 mx-auto flex justify-center"><TbTargetArrow /></div>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Ready to Supercharge Your Sales?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-xl text-orange-100">
              Join 1,200+ businesses who trust DataB2B for verified, instant-download B2B contact data.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/datasets"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-extrabold text-orange-600 shadow-xl transition-all hover:scale-105 hover:bg-orange-50"
              >
                Browse Datasets <ArrowRight size={20} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-10 py-4 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-warm">
      <HeroSection />
      <StatsBar />
      <ValuesSection />
      <MissionSection />
      <TimelineSection />
      <TeamSection />
      <ContactStrip />
      <CTASection />
    </div>
  );
}
