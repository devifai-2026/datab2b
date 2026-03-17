/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import contactService from '../services/contactService';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'B2B Technology Data',
    message: ''
  });

  const { firstName, lastName, email, service, message } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await contactService.sendInquiry(formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        service: 'B2B Technology Data',
        message: ''
      });
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm py-20 px-4">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-100/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-4 py-1.5 text-sm font-bold text-orange-700 mb-4 uppercase tracking-[0.2em] shadow-sm">
            <MessageSquare size={14} className="text-orange-500" /> Get in Touch
          </span>
          <h1 className="text-6xl font-extrabold text-stone-900 mb-6 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Let's Start a <span className="gradient-text">Conversation</span>
          </h1>
          <p className="text-stone-500 text-xl max-w-2xl mx-auto font-medium">
            Have questions about our data? Need a custom dataset? Our experts are here to help you scale your operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-3xl border-2 border-orange-100 bg-white/80 backdrop-blur-sm p-10 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
              
              <h2 className="text-3xl font-extrabold text-stone-900 mb-8 relative z-10">Contact Information</h2>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-200">
                    <Mail size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-lg">Email Us</h4>
                    <p className="text-stone-500 mt-1">support@datab2b.com</p>
                    <p className="text-stone-500 text-xs font-semibold mt-1 text-orange-600">Response within 4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-stone-900 shadow-lg shadow-stone-200">
                    <Phone size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-lg">Call Support</h4>
                    <p className="text-stone-500 mt-1">+91 98765 43210</p>
                    <p className="text-stone-500 text-xs font-semibold mt-1">Mon-Sat, 10am-7pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-100">
                    <MapPin size={22} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-lg">Visit Office</h4>
                    <p className="text-stone-500 mt-1 text-sm leading-relaxed">
                      123 Business Hub, Sector V,<br />
                      Salt Lake, Kolkata, 700091<br />
                      West Bengal, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 flex gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full bg-stone-100 hover:bg-orange-500 hover:text-white transition-all cursor-pointer flex items-center justify-center" />
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-stone-900 p-8 text-white">
              <h3 className="text-xl font-bold mb-3 italic">"The data provided by Datab2b helped us double our outreach in just 3 months."</h3>
              <p className="text-orange-400 font-bold">— Marketing Director, TechCorp</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 h-full"
          >
            <form onSubmit={handleSubmit} className="rounded-3xl border-2 border-orange-100 bg-white p-10 md:p-12 shadow-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">First Name</label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                    className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none font-medium text-stone-900"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Last Name</label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                    className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none font-medium text-stone-900"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Business Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none font-medium text-stone-900"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Service Interest</label>
                <select 
                  name="service"
                  value={service}
                  onChange={onChange}
                  className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none font-medium text-stone-900 appearance-none"
                >
                  <option>B2B Technology Data</option>
                  <option>Consumer Market Research</option>
                  <option>Healthcare Datasets</option>
                  <option>Custom Data Extraction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Your Message</label>
                <textarea
                  required
                  name="message"
                  value={message}
                  onChange={onChange}
                  rows={4}
                  className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none font-medium text-stone-900 resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-orange rounded-2xl py-5 text-lg font-bold flex items-center justify-center gap-3 shadow-xl shadow-orange-200 group relative overflow-hidden disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Inquiry Now
                  </>
                )}
              </button>
              <p className="text-center text-stone-400 text-xs">
                By submitting this form, you agree to our <span className="text-orange-500 font-bold underline">Privacy Policy</span>.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
