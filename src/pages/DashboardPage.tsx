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
import { jsPDF } from 'jspdf';

// Shared state for the dashboard data
const useDashboardData = () => {
  const [datasets, setDatasets] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const data = await dataService.getAllData();
        // For now, we simulate "purchased" by taking the first 2 from backend
        setDatasets((data as any[]).slice(0, 2));
      } catch (error) {
        console.error('Error fetching dashboard datasets:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDatasets();
  }, []);

  return { purchasedDatasets: datasets, isLoading };
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
  const { purchasedDatasets, isLoading } = useDashboardData();

  const tabs = [
    { key: 'purchased', label: 'Purchased Datasets', icon: ShoppingBag },
    { key: 'links',     label: 'Download Links',     icon: LinkIcon },
    { key: 'history',  label: 'Order History',       icon: Clock },
  ] as const;

  const totalRecords = purchasedDatasets.reduce((sum, d) => sum + (d.contactCount || 0), 0);
  const totalSpent = purchasedDatasets.reduce((sum, d) => sum + (d.price || 0), 0);

  const stats = [
    { label: 'Total Purchases',  value: purchasedDatasets.length.toString(),      icon: ShoppingBag, bg: 'bg-orange-50',  text: 'text-orange-600'  },
    { label: 'Records Unlocked', value: totalRecords.toLocaleString(), icon: Database,    bg: 'bg-violet-50',  text: 'text-violet-600'  },
    { label: 'Active Downloads', value: purchasedDatasets.length.toString(),      icon: Download,    bg: 'bg-emerald-50', text: 'text-emerald-600' },
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
          ) : purchasedDatasets.length > 0 ? (
            purchasedDatasets.map((dataset, idx) => (
              <motion.div key={dataset.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm hover:border-orange-200 transition-all sm:flex-row"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
                    <ShoppingBag size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900">{dataset.title}</h3>
                    <p className="text-sm text-stone-400 mt-0.5">{dataset.contactCount.toLocaleString()} Records · Excel &amp; CSV</p>
                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                      <CheckCircle2 size={10} /> Verified Data
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => downloadInvoice(dataset)}
                    className="flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-2.5 text-sm font-bold text-orange-700 hover:bg-orange-100 transition-all shadow-sm"
                  >
                    <Download size={16} /> Download PDF
                  </button>
                  <Link to={`/datasets/${dataset.id}`} className="btn-orange rounded-xl px-5 py-2.5 text-sm font-bold whitespace-nowrap">View Details</Link>
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
          {purchasedDatasets.map((dataset, idx) => (
            <motion.div key={dataset.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm hover:border-orange-200 transition-all sm:flex-row"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                  <LinkIcon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900">{dataset.title}</h3>
                  <p className="text-sm text-stone-400 mt-0.5">Expires in 7 days · Secure link</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                    <Clock size={10} /> Active
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-all">
                  <Download size={15} /> Download
                </button>
                <button className="rounded-xl border-2 border-orange-200 bg-white px-4 py-2.5 text-sm font-bold text-orange-700 hover:bg-orange-50 transition-all">Copy Link</button>
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
              {purchasedDatasets.map((dataset, idx) => (
                <tr key={idx} className="hover:bg-orange-50/50 transition-colors">
                  <td className="px-6 py-4 font-extrabold text-stone-900">#ORD-00{idx + 1}</td>
                  <td className="px-6 py-4 text-stone-600 font-medium">{dataset.title}</td>
                  <td className="px-6 py-4 text-stone-500">Mar 0{idx + 5}, 2026</td>
                  <td className="px-6 py-4 font-extrabold text-orange-600">₹{dataset.price}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 size={11} /> Completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => downloadInvoice(dataset)}
                      className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <Download size={14} />
                      Download PDF
                    </button>
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
  const { purchasedDatasets } = useDashboardData();
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>My Purchases</h1>
        <p className="text-stone-500 mt-1">All your purchased datasets — download anytime.</p>
      </div>
      <div className="space-y-4">
        {purchasedDatasets.map((dataset, idx) => (
          <motion.div key={dataset.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm hover:border-orange-200 transition-all sm:flex-row"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
                <ShoppingBag size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900">{dataset.title}</h3>
                <p className="text-sm text-stone-400 mt-0.5">{dataset.contactCount.toLocaleString()} Records · ₹{dataset.price}</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 size={10} /> Verified
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-2 text-sm font-bold text-orange-700 hover:bg-orange-100 transition-all">
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
  const { purchasedDatasets } = useDashboardData();
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Downloads</h1>
        <p className="text-stone-500 mt-1">Secure download links valid for 7 days.</p>
      </div>
      <div className="space-y-4">
        {purchasedDatasets.map((dataset, idx) => (
          <motion.div key={dataset.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm hover:border-orange-200 transition-all sm:flex-row"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                <Download size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900">{dataset.title}</h3>
                <p className="text-sm text-stone-400 mt-0.5">Expires in 7 days · Excel &amp; CSV</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                  <Clock size={10} /> Active
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-all">
                <Download size={15} /> Download
              </button>
              <button className="rounded-xl border-2 border-orange-200 bg-white px-4 py-2.5 text-sm font-bold text-orange-700 hover:bg-orange-50 transition-all">
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
    <>
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
        className="rounded-2xl border-2 border-orange-100 bg-white p-8 shadow-sm max-w-lg"
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
    </>
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
