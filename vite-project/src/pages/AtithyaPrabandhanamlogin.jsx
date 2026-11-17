import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ShieldCheck,
  Building2,
  UtensilsCrossed,
  Truck,
  QrCode,
  Lock,
  Mail,
  ArrowRight,
  Building,
  UserCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  KeyRound,
  FileSpreadsheet,
  Zap
} from 'lucide-react';

export default function AtithyaPrabandhanamlogin() {
  const navigate = useNavigate();
  const { hotels, currentHotelId, setCurrentHotelId, staffMembers } = useApp();

  // Selected Role Order:
  // Option 1: 'admin' (System Admin)
  // Option 2: 'manager' (Hotel Manager)
  // Option 3: 'staff' (Waiter & Delivery / Kitchen Staff)
  const [selectedRole, setSelectedRole] = useState('admin');
  const [staffRoleType, setStaffRoleType] = useState('waiter'); // 'waiter' or 'kitchen'

  const [selectedHotelId, setSelectedHotelId] = useState(currentHotelId || 'H104');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register New Hotel State (for system admin or hotel owner onboarding)
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [hotelName, setHotelName] = useState('');

  // Guest Menu Demo Quick Preview Table State
  const [demoTable, setDemoTable] = useState('Table 04');

  // Fast Demo Credentials Auto-Fill
  const handleDemoFill = (roleType) => {
    if (roleType === 'admin') {
      setSelectedRole('admin');
      setEmail('admin@atithya.com');
      setPassword('admin123');
    } else if (roleType === 'manager') {
      setSelectedRole('manager');
      setSelectedHotelId('H104');
      setEmail('manager@srikrishnasagar.com');
      setPassword('manager123');
    } else if (roleType === 'waiter') {
      setSelectedRole('staff');
      setStaffRoleType('waiter');
      setSelectedHotelId('H104');
      setEmail('ST-103');
      setPassword('waiter123');
    } else if (roleType === 'kitchen') {
      setSelectedRole('staff');
      setStaffRoleType('kitchen');
      setSelectedHotelId('H104');
      setEmail('ST-101');
      setPassword('chef123');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Update active hotel in global AppContext
    setCurrentHotelId(selectedHotelId);

    if (selectedRole === 'admin') {
      navigate('/admin');
    } else if (selectedRole === 'manager') {
      navigate('/manager');
    } else if (selectedRole === 'staff') {
      if (staffRoleType === 'kitchen') {
        navigate('/kitchen');
      } else {
        navigate('/delivery');
      }
    }
  };

  const handleGuestMenuDemoLaunch = () => {
    setCurrentHotelId(selectedHotelId);
    navigate(`/guest?table=${encodeURIComponent(demoTable)}`);
  };

  const selectedHotelObj = hotels.find((h) => h.id === selectedHotelId) || hotels[0];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambient Glow FX */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-8 z-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* LEFT SIDE: Brand Vision, Multi-Tenant Info & Guest Menu Shortcut (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-700/60">
            <div>
              {/* Brand Header */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/logo.png"
                  alt="Atithya-Prabandhanam Official Logo"
                  className="h-14 w-auto object-contain drop-shadow-md"
                />
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight leading-none">
                    ATITHYA PRABANDHANAM
                  </h2>
                  <span className="text-[10px] text-sky-400 font-extrabold uppercase tracking-widest block mt-1">
                    HOSPITALITY SAAS MANAGEMENT
                  </span>
                </div>
              </div>

              {/* Company Vision & Role Summary */}
              <div className="space-y-3.5 text-xs text-slate-300 mb-8">
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-3">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold">1. System Admin Portal</strong>
                    <span className="text-slate-400 text-[11px]">Super-admin controls to provision software access & licenses for client hotels.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-3">
                  <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold">2. Hotel Manager Suite</strong>
                    <span className="text-slate-400 text-[11px]">Dedicated hotel pages, custom digital menu editor, staff roster & QR table sheets.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold">3. Waiter & Kitchen Staff Portal</strong>
                    <span className="text-slate-400 text-[11px]">Floor waitstaff dispatch & kitchen chef KDS. Access via manager-assigned credentials.</span>
                  </div>
                </div>
              </div>

              {/* DEMO FEATURE: Quick Access to Guest Menu Demo */}
              <div className="bg-gradient-to-br from-sky-900/40 via-sky-950/40 to-slate-900 p-4 rounded-2xl border border-sky-500/30 space-y-3 relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                    <span className="text-xs font-black text-sky-200 uppercase tracking-wider">
                      Guest Menu Demo Option
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                    Live Preview
                  </span>
                </div>

                <p className="text-[11px] text-slate-300">
                  Hotel Managers & Staff can easily test or demo the customer QR code menu experience anytime:
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-sky-300 font-semibold block mb-1">Target Hotel:</label>
                    <select
                      value={selectedHotelId}
                      onChange={(e) => setSelectedHotelId(e.target.value)}
                      className="w-full bg-slate-900 border border-sky-500/40 text-xs text-white p-2 rounded-xl outline-none"
                    >
                      {hotels.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-sky-300 font-semibold block mb-1">Select Table:</label>
                    <select
                      value={demoTable}
                      onChange={(e) => setDemoTable(e.target.value)}
                      className="w-full bg-slate-900 border border-sky-500/40 text-xs text-white p-2 rounded-xl outline-none"
                    >
                      <option value="Table 01">Table 01</option>
                      <option value="Table 04">Table 04</option>
                      <option value="VIP Garden Lounge">VIP Garden Lounge</option>
                      <option value="Rooftop Terrace">Rooftop Terrace</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGuestMenuDemoLaunch}
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform group-hover:scale-[1.02]"
                >
                  <QrCode className="w-4 h-4 text-sky-200" /> Open Guest Menu Demo <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>© 2026 Atithya Prabandhanam System</span>
              <span className="text-sky-400 font-mono">v5.0 Multi-Tenant SaaS</span>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive 3-Option Role Selector & Login Form (7 cols) */}
          <div className="lg:col-span-7 p-8 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {isRegisterMode ? 'Register Client Hotel' : 'System Portal Access'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your access level below to open your dedicated hotel dashboard.
                  </p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Express API Active
                  </span>
                </div>
              </div>

              {/* STRICT 3-OPTION ROLE SELECTOR */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Select User Job Role:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* OPTION 1: System Admin */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${
                      selectedRole === 'admin'
                        ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-indigo-400 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/50'
                        : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <ShieldCheck className={`w-5 h-5 ${selectedRole === 'admin' ? 'text-white' : 'text-indigo-400'}`} />
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${selectedRole === 'admin' ? 'bg-white/20 text-white' : 'bg-indigo-500/20 text-indigo-300'}`}>
                        OPTION 1
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="font-extrabold text-xs">System Admin</div>
                      <div className={`text-[10px] ${selectedRole === 'admin' ? 'text-indigo-100' : 'text-slate-400'}`}>
                        SaaS Super Admin
                      </div>
                    </div>
                  </button>

                  {/* OPTION 2: Hotel Manager */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole('manager')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${
                      selectedRole === 'manager'
                        ? 'bg-gradient-to-br from-sky-600 to-blue-700 text-white border-sky-400 shadow-lg shadow-sky-500/20 ring-2 ring-sky-400/50'
                        : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Building2 className={`w-5 h-5 ${selectedRole === 'manager' ? 'text-white' : 'text-sky-400'}`} />
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${selectedRole === 'manager' ? 'bg-white/20 text-white' : 'bg-sky-500/20 text-sky-300'}`}>
                        OPTION 2
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="font-extrabold text-xs">Hotel Manager</div>
                      <div className={`text-[10px] ${selectedRole === 'manager' ? 'text-sky-100' : 'text-slate-400'}`}>
                        Hotel Owner & Executive
                      </div>
                    </div>
                  </button>

                  {/* OPTION 3: Waiter & Delivery */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole('staff')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${
                      selectedRole === 'staff'
                        ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-400 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/50'
                        : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Truck className={`w-5 h-5 ${selectedRole === 'staff' ? 'text-white' : 'text-emerald-400'}`} />
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${selectedRole === 'staff' ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-300'}`}>
                        OPTION 3
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="font-extrabold text-xs">Waiter & Delivery</div>
                      <div className={`text-[10px] ${selectedRole === 'staff' ? 'text-emerald-100' : 'text-slate-400'}`}>
                        Staff & Kitchen Portal
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Sub-Toggle for Staff Role when Option 3 is selected */}
              {selectedRole === 'staff' && (
                <div className="mb-4 bg-slate-900/80 p-2 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-400 px-2">Staff Portal View:</span>
                  <button
                    type="button"
                    onClick={() => setStaffRoleType('waiter')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      staffRoleType === 'waiter'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" /> Waiter / Delivery Dispatch
                  </button>
                  <button
                    type="button"
                    onClick={() => setStaffRoleType('kitchen')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      staffRoleType === 'kitchen'
                        ? 'bg-amber-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" /> Kitchen Chef (KDS)
                  </button>
                </div>
              )}

              {/* MULTI-TENANT HOTEL SELECTOR (For Hotel Manager & Staff) */}
              {selectedRole !== 'admin' && (
                <div className="mb-4 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Building className="w-4 h-4" /> Select Your Client Hotel Tenant:
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">Custom Sheets & Options</span>
                  </div>

                  <select
                    value={selectedHotelId}
                    onChange={(e) => setSelectedHotelId(e.target.value)}
                    className="w-full bg-slate-800 border border-sky-500/40 text-xs font-bold text-white px-3 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {hotels.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.code}) — {h.plan}
                      </option>
                    ))}
                  </select>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Selected: <strong className="text-white">{selectedHotelObj.name}</strong> (FSSAI Lic: {selectedHotelObj.fssaiNo})</span>
                  </div>
                </div>
              )}

              {/* STAFF CREDENTIAL NOTICE (For Option 3 Staff Login) */}
              {selectedRole === 'staff' && (
                <div className="mb-4 bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-200">
                  <KeyRound className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-bold block">Manager-Provided Staff Access:</strong>
                    <span>Your Hotel Manager generates your Staff ID and Password in their manager dashboard. Enter your assigned username & password below.</span>
                  </div>
                </div>
              )}

              {/* LOGIN / REGISTER FORM */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {isRegisterMode && selectedRole === 'admin' && (
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">New Client Hotel Name *</label>
                    <div className="relative">
                      <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Heritage Resort"
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-white pl-9 pr-3 py-2.5 rounded-xl outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    {selectedRole === 'admin'
                      ? 'System Admin Email'
                      : selectedRole === 'manager'
                      ? 'Hotel Owner / Manager Email'
                      : 'Staff Username / Staff ID (Assigned by Manager)'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={
                        selectedRole === 'admin'
                          ? 'admin@atithya.com'
                          : selectedRole === 'manager'
                          ? 'manager@srikrishnasagar.com'
                          : 'ST-103'
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-white pl-9 pr-3 py-2.5 rounded-xl outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    {selectedRole === 'staff' ? 'Staff Password (Assigned by Manager)' : 'Security Password'}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-white pl-9 pr-3 py-2.5 rounded-xl outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 font-black text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 text-white ${
                    selectedRole === 'admin'
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-indigo-900/50'
                      : selectedRole === 'manager'
                      ? 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sky-900/50'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-900/50'
                  }`}
                >
                  Access {selectedRole === 'admin' ? 'Option 1: System Admin' : selectedRole === 'manager' ? 'Option 2: Hotel Manager' : 'Option 3: Staff Portal'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* FAST DEMO AUTO-FILL BUTTONS */}
              <div className="pt-4 border-t border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> 1-Click Fast Demo Credentials:
                  </span>
                  <span>Instant Fill</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDemoFill('admin')}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-indigo-950/60 border border-slate-700 text-[10px] font-bold text-indigo-300 hover:border-indigo-500 text-left transition-all"
                  >
                    🛡️ Admin Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('manager')}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-sky-950/60 border border-slate-700 text-[10px] font-bold text-sky-300 hover:border-sky-500 text-left transition-all"
                  >
                    🏢 Manager Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('waiter')}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-emerald-950/60 border border-slate-700 text-[10px] font-bold text-emerald-300 hover:border-emerald-500 text-left transition-all"
                  >
                    🛎️ Waiter Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('kitchen')}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-amber-950/60 border border-slate-700 text-[10px] font-bold text-amber-300 hover:border-amber-500 text-left transition-all"
                  >
                    🍳 Chef Demo
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-slate-400">
              <button
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-sky-400 hover:text-sky-300 font-bold hover:underline"
              >
                {isRegisterMode ? 'Already have access? Sign In' : 'System Admin: Provision New Client Hotel License'}
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer isDark={true} />
    </div>
  );
}