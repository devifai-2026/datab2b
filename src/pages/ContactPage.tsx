import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, ArrowRight, ShieldCheck, Globe, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import contactService from '../services/contactService';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const { firstName, lastName, email, message } = formData;

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
      setIsSuccess(true);
      toast.success("Message sent successfully!");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] selection:bg-orange-200 py-24 px-4 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-50/50 via-transparent to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-50/40 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-stretch">
          
          {/* Left Column: Vision & Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-2/5 flex flex-col justify-between"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm mb-6"
              >
                <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Connect with our data experts</span>
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-extrabold text-[#1a1a1a] leading-[1.05] tracking-tight mb-8">
                Build your <br />
                <span className="relative">
                  <span className="z-10 relative">future</span>
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute bottom-2 left-0 w-full h-4 bg-orange-100 -z-0 origin-left" 
                  />
                </span> with <br />
                <span className="text-orange-500">precision data.</span>
              </h1>
              
              <p className="text-xl text-stone-500 font-medium leading-relaxed max-w-md mb-12">
                Have a complex requirement? Our specialized teams are ready to craft a tailor-made data ecosystem for your business growth.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Global Reach", detail: "support@datab2b.com", color: "bg-orange-500" },
                  { icon: Phone, title: "Phone Enquiries", detail: "+91 98765 43210", color: "bg-stone-900" },
                  { icon: Clock, title: "Support Timings", detail: "Mon - Sat, 10:00 - 19:00 IST", color: "bg-orange-100", textColor: "text-orange-700" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (idx * 0.1) }}
                    className="group flex items-center gap-5 p-4 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 border border-transparent hover:border-stone-100"
                  >
                    <div className={`h-14 w-14 flex items-center justify-center rounded-2xl ${item.color} shadow-lg transition-transform group-hover:scale-110 duration-500`}>
                      <item.icon size={22} className={item.textColor || "text-white"} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{item.title}</p>
                      <p className="text-lg font-bold text-stone-800">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-16 flex items-center gap-6"
            >
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-stone-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Expert" className="h-full w-full object-cover" />
                  </div>
                ))}
                <div className="h-12 w-12 rounded-full border-4 border-white bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  +25
                </div>
              </div>
              <p className="text-sm font-medium text-stone-500">
                <span className="text-stone-900 font-bold italic">Top rated</span> data strategists <br />on standby to assist you.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-3/5"
          >
            <div className="h-full relative group">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-300 rounded-[40px] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative h-full bg-white border border-stone-100 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] p-8 md:p-14 overflow-hidden">
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-bl-[100px] -mr-4 -mt-4 transition-transform duration-1000 group-hover:scale-125" />

                <div className="mb-10">
                  <h2 className="text-3xl font-black text-stone-900 mb-3 tracking-tight">Tell us about your project</h2>
                  <p className="text-stone-500 font-medium">Complete the form below and we'll link you with the right specialist.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest px-1">First Name</label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={onChange}
                        placeholder="e.g. Robert"
                        className="w-full bg-stone-50 border-2 border-stone-50 hover:border-orange-100 focus:border-orange-500/50 focus:bg-white rounded-2xl px-6 py-4.5 transition-all outline-none font-semibold text-stone-900 placeholder:text-stone-300 shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest px-1">Last Name</label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={onChange}
                        placeholder="e.g. Fox"
                        className="w-full bg-stone-50 border-2 border-stone-50 hover:border-orange-100 focus:border-orange-500/50 focus:bg-white rounded-2xl px-6 py-4.5 transition-all outline-none font-semibold text-stone-900 placeholder:text-stone-300 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest px-1">Business Email</label>
                    <div className="relative group/input">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within/input:text-orange-500 transition-colors" size={18} />
                      <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="robert@pioneer-tech.com"
                        className="w-full bg-stone-50 border-2 border-stone-50 hover:border-orange-100 focus:border-orange-500/50 focus:bg-white rounded-2xl pl-14 pr-6 py-4.5 transition-all outline-none font-semibold text-stone-900 placeholder:text-stone-300 shadow-inner"
                      />
                    </div>
                  </div>


                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest px-1">Project Details</label>
                    <textarea
                      required
                      name="message"
                      value={message}
                      onChange={onChange}
                      rows={4}
                      placeholder="Share some context about your data requirements..."
                      className="w-full bg-stone-50 border-2 border-stone-50 hover:border-orange-100 focus:border-orange-500/50 focus:bg-white rounded-2xl px-6 py-5 transition-all outline-none font-semibold text-stone-900 resize-none placeholder:text-stone-300 shadow-inner leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex flex-col md:flex-row items-center gap-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto flex-1 h-18 bg-stone-900 hover:bg-[#111] text-white rounded-2xl px-10 py-5 text-base font-black flex items-center justify-center gap-4 shadow-xl shadow-stone-200 group relative overflow-hidden transition-all duration-300 disabled:opacity-50 active:scale-[0.98]"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div 
                            key="loader"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-white/20 border-t-white" />
                            <span>SENDING...</span>
                          </motion.div>
                        ) : isSuccess ? (
                          <motion.div
                            key="success"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle2 size={24} className="text-orange-400" />
                            <span>SENT SUCCESSFULLY</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="normal"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            <span>SEND ENQUIRY NOW</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    
                    <div className="flex items-center gap-3 px-2">
                       <div className="h-10 w-10 bg-orange-50 flex items-center justify-center rounded-xl">
                          <ShieldCheck className="text-orange-600" size={20} />
                       </div>
                       <div>
                         <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">GDPR Compliant</p>
                         <p className="text-[11px] font-bold text-stone-600">Privacy secured by 256-bit AES</p>
                       </div>
                    </div>
                  </div>
                </form>

                {/* Footer Badges */}
                <div className="mt-12 flex flex-wrap items-center gap-8 pt-8 border-t border-stone-50">
                  <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
                    <Globe size={18} className="text-stone-400" />
                    <span className="text-[10px] font-black text-stone-800 uppercase tracking-widest">Global Ops</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
                    <MessageSquare size={18} className="text-stone-400" />
                    <span className="text-[10px] font-black text-stone-800 uppercase tracking-widest">24/7 Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
