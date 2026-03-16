/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-warm py-20 px-4">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-4 py-1.5 text-sm font-bold text-orange-700 mb-4">
            <RefreshCcw size={14} className="text-orange-500" /> Confidence Guaranteed
          </span>
          <h1 className="text-5xl font-extrabold text-stone-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Refund <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            We value your satisfaction. Here's our commitment to quality and how we handle refund requests.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl border-2 border-orange-100 bg-white/90 p-10 md:p-16 shadow-xl space-y-12"
        >
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold text-stone-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <CheckCircle2 size={20} />
              </div>
              <h2>Eligibility for Refund</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              We offer a 7-day refund policy if the dataset you purchased is significantly different from what was described or if you encounter valid technical issues that prevent you from accessing the data.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold text-stone-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <XCircle size={20} />
              </div>
              <h2>Non-Refundable Cases</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Refunds will not be issued for:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Change of mind after a successful download.</li>
              <li>Slight variations in data accuracy (given the "95%+ Accuracy" standard).</li>
              <li>Purchases made through third-party platforms.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold text-stone-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <RefreshCcw size={20} />
              </div>
              <h2>Refund Process</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              To request a refund, please email support@datab2b.com with your order ID and a brief explanation of the issue. Our team will review your request within 2-3 business days. If approved, the refund will be processed to your original payment method via Razorpay.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold text-stone-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <HelpCircle size={20} />
              </div>
              <h2>Data Replacement</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Instead of a refund, we often offer free dataset replacements if you find the data to be stale or if there was a technical error in your specific download.
            </p>
          </section>

          <div className="pt-8 border-t border-orange-100 text-center">
            <p className="text-stone-400 text-sm italic">
              Last Updated: March 16, 2026. For questions, contact support@datab2b.com.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
