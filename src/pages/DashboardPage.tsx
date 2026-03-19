/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download, ShoppingBag, Clock, Link as LinkIcon, TrendingUp, Database, CheckCircle2, ArrowRight, User, Settings, FileText } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import { MOCK_DATASETS } from '../constants';
import { motion } from 'motion/react';
import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout, updateProfile } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import dataService from '../services/dataService';
import invoiceService from '../services/invoiceService';
import { jsPDF } from 'jspdf';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2';

const socket = io('http://localhost:5000');

// Shared state for the dashboard data
const useDashboardData = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [invoices, setInvoices] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchInvoices = async () => {
    if (!user) return;
    try {
      const data = await invoiceService.getMyInvoices();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching dashboard invoices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchInvoices();

    // Socket listeners for real-time
    socket.on('new_purchased', (data) => {
      // If the purchase is for THIS user, refresh list
      if (data.userId === user?.id || data.userId === user?._id) {
        toast.success(`New purchase confirmed: ${data.productName}`);
        fetchInvoices();
      }
    });

    socket.on('invoice_canceled', (data) => {
      if (data.userId === user?.id || data.userId === user?._id) {
        toast.info('An invoice has been canceled');
        fetchInvoices();
      }
    });

    return () => {
      socket.off('new_purchased');
      socket.off('invoice_canceled');
    };
  }, [user]);

  return { invoices, isLoading, refresh: fetchInvoices };
};

const downloadInvoice = (dataset: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(249, 115, 22); // Orange-500
  doc.text('DATAB2B INVOICE', 105, 20, { align: 'center' });
  
  doc.setDrawColor(241, 245, 249);
  doc.line(20, 30, 190, 30);
  
  // Content
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  doc.text(`Invoice ID: #ORD-${Math.floor(Math.random() * 10000)}`, 20, 45);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
  
  doc.setFontSize(14);
  doc.text('Product Details:', 20, 75);
  doc.setFontSize(12);
  doc.text(`Dataset: ${dataset.title}`, 20, 85);
  doc.text(`Format: CSV, Excel, JSON`, 20, 95);
  
  doc.setFontSize(16);
  doc.setTextColor(249, 115, 22);
  doc.text(`Total Amount: INR ${dataset.price}`, 20, 115);
  
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('This is a computer generated invoice and does not require a signature.', 105, 140, { align: 'center' });

  doc.save(`Invoice_${dataset.title.replace(/\s+/g, '_')}.pdf`);
  toast.success('Invoice PDF downloaded successfully!');
};

