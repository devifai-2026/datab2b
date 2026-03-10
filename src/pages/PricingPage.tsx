/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Check, ArrowRight, Sparkles, Zap, Building2, Rocket,
  ShieldCheck, DownloadCloud, HeadphonesIcon, RefreshCw,
  Star, ChevronDown, ChevronUp, Mail, Phone,
} from 'lucide-react';
import React from 'react';
import { BsFillRocketTakeoffFill } from 'react-icons/bs';

// ─── Plans Data ───────────────────────────────────────────────────────────────
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    tag: null,
    price: '499',
    period: '/dataset',
    desc: 'Perfect for individuals and small teams just starting out.',
    icon: Zap,
    gradient: 'from-orange-400 to-amber-400',
    bg: 'bg-white',
    border: 'border-orange-200',
    hover: 'hover:border-orange-400 hover:shadow-orange-100',
    textAccent: 'text-orange-600',
    badgeBg: '',
    cta: 'Get Started',
    ctaStyle: 'border-2 border-orange-400 text-orange-600 hover:bg-orange-50',
    features: [
      '1 Dataset Download',
      'Up to 5,000 Contacts',
      'CSV / Excel Format',
      'Email Support',
      '90-day Data Validity',
      'Sample Preview',
    ],
    missing: ['API Access', 'Priority Support', 'Custom Filters', 'Bulk Downloads'],
  },
  {
    id: 'growth',
    name: 'Growth',
    tag: 'Most Popular',
    price: '2,999',
    period: '/month',
    desc: 'Best for growing businesses with consistent data needs.',
    icon: Rocket,
    gradient: 'from-orange-500 to-amber-500',
    bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
    border: 'border-orange-400',
    hover: 'hover:shadow-orange-200',
    textAccent: 'text-orange-600',
    badgeBg: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white',
    cta: 'Start Growing',
    ctaStyle: 'btn-orange',
    features: [
      '5 Dataset Downloads/month',
      'Up to 50,000 Contacts each',
      'CSV / Excel + API Access',
      'Priority Email Support',
      '180-day Data Validity',
      'Custom Industry Filters',
      'Sample Preview',
      'Dashboard Access',
    ],
    missing: ['Dedicated Account Manager', 'Unlimited Records', 'Annual Data Refresh'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tag: null,
    price: 'Custom',
    period: '',
    desc: 'Tailored for large enterprises with bulk data requirements.',
    icon: Building2,
    gradient: 'from-stone-700 to-stone-900',
    bg: 'bg-gradient-to-br from-stone-900 to-stone-800',
    border: 'border-stone-700',
    hover: 'hover:border-orange-500 hover:shadow-orange-900/30',
    textAccent: 'text-orange-400',
    badgeBg: '',
    cta: 'Contact Sales',
    ctaStyle: 'border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10',
    dark: true,
    features: [
      'Unlimited Downloads',
      'Unlimited Records',
      'Dedicated Account Manager',
      'API Integration',
      'Annual Data Refresh',
      'Custom Industry Datasets',
      'SLA Guarantee',
      'Priority Phone Support',
      'White-label Reports',
      'Custom Data Scraping',
    ],
    missing: [],
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'How is the data verified?',
    a: 'Every record in our database goes through a 3-step verification process: automated checks, manual review by our data team, and periodic refreshes to remove stale entries. We maintain a 95%+ accuracy guarantee.',
  },
  {
    q: 'Can I preview data before buying?',
    a: 'Yes! Every dataset page has a "Preview Sample" option that shows you a small anonymised slice of the data — including field names, sample values, and a row count — so you know exactly what you are buying.',
  },
  {
    q: 'What formats do I receive the data in?',
    a: 'Starter and Growth plans receive data as CSV and Excel files. Growth and Enterprise plans also get API access for real-time integration into your CRM or marketing tools.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Yes. If you are unhappy with any dataset within 7 days of purchase, we will either replace it or issue a full refund — no questions asked.',
  },
  {
    q: 'Can I request a custom dataset?',
    a: 'Absolutely. Enterprise customers get dedicated custom data sourcing. Growth customers can request it at an additional fee. Contact us at hello@datab2b.in to discuss your requirements.',
  },
  {
    q: 'How does the monthly Growth plan work?',
    a: 'The Growth plan gives you 5 dataset downloads per month. Downloads reset on your billing date. Unused downloads do not roll over. You can cancel any time from your dashboard.',
  },
  {
    q: 'Do you offer GST invoices?',
    a: 'Yes. All purchases above ₹500 automatically generate a GST-compliant invoice, which you can download from your dashboard at any time.',
  },
];

