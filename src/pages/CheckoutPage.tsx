/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_DATASETS } from '../constants';
import { ShieldCheck, CreditCard, Mail, Building2, User, ArrowRight, CheckCircle2, Lock, Download } from 'lucide-react';
import { motion } from 'motion/react';

import dataService from '../services/dataService';
import paymentService from '../services/paymentService';

export default function CheckoutPage() {
  const { id } = useParams();
  const [dataset, setDataset] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPaid, setIsPaid] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    gst: ''
  });

  // Load Razorpay script
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  React.useEffect(() => {
    const fetchDataset = async () => {
      if (!id) return;
      try {
        const data = await dataService.getDataById(id);
        setDataset(data);
      } catch (error) {
        console.error('Error fetching dataset for checkout:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataset();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-warm">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
        <p className="mt-4 text-stone-600 font-bold">Preparing your secure checkout...</p>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="flex h-screen items-center justify-center bg-warm">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-stone-900">Dataset not found</h1>
          <Link to="/datasets" className="mt-4 inline-flex items-center gap-2 btn-orange px-6 py-3 rounded-xl text-sm">
            Browse Datasets <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!(window as any).Razorpay) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      // 1. Create order on backend
      const { order } = await paymentService.createOrder(dataset.price);

      const options = {
        key: 'rzp_test_SG44kbdRqtUqN8', // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: order.currency,
        name: 'Datab2b',
        description: `Purchase for ${dataset.title}`,
        image: '/logo.png', // Or any image URL
        order_id: order.id, // This is the order ID created by backend
        handler: async function (response: any) {
          // This function will be called after successful payment
          try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            const verificationRes = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user._id,
              productId: dataset._id || dataset.id,
              productName: dataset.title || dataset.name,
              amount: dataset.price,
              currency: 'INR',
              quantity: 1,
            });

            if (verificationRes.success) {
              setIsPaid(true);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Something went wrong during payment verification.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        notes: {
          company: formData.company,
          gst: formData.gst,
          dataset_id: dataset.id,
        },
        theme: {
          color: '#f97316', // Orange-500
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        alert('Payment failed: ' + response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Failed to initialize payment. Please try again.');
    }
  };

  // ── Payment Success Screen ──────────────────────────────────────────────────
  if (isPaid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warm px-4">
        {/* Blobs */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-3xl border-2 border-orange-100 bg-white p-10 text-center shadow-2xl shadow-orange-100"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl shadow-emerald-200 mb-6"
          >
            <CheckCircle2 size={48} className="text-white" />
          </motion.div>

          <h2 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Payment Successful! 🎉
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed">
            Thank you for your purchase. A secure download link has been sent to your email address.
          </p>

          {/* Info card */}
          <div className="mt-6 rounded-2xl bg-orange-50 border border-orange-100 p-5 text-left space-y-3">
            <div className="flex items-center gap-3 text-sm text-stone-700">
              <Download size={16} className="text-orange-500 flex-shrink-0" />
              <span>Download link sent to your email instantly</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-700">
              <ShieldCheck size={16} className="text-emerald-500 flex-shrink-0" />
              <span>Your data is 95%+ verified &amp; ready to use</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-700">
              <Lock size={16} className="text-orange-500 flex-shrink-0" />
              <span>Payment secured by Razorpay</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/dashboard"
              className="btn-orange flex items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold"
            >
              Go to Dashboard <ArrowRight size={18} />
            </Link>
            <Link
              to="/datasets"
              className="rounded-2xl border-2 border-orange-200 py-3 text-sm font-bold text-orange-700 hover:bg-orange-50 transition-all"
            >
              Browse More Datasets
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Checkout Form ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-warm py-12">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-200/15 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-4 py-1.5 text-sm font-bold text-orange-700 mb-3">
            <Lock size={13} className="text-orange-500" /> Secure Checkout
          </span>
          <h1 className="text-4xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Complete Your <span className="gradient-text">Purchase</span>
          </h1>
          <p className="mt-2 text-stone-500">You're one step away from accessing verified B2B data.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* ── Left: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <form onSubmit={handlePayment} className="space-y-6">

              {/* Personal info card */}
              <div className="rounded-3xl border-2 border-orange-100 bg-white p-8 shadow-sm space-y-6">
                <h2 className="text-lg font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100">
                    <User size={16} className="text-orange-600" />
                  </span>
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                      placeholder="Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                      placeholder="rahul@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">Company Name</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Building2 size={16} className="text-stone-400" />
                    </div>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-2 border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                      placeholder="Acme Pvt. Ltd."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">GST Number <span className="text-stone-400 font-normal">(optional)</span></label>
                  <input
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>
              </div>

              {/* Payment method card */}
              <div className="rounded-3xl border-2 border-orange-100 bg-white p-8 shadow-sm space-y-5">
                <h2 className="text-lg font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100">
                    <CreditCard size={16} className="text-orange-600" />
                  </span>
                  Payment Method
                </h2>

                {/* Razorpay option */}
                <label className="flex items-center gap-4 rounded-2xl border-2 border-orange-400 bg-orange-50 p-4 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="h-4 w-4 accent-orange-500" />
                  <div className="flex-1">
                    <div className="font-bold text-stone-900">Razorpay</div>
                    <div className="text-xs text-stone-500">India's most trusted payment gateway</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">Recommended</span>
                  </div>
                </label>


                {/* Pay button */}
                <button
                  type="submit"
                  className="btn-orange flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-lg font-extrabold shadow-lg shadow-orange-200 hover:scale-[1.02] transition-transform"
                >
                  <Lock size={18} />
                  Pay ₹{dataset.price} Securely
                  <ArrowRight size={20} />
                </button>

                <p className="text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-500" />
                  256-bit SSL encrypted. Your data is safe.
                </p>
              </div>
            </form>
          </motion.div>

          {/* ── Right: Order Summary ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-24 h-fit space-y-5"
          >
            {/* Summary card */}
            <div className="rounded-3xl border-2 border-orange-100 bg-white p-8 shadow-lg shadow-orange-50">
              <h2 className="text-lg font-extrabold text-stone-900 mb-6">Order Summary</h2>

              {/* Dataset row */}
              <div className="flex items-start gap-4 pb-5 border-b border-orange-100">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
                  <Building2 size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-stone-900 text-sm leading-snug">{dataset.title}</div>
                  <div className="text-xs text-stone-500 mt-0.5">{dataset.contactCount.toLocaleString()} Verified Records</div>
                  <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                    <ShieldCheck size={11} /> Verified Data
                  </div>
                </div>
                <div className="font-extrabold text-stone-900 text-base">₹{dataset.price}</div>
              </div>

              {/* Price breakdown */}
              <div className="pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-stone-500 uppercase tracking-widest text-[10px]">Subtotal (Base)</span>
                  <span className="font-bold text-stone-900">₹{Math.round(dataset.price / 1.18)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-stone-500 uppercase tracking-widest text-[10px]">GST (18% / IGST)</span>
                  <span className="font-bold text-stone-900">₹{dataset.price - Math.round(dataset.price / 1.18)}</span>
                </div>
                <div className="flex justify-between border-t-2 border-orange-100 pt-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-stone-900">Total Price</span>
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Inclusive of taxes</span>
                  </div>
                  <span className="text-2xl font-black text-orange-600">₹{dataset.price}</span>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="rounded-3xl border-2 border-orange-100 bg-white p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-stone-700 uppercase tracking-wider">Why Buy With Us</h3>
              {[
                { icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-50', label: '95%+ Data Accuracy', sub: 'Manually verified records' },
                { icon: Download, color: 'text-orange-500 bg-orange-50', label: 'Instant Download', sub: 'Delivered to your email immediately' },
                { icon: Lock, color: 'text-violet-500 bg-violet-50', label: 'Secure Payment', sub: 'Powered by Razorpay' },
              ].map(({ icon: Icon, color, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${color.split(' ')[1]}`}>
                    <Icon size={16} className={color.split(' ')[0]} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-800">{label}</div>
                    <div className="text-xs text-stone-500">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