// ── Overview ───────────────────────────────────────────────────────────────────
function OverviewPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = React.useState<'purchased' | 'links' | 'history'>('purchased');
  const { invoices, isLoading, refresh } = useDashboardData();

  const handleCancelInvoice = async (invoiceId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this purchase? This action will mark your order as canceled.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316', // Orange-500
      cancelButtonColor: '#e7e5e4', // Stone-200
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        popup: 'rounded-3xl border-2 border-orange-100',
        confirmButton: 'rounded-xl px-6 py-3 font-bold',
        cancelButton: 'rounded-xl px-6 py-3 font-bold text-stone-600'
      }
    });

    if (result.isConfirmed) {
      try {
        await invoiceService.cancelInvoice(invoiceId);
        Swal.fire({
          title: 'Canceled!',
          text: 'Your purchase has been canceled.',
          icon: 'success',
          confirmButtonColor: '#f97316',
          customClass: {
            popup: 'rounded-3xl border-2 border-orange-100',
            confirmButton: 'rounded-xl px-6 py-3 font-bold'
          }
        });
        refresh();
      } catch (error: any) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to cancel purchase',
          icon: 'error',
          confirmButtonColor: '#f97316',
          customClass: {
            popup: 'rounded-3xl border-2 border-orange-100',
            confirmButton: 'rounded-xl px-6 py-3 font-bold'
          }
        });
      }
    }
  };

  const tabs = [
    { key: 'purchased', label: 'Purchased Datasets', icon: ShoppingBag },
    { key: 'links',     label: 'Download Links',     icon: LinkIcon },
    { key: 'history',  label: 'Order History',       icon: Clock },
  ] as const;

  const totalRecords = invoices.filter(i => i.status === 'paid').length; // Simple count for mock logic
  const totalSpent = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.amount || 0), 0);

  const stats = [
    { label: 'Total Purchases',  value: invoices.filter(i => i.status === 'paid').length.toString(),      icon: ShoppingBag, bg: 'bg-orange-50',  text: 'text-orange-600'  },
    { label: 'Records Unlocked', value: '50,000+', icon: Database,    bg: 'bg-violet-50',  text: 'text-violet-600'  },
    { label: 'Active Downloads', value: invoices.filter(i => i.status === 'paid').length.toString(),      icon: Download,    bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Total Spent',      value: `₹${totalSpent.toLocaleString()}`, icon: TrendingUp,  bg: 'bg-rose-50',    text: 'text-rose-600'    },
  ];

  return (
    <>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-stone-500 mt-1">Here's an overview of your B2B data assets.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8 mt-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="rounded-2xl border-2 border-orange-50 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange-100 transition-all"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} mb-3`}>
              <stat.icon size={20} className={stat.text} />
            </div>
            <div className="text-2xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {stat.value}
            </div>
            <div className="text-xs text-stone-500 font-medium mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mb-6 flex gap-1 rounded-2xl border-2 border-orange-100 bg-white p-1.5 w-fit shadow-sm">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === key
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-200'
                : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'purchased' && (
        <div className="space-y-4">
          {isLoading ? (
             <div className="flex justify-center py-10">
               <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
             </div>
          ) : invoices.filter(i => i.status === 'paid').length > 0 ? (
            invoices.filter(i => i.status === 'paid').map((invoice, idx) => (
              <motion.div key={invoice._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm hover:border-orange-200 transition-all sm:flex-row"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
                    <ShoppingBag size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900">{invoice.productName}</h3>
                    <p className="text-sm text-stone-400 mt-0.5">Quantity: {invoice.quantity} · Excel &amp; CSV</p>
                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                      <CheckCircle2 size={10} /> Verified Data
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => invoiceService.downloadInvoice(invoice._id, `Invoice_${invoice._id.slice(-6)}.pdf`)}
                    className="flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-2.5 text-sm font-bold text-orange-700 hover:bg-orange-100 transition-all shadow-sm"
                  >
                    <Download size={16} /> Download PDF
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed border-stone-200">
              <p className="text-stone-500">No datasets purchased yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'links' && (
        <div className="space-y-4">
          {invoices.filter(i => i.status === 'paid').map((invoice, idx) => (
            <motion.div key={invoice._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm hover:border-orange-200 transition-all sm:flex-row"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                  <LinkIcon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900">{invoice.productName}</h3>
                  <p className="text-sm text-stone-400 mt-0.5">Expires in 7 days · Secure link</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                    <Clock size={10} /> Active
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const link = invoice.product?.link;
                    if (link) {
                      window.open(link, '_blank');
                    } else {
                      invoiceService.downloadInvoice(invoice._id, `Invoice_${invoice._id.slice(-6)}.pdf`);
                    }
                  }}
                  className="flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-all"
                >
                  <Download size={15} /> Download
                </button>
                <button 
                  onClick={() => {
                    const link = invoice.product?.link;
                    if (link) {
                      navigator.clipboard.writeText(link);
                      toast.success('Link copied to clipboard!');
                    } else {
                      toast.info('No external link available for this dataset');
                    }
                  }}
                  className="rounded-xl border-2 border-orange-200 bg-white px-4 py-2.5 text-sm font-bold text-orange-700 hover:bg-orange-50 transition-all"
                >
                  Copy Link
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="overflow-hidden rounded-2xl border-2 border-orange-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-orange-50 text-xs font-extrabold uppercase tracking-wider text-orange-700 border-b border-orange-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Dataset</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {invoices.map((invoice, idx) => (
                <tr key={invoice._id} className="hover:bg-orange-50/50 transition-colors">
                  <td className="px-6 py-4 font-extrabold text-stone-900">#ORD-{invoice._id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4 text-stone-600 font-medium">{invoice.productName}</td>
                  <td className="px-6 py-4 text-stone-500">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-extrabold text-orange-600">₹{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold 
                      ${invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 
                        invoice.status === 'canceled' ? 'bg-rose-100 text-rose-700' : 'bg-stone-100 text-stone-700'}`}>
                      {invoice.status === 'paid' && <CheckCircle2 size={11} />}
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-3">
                    {invoice.status === 'paid' && (
                      <div className="flex gap-3">
                        <button 
                          onClick={() => invoiceService.downloadInvoice(invoice._id, `Invoice_${invoice._id.slice(-6)}.pdf`)}
                          className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
                        >
                          <Download size={14} /> PDF
                        </button>
                        <button 
                          onClick={() => handleCancelInvoice(invoice._id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ── My Purchases ───────────────────────────────────────────────────────────────
function PurchasesPage() {
  const { invoices } = useDashboardData();
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>My Purchases</h1>
        <p className="text-stone-500 mt-1">All your purchased datasets — download anytime.</p>
      </div>
      <div className="space-y-4">
        {invoices.filter(i => i.status === 'paid').map((invoice, idx) => (
          <motion.div key={invoice._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm hover:border-orange-200 transition-all sm:flex-row"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
                <ShoppingBag size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900">{invoice.productName}</h3>
                <p className="text-sm text-stone-400 mt-0.5">Qty: {invoice.quantity} · ₹{invoice.amount}</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 size={10} /> Verified
                </span>
              </div>
            </div>
            <button 
              onClick={() => invoiceService.downloadInvoice(invoice._id, `Invoice_${invoice._id.slice(-6)}.pdf`)}
              className="flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-2 text-sm font-bold text-orange-700 hover:bg-orange-100 transition-all"
            >
              <Download size={15} /> Download
            </button>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// ── Downloads ─────────────────────────────────────────────────────────────────
function DownloadsPage() {
  const { invoices } = useDashboardData();
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Downloads</h1>
        <p className="text-stone-500 mt-1">Secure download links valid for 7 days.</p>
      </div>
      <div className="space-y-4">
        {invoices.filter(i => i.status === 'paid').map((invoice, idx) => (
          <motion.div key={invoice._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm hover:border-orange-200 transition-all sm:flex-row"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                <Download size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900">{invoice.productName}</h3>
                <p className="text-sm text-stone-400 mt-0.5">Expires in 7 days · Excel &amp; CSV</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                  <Clock size={10} /> Active
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={async () => {
                  try {
                    const link = invoice.product?.link;
                    if (link) {
                      window.open(link, '_blank');
                    } else {
                      await invoiceService.downloadInvoice(invoice._id, `Invoice_${invoice._id.slice(-6)}.pdf`);
                    }
                  } catch (error) {
                    toast.error('Failed to process download.');
                  }
                }}
                className="flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-all"
              >
                <Download size={15} /> Download
              </button>
              <button 
                onClick={() => {
                  const link = invoice.product?.link;
                  if (link) {
                    navigator.clipboard.writeText(link);
                    toast.success('Link copied to clipboard!');
                  } else {
                    toast.info('No external link available for this dataset');
                  }
                }}
                className="rounded-xl border-2 border-orange-200 bg-white px-4 py-2.5 text-sm font-bold text-orange-700 hover:bg-orange-50 transition-all"
              >
                Copy Link
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// ── Profile ────────────────────────────────────────────────────────────────────
function ProfilePage() {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.info('Logged out');
  };

  const handleSaveProfile = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error || 'Failed to update profile');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>My Profile</h1>
            <p className="text-stone-500 mt-1">Manage your account information.</p>
          </div>
          <button 
            onClick={onLogout}
            className="rounded-xl border-2 border-orange-100 px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 transition-all"
          >
            Logout Account
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-orange-100 bg-white p-8 shadow-sm"
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-stone-900">{user?.name || 'User'}</h3>
              <p className="text-sm text-stone-500">{user?.email || 'email@example.com'}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">
                Pro Member
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
              />
            </div>
          </div>
          <button 
            onClick={handleSaveProfile}
            disabled={isLoading}
            className="mt-6 btn-orange flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Settings size={15} />
            )}
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ── Main Layout Shell ──────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-warm">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto p-8">
        {/* Background blobs */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/20 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Active Account badge + Browse button */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 border border-orange-200 px-3 py-1 text-xs font-bold text-orange-700">
              <CheckCircle2 size={11} className="text-orange-500" /> Active Account
            </span>
            <Link to="/datasets" className="btn-orange hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold">
              Browse More Data <ArrowRight size={16} />
            </Link>
          </div>

          {/* Nested routes — only ONE renders at a time */}
          <Routes>
            <Route index element={<OverviewPage />} />
            <Route path="purchases" element={<PurchasesPage />} />
            <Route path="downloads" element={<DownloadsPage />} />
            <Route path="profile"   element={<ProfilePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