// ─── Trust Badges ─────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: ShieldCheck, label: '95%+ Accuracy', sub: 'Guaranteed' },
  { icon: DownloadCloud, label: 'Instant Download', sub: 'No waiting' },
  { icon: RefreshCw, label: '7-Day Refund', sub: 'Risk-free' },
  { icon: HeadphonesIcon, label: 'Dedicated Support', sub: 'Mon–Sat 9–6' },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const reviews = [
  { name: 'Rahul K.', role: 'Sales Manager, SaaS Startup', stars: 5, text: 'We bought the Bangalore Tech Startups dataset and closed 3 deals in the first week. ROI was 20x.' },
  { name: 'Meera S.', role: 'Founder, Digital Agency', stars: 5, text: 'Finally a data marketplace that delivers what it promises. Clean, verified, and instant. No more sketchy spreadsheets from random sellers.' },
  { name: 'Amit D.', role: 'BD Head, Manufacturing Co.', stars: 5, text: 'The Enterprise plan pays for itself. We have a dedicated account manager who sources custom datasets for our niche industry every month.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function PlanCard({ plan, idx }: { plan: typeof plans[0]; idx: number }) {
  const Icon = plan.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative flex flex-col rounded-3xl border-2 ${plan.border} ${plan.bg} p-8 shadow-lg transition-all duration-300 ${plan.hover} ${plan.id === 'growth' ? 'shadow-orange-200 scale-105 z-10' : ''}`}
    >
      {/* Popular badge */}
      {plan.tag && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full ${plan.badgeBg} px-5 py-1.5 text-xs font-extrabold uppercase tracking-widest shadow-lg`}>
          {plan.tag}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.gradient} text-white shadow-md`}>
          <Icon size={24} />
        </div>
        <span className={`text-xs font-extrabold uppercase tracking-widest ${plan.dark ? 'text-stone-400' : 'text-stone-500'}`}>
          {plan.name}
        </span>
      </div>

      {/* Price */}
      <div className="mb-2">
        {plan.price === 'Custom' ? (
          <span className={`text-5xl font-extrabold ${plan.dark ? 'text-white' : 'text-stone-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
            Custom
          </span>
        ) : (
          <div className="flex items-end gap-1">
            <span className={`text-2xl font-bold ${plan.dark ? 'text-stone-300' : 'text-stone-500'}`}>₹</span>
            <span className={`text-5xl font-extrabold ${plan.dark ? 'text-white' : 'text-stone-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
              {plan.price}
            </span>
            <span className={`mb-1 text-sm font-medium ${plan.dark ? 'text-stone-400' : 'text-stone-400'}`}>{plan.period}</span>
          </div>
        )}
      </div>
      <p className={`text-sm leading-relaxed mb-7 ${plan.dark ? 'text-stone-400' : 'text-stone-500'}`}>{plan.desc}</p>

      {/* CTA */}
      {plan.id === 'enterprise' ? (
        <a
          href="mailto:hello@datab2b.in"
          className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-extrabold transition-all ${plan.ctaStyle}`}
        >
          {plan.cta} <ArrowRight size={16} />
        </a>
      ) : (
        <Link
          to={plan.id === 'starter' ? '/datasets' : '/register'}
          className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-extrabold transition-all ${plan.ctaStyle}`}
        >
          {plan.cta} <ArrowRight size={16} />
        </Link>
      )}

      {/* Features */}
      <div className="mt-8 flex-1">
        <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${plan.dark ? 'text-stone-400' : 'text-stone-400'}`}>
          What's included
        </p>
        <ul className="space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${plan.gradient}`}>
                <Check size={11} className="text-white" strokeWidth={3} />
              </span>
              <span className={`text-sm font-medium ${plan.dark ? 'text-stone-300' : 'text-stone-700'}`}>{f}</span>
            </li>
          ))}
          {plan.missing.map((f) => (
            <li key={f} className="flex items-center gap-2.5 opacity-30">
              <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${plan.dark ? 'border-stone-600' : 'border-stone-200'}`} />
              <span className={`text-sm font-medium line-through ${plan.dark ? 'text-stone-500' : 'text-stone-400'}`}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function FaqItem({ faq, idx }: { faq: typeof faqs[0]; idx: number }) {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06 }}
      className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${open ? 'border-orange-300 bg-orange-50/50 shadow-md shadow-orange-100' : 'border-orange-100 bg-white hover:border-orange-200'}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-bold text-stone-900 pr-2">{faq.q}</span>
        <span className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-all ${open ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-stone-600 leading-relaxed border-t border-orange-100 pt-4">
          {faq.a}
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-warm">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-5 py-2 text-sm font-bold text-orange-700 mb-6"
          >
            <Sparkles size={15} className="text-orange-500" />
            Simple, Transparent Pricing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-extrabold text-stone-900 sm:text-6xl leading-[1.1]"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Choose the Plan That <span className="gradient-text">Fits Your Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-stone-600 max-w-xl mx-auto"
          >
            No hidden fees. No per-contact pricing. Buy a full dataset for a flat price and start closing deals today.
          </motion.p>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-stone-600"
          >
            {['No credit card required', '7-day money-back', 'Instant download', 'GST Invoice'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check size={14} className="text-orange-500" strokeWidth={3} />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Plans Grid ── */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start">
            {plans.map((plan, idx) => (
              <PlanCard key={plan.id} plan={plan} idx={idx} />
            ))}
          </div>

          {/* One-off note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center text-sm text-stone-500"
          >
            All prices are in INR and exclusive of GST (18%).{' '}
            <a href="mailto:hello@datab2b.in" className="text-orange-600 font-semibold hover:underline">
              Contact us
            </a>{' '}
            if you need a custom volume deal.
          </motion.p>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="border-y-2 border-orange-100 bg-white/70 backdrop-blur-sm py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {trustBadges.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
                  <b.icon size={22} />
                </div>
                <p className="font-extrabold text-stone-900 text-sm">{b.label}</p>
                <p className="text-xs text-stone-500">{b.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Compare All <span className="gradient-text">Features</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border-2 border-orange-100 shadow-xl"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                  <th className="py-4 px-6 text-left font-bold">Feature</th>
                  <th className="py-4 px-4 text-center font-bold">Starter</th>
                  <th className="py-4 px-4 text-center font-bold">Growth</th>
                  <th className="py-4 px-4 text-center font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Dataset Downloads', '1/purchase', '5/month', 'Unlimited'],
                  ['Max Contacts per Dataset', '5,000', '50,000', 'Unlimited'],
                  ['File Formats', 'CSV/Excel', 'CSV/Excel', 'CSV/Excel/API'],
                  ['API Access', '✗', '✓', '✓'],
                  ['Data Validity', '90 days', '180 days', '365 days'],
                  ['Sample Preview', '✓', '✓', '✓'],
                  ['Custom Filters', '✗', '✓', '✓'],
                  ['Dashboard Access', '✗', '✓', '✓'],
                  ['Priority Support', '✗', 'Email', 'Email + Phone'],
                  ['Account Manager', '✗', '✗', '✓'],
                  ['GST Invoice', '✓', '✓', '✓'],
                  ['7-day Refund', '✓', '✓', '✓'],
                  ['Custom Dataset Sourcing', '✗', 'Add-on', '✓'],
                ].map(([feature, starter, growth, enterprise], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'}>
                    <td className="py-3.5 px-6 font-medium text-stone-700">{feature}</td>
                    {[starter, growth, enterprise].map((val, j) => (
                      <td key={j} className="py-3.5 px-4 text-center">
                        {val === '✓' ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto">
                            <Check size={13} strokeWidth={3} />
                          </span>
                        ) : val === '✗' ? (
                          <span className="text-stone-300 font-bold text-lg">—</span>
                        ) : (
                          <span className={`font-semibold ${j === 1 ? 'text-orange-600' : j === 2 ? 'text-stone-700' : 'text-stone-500'}`}>{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 bg-gradient-to-br from-orange-50/60 via-amber-50/30 to-white border-y-2 border-orange-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-extrabold text-stone-900 mb-10"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Trusted by <span className="gradient-text">1,200+ Businesses</span>
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.stars)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">"{r.text}"</p>
                <div>
                  <p className="font-bold text-stone-900 text-sm">{r.name}</p>
                  <p className="text-xs text-orange-600 font-medium">{r.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="mt-3 text-stone-600">Everything you need to know before you buy.</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FaqItem key={idx} faq={faq} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="pb-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 px-8 py-16 text-center text-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.2)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-4xl mb-4 flex justify-center"><BsFillRocketTakeoffFill /></div>
              <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Still Have Questions?
              </h2>
              <p className="mt-3 text-orange-100 text-lg max-w-xl mx-auto">
                Our team is happy to walk you through the right plan for your business. No sales pressure — just straight answers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/datasets"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-extrabold text-orange-600 shadow-xl hover:scale-105 transition-all"
                >
                  Browse Datasets <ArrowRight size={18} />
                </Link>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="mailto:hello@datab2b.in"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white hover:bg-white/20 transition-all"
                  >
                    <Mail size={18} /> Email Us
                  </a>
                  <a
                    href="tel:+918100537052"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white hover:bg-white/20 transition-all"
                  >
                    <Phone size={18} /> Call Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
