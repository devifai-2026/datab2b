/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_DATASETS } from '../constants';
import { ShieldCheck, CreditCard, Mail, Building2, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function CheckoutPage() {
  const { id } = useParams();
  const dataset = MOCK_DATASETS.find((d) => d.id === id);
  const [isPaid, setIsPaid] = React.useState(false);

  if (!dataset) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Dataset not found</h1>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaid(true);
  };

  if (isPaid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-2xl"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-slate-900">Payment Successful!</h2>
          <p className="mt-4 text-lg text-slate-600">
            Thank you for your purchase. A secure download link has been sent to your email address.
          </p>
          <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-blue-700">
            <p className="text-sm font-medium">
              "Download link will be sent to your email."
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4">
            <Link
              to="/dashboard"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition-all hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/datasets"
              className="text-sm font-semibold text-slate-500 hover:text-blue-600"
            >
              Back to Marketplace
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
              <p className="mt-2 text-slate-600">Complete your purchase to access the dataset.</p>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <User size={20} className="text-blue-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Company Name</label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Building2 size={18} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard size={20} className="text-blue-600" />
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-4 rounded-xl border border-blue-600 bg-blue-50 p-4 cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">Credit / Debit Card</div>
                      <div className="text-xs text-slate-500">Secure payment via Stripe</div>
                    </div>
                    <div className="flex gap-2">
                      <img src="https://www.svgrepo.com/show/328112/visa.svg" className="h-6" alt="Visa" />
                      <img src="https://www.svgrepo.com/show/328111/mastercard.svg" className="h-6" alt="Mastercard" />
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="payment" className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">PayPal</div>
                      <div className="text-xs text-slate-500">Fast and secure checkout</div>
                    </div>
                    <img src="https://www.svgrepo.com/show/303233/paypal-logo.svg" className="h-6" alt="PayPal" />
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
                  >
                    Pay ₹{dataset.price}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Building2 size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900">{dataset.title}</div>
                    <div className="text-sm text-slate-500">{dataset.contactCount.toLocaleString()} Verified Records</div>
                  </div>
                  <div className="font-bold text-slate-900">₹{dataset.price}</div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{dataset.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Processing Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-4 text-xl font-bold text-slate-900">
                    <span>Total</span>
                    <span>₹{dataset.price}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span>Verified B2B Company Data</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={18} className="text-blue-600" />
                  <span>Download link sent to your email</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
