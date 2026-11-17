import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ShieldCheck,
  Building2,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  TrendingUp,
  CreditCard,
  Lock,
  Sparkles,
  FileSpreadsheet,
  Building,
  Check,
  Utensils,
  Package,
  GitBranch
} from 'lucide-react';

export default function SystemAdminDashboard() {
  const { hotels, addHotel, toggleHotelStatus, isBackendConnected } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Hotel Form State with Operating Classifications
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    ownerName: '',
    ownerEmail: '',
    phone: '',
    address: '',
    plan: 'Pro Manager',
    maxTables: 20,
    monthlyFee: 2999,
    fssaiNo: '10025011000889',
    dietaryType: 'Both (Veg & Non-Veg)',
    serviceType: 'Table Service',
    parcelService: true,
    branchType: 'Single Branch'
  });

  const [notification, setNotification] = useState(null);

  const filteredHotels = hotels.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === 'All' || h.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.ownerEmail) return;

    const newH = addHotel(formData);
    setShowAddModal(false);
    setFormData({
      name: '',
      code: '',
      ownerName: '',
      ownerEmail: '',
      phone: '',
      address: '',
      plan: 'Pro Manager',
      maxTables: 20,
      monthlyFee: 2999,
      fssaiNo: '10025011000889',
      dietaryType: 'Both (Veg & Non-Veg)',
      serviceType: 'Table Service',
      parcelService: true,
      branchType: 'Single Branch'
    });

    setNotification(`Successfully provisioned software license for "${newH.name}"!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const totalSaaSRev = hotels.reduce(
    (acc, h) => (h.status === 'Active' ? acc + (h.monthlyFee || 0) : acc),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Alert Notification */}
        {notification && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-xl flex items-center justify-between animate-fade-in shadow-md">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold">{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-xs text-slate-500 hover:text-slate-900">
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Title & Overview Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-sky-700 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" /> System Managing Team (Super Admin Portal)
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              ATITHYA PRABANDHANAM Core Control Center
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Provision software licenses to client hotels, audit SaaS revenues, and manage protected platform parameters.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-xs"
          >
            <Plus className="w-4 h-4" /> Provision New Hotel License
          </button>
        </div>

        {/* Top KPI Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Onboarded Client Hotels</span>
              <div className="p-2 bg-sky-50 text-sky-700 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 mt-3">{hotels.length} Hotels</div>
            <div className="text-xs text-emerald-700 mt-2 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> 100% Platform Operational
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active SaaS Subscriptions</span>
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 mt-3">
              {hotels.filter((h) => h.status === 'Active').length} Active
            </div>
            <div className="text-xs text-slate-400 mt-2">Zero subscription arrears</div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Monthly SaaS Revenue</span>
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-sky-700 mt-3">
              ₹{totalSaaSRev.toLocaleString()}
            </div>
            <div className="text-xs text-indigo-700 mt-2 font-medium">Software manager platform income</div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Locked Master Sheets</span>
              <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
                <Lock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-purple-700 mt-3">
              3 Protected
            </div>
            <div className="text-xs text-purple-700 mt-2 font-medium">Protected from Hotel Modification</div>
          </div>
        </div>

        {/* Super Admin Control Sheets Section */}
        <div className="bg-white border border-indigo-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  System Master Control Sheets
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                    SUPER ADMIN EXCLUSIVE
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  These core system parameters cannot be edited or altered by client hotel managers.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-sky-700" />
                <div>
                  <div className="text-xs font-bold text-slate-900">SaaS Platform Core Architecture</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">System Locked (Super Admin Only)</div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-sky-700" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Global Payment Gateway Protocols</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">System Locked (Super Admin Only)</div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-sky-700" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Subscription Licensing Matrix</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">System Locked (Super Admin Only)</div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Managed Hotels Search & Filter List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-sky-700" /> Managed Client Hotels
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Independent client hotels using Atithya Prabandhanam software.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search hotel, owner, code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-9 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Plans</option>
                <option value="Enterprise VIP">Enterprise VIP</option>
                <option value="Pro Manager">Pro Manager</option>
                <option value="Starter Plan">Starter Plan</option>
              </select>
            </div>
          </div>

          {/* Hotels Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Hotel Name & FSSAI</th>
                  <th className="py-3.5 px-4">Owner Contact</th>
                  <th className="py-3.5 px-4">Software Plan</th>
                  <th className="py-3.5 px-4">Max Tables</th>
                  <th className="py-3.5 px-4">Monthly Fee</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredHotels.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-400">
                      No matching client hotels found.
                    </td>
                  </tr>
                ) : (
                  filteredHotels.map((h) => (
                    <tr key={h.id || h._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 text-sm">{h.name}</div>
                        <div className="text-[11px] text-sky-700 font-mono flex items-center gap-1.5 mt-0.5">
                          ID: {h.id} • FSSAI: {h.fssaiNo || '10021011000452'}
                        </div>
                        <div className="text-[10px] text-slate-400">{h.address}</div>

                        {/* Operational Classifications */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {/* Dietary Classification */}
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold inline-flex items-center gap-1 ${
                              h.dietaryType === 'Pure Veg'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : h.dietaryType === 'Non-Veg'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                h.dietaryType === 'Pure Veg'
                                  ? 'bg-emerald-500'
                                  : h.dietaryType === 'Non-Veg'
                                  ? 'bg-rose-500'
                                  : 'bg-amber-500'
                              }`}
                            />
                            {h.dietaryType || 'Both (Veg & Non-Veg)'}
                          </span>

                          {/* Dining / Service Style */}
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 inline-flex items-center gap-1">
                            <Utensils className="w-2.5 h-2.5" />
                            {h.serviceType || 'Table Service'}
                          </span>

                          {/* Parcel / Takeaway */}
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold inline-flex items-center gap-1 ${
                              h.parcelService !== false
                                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                : 'bg-stone-100 text-stone-500 border border-stone-200'
                            }`}
                          >
                            <Package className="w-2.5 h-2.5" />
                            {h.parcelService !== false ? 'Parcel Available' : 'Dine-In Only'}
                          </span>

                          {/* Branch Structure */}
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1">
                            <GitBranch className="w-2.5 h-2.5" />
                            {h.branchType || 'Single Branch'}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800">{h.ownerName}</div>
                        <div className="text-[11px] text-slate-500">{h.ownerEmail}</div>
                        <div className="text-[10px] text-slate-400">{h.phone}</div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-100 text-sky-900 border border-sky-200">
                          {h.plan}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-bold text-slate-800">
                        {h.maxTables} Tables
                      </td>

                      <td className="py-4 px-4 font-extrabold text-sky-700">
                        ₹{h.monthlyFee}/mo
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center w-fit gap-1 ${
                            h.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {h.status === 'Active' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {h.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => toggleHotelStatus(h.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            h.status === 'Active'
                              ? 'bg-slate-100 hover:bg-rose-100 text-rose-700 border border-slate-200'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {h.status === 'Active' ? 'Suspend License' : 'Activate Software'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Provision New Hotel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 text-slate-900 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-sky-600" /> Provision Client Hotel License
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Register new client hotel company, define operational service model, and grant SaaS access.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-5">
              {/* Section 1: Basic Information */}
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-600" /> Hotel Business Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Hotel / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grand Emerald Hotel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Unique Code / Outlet ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. GEH-DELHI"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Manager / Owner Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Owner Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="manager@hotel.com"
                      value={formData.ownerEmail}
                      onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Address / City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MG Road, Indiranagar, Bengaluru"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Operating & Food Service Specifications */}
              <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4">
                <div className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-sky-600" /> Operational & Service Model Specifications
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* 1. Dietary Type (Veg / Non-Veg / Both) */}
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Dietary Classification (Food Type)
                    </label>
                    <select
                      value={formData.dietaryType}
                      onChange={(e) => setFormData({ ...formData, dietaryType: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500 font-medium"
                    >
                      <option value="Both (Veg & Non-Veg)">Both (Veg & Non-Veg)</option>
                      <option value="Pure Veg">Pure Veg (100% Vegetarian)</option>
                      <option value="Non-Veg">Non-Veg</option>
                    </select>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Specifies food category served by the kitchen.
                    </span>
                  </div>

                  {/* 2. Dining Style (Table / Buffet / Both) */}
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Service & Dining Setup
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500 font-medium"
                    >
                      <option value="Table Service">Table Service (Dine-in Order)</option>
                      <option value="Buffet System">Buffet System (Self-Serve Spread)</option>
                      <option value="Both (Table & Buffet)">Both (Table Service & Buffet)</option>
                    </select>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Table dine-in order or buffet banquet arrangement.
                    </span>
                  </div>

                  {/* 3. Parcel / Takeaway */}
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Parcel / Takeaway Service
                    </label>
                    <select
                      value={formData.parcelService ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, parcelService: e.target.value === 'true' })}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500 font-medium"
                    >
                      <option value="true">Yes — Parcel / Takeaway Available</option>
                      <option value="false">No — Dine-In Only (No Parcel)</option>
                    </select>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Whether customers can order food for takeaway / packaging.
                    </span>
                  </div>

                  {/* 4. Branch Structure */}
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Branch Structure
                    </label>
                    <select
                      value={formData.branchType}
                      onChange={(e) => setFormData({ ...formData, branchType: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500 font-medium"
                    >
                      <option value="Single Branch">Single Branch (Independent Outlet)</option>
                      <option value="Multiple Branches">Multiple Branches (Chain / Franchise)</option>
                    </select>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Indicates single location or multi-branch network.
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 3: Plan & Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-xs text-slate-700 font-medium block mb-1">
                    Software Plan
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                  >
                    <option value="Pro Manager">Pro Manager</option>
                    <option value="Enterprise VIP">Enterprise VIP</option>
                    <option value="Starter Plan">Starter Plan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-700 font-medium block mb-1">
                    Max Dining Tables
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxTables}
                    onChange={(e) => setFormData({ ...formData, maxTables: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-700 font-medium block mb-1">
                    Monthly SaaS Fee (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.monthlyFee}
                    onChange={(e) => setFormData({ ...formData, monthlyFee: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 sticky bottom-0 bg-white py-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Confirm & Provision Software
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
