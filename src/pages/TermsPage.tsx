/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Scale, CheckCircle2, AlertTriangle, FileCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-warm py-20 px-4">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-4 py-1.5 text-sm font-bold text-orange-700 mb-4">
            <Scale size={14} className="text-orange-500" /> Usage Agreement
          </span>
          <h1 className="text-5xl font-extrabold text-stone-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            By accessing or using Datab2b, you agree to comply with and be bound by the following terms and conditions.
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
              <h2>Acceptable Use</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Datab2b provides professional B2B datasets for marketing, research, and sales operations. You agree not to use the data for illegal purposes, spamming, or any activity that violates data protection laws.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold text-stone-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <FileCheck size={20} />
              </div>
              <h2>License Grant</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Upon purchase, Datab2b grants you a non-exclusive, non-transferable license to use the dataset for your internal business purposes. You may not resell or redistribute the raw datasets in their original or modified form.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold text-stone-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <AlertTriangle size={20} />
              </div>
              <h2>Liability Disclaimer</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              While we strive for 95%+ data accuracy, datasets are provided "as is." Datab2b shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services or the data provided.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold text-stone-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Scale size={20} />
              </div>
              <h2>Governing Law</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              These terms are governed by and construed in accordance with the laws of India. Any disputes arising out of your use of Datab2b will be subject to the exclusive jurisdiction of the courts in Kolkata.
            </p>
          </section>

          <div className="pt-8 border-t border-orange-100 text-center">
            <p className="text-stone-400 text-sm italic">
              Last Updated: March 16, 2026. For legal inquiries, contact legal@datab2b.com.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
