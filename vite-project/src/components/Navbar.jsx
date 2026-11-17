import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Building2,
  UtensilsCrossed,
  Truck,
  QrCode,
  Bell,
  LogOut,
  Menu,
  X,
  MapPin,
  Utensils,
  Package
} from 'lucide-react';

export default function Navbar() {
  const {
    hotels,
    currentHotel,
    currentHotelId,
    setCurrentHotelId,
    orders,
    waiterCalls
  } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activePath = location.pathname;
  const isAdmin = activePath === '/admin';
  const activeHotel = currentHotel || hotels.find((h) => h.id === currentHotelId) || hotels[0];

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Preparing'
  ).length;

  // =========================================================================
  // 1. SYSTEM ADMIN HEADER (ONLY for /admin)
  // =========================================================================
  if (isAdmin) {
    return (
      <header className="bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Atithya-Prabandhanam Logo"
              className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="border-l border-slate-200 pl-2.5 sm:pl-3">
              <div className="font-black text-sm sm:text-base tracking-tight text-slate-900 leading-none">
                ATITHYA PRABANDHANAM
              </div>
              <div className="text-[9px] sm:text-[10px] text-sky-700 font-bold uppercase tracking-wider mt-1">
                System Super Admin Suite
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/manager"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Open Hotel Manager</span>
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5 text-sky-400" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // =========================================================================
  // 2. HOTEL DETAILS HEADER (For Whole Project Apart from System Admin)
  // =========================================================================
  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Hotel Brand & Clean Operational Summary */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center font-black shadow-sm shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="min-w-0">
            {/* Row 1: Hotel Name */}
            <div className="flex items-center gap-1.5 min-w-0">
              <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight truncate leading-tight">
                {activeHotel.name}
              </h1>
            </div>

            {/* Row 2: Location & Badges (Strictly Horizontal, Never Multi-line) */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-500 mt-0.5 whitespace-nowrap overflow-hidden">
              <span className="font-mono font-bold text-sky-800 bg-sky-50 border border-sky-200 px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] shrink-0">
                {activeHotel.code}
              </span>

              {/* Dietary Badge */}
              <span
                className={`px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-bold shrink-0 ${
                  activeHotel.dietaryType === 'Pure Veg'
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                    : activeHotel.dietaryType === 'Non-Veg'
                    ? 'text-rose-700 bg-rose-50 border border-rose-200'
                    : 'text-amber-800 bg-amber-50 border border-amber-200'
                }`}
              >
                {activeHotel.dietaryType === 'Pure Veg'
                  ? 'Pure Veg'
                  : activeHotel.dietaryType === 'Non-Veg'
                  ? 'Non-Veg'
                  : 'Veg & Non-Veg'}
              </span>

              {/* Address (Hidden on small mobile, visible on desktop) */}
              <span className="hidden md:inline truncate max-w-[200px] text-slate-500">
                • {activeHotel.address}
              </span>

              {/* Service Style */}
              <span className="hidden lg:inline px-1.5 py-0.2 rounded text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200">
                {activeHotel.serviceType || 'Table Service'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Switcher, Notifications & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Switch Hotel Dropdown (Staff / Manager) */}
          {activePath !== '/guest' && activePath !== '/login' && hotels.length > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl">
              <span className="text-[10px] text-slate-500 font-medium">Hotel:</span>
              <select
                value={currentHotelId}
                onChange={(e) => setCurrentHotelId(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1"
              >
                {hotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Active Orders Bell */}
          {activePath !== '/guest' && (
            <button
              title="Active Orders & Calls"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {(activeOrdersCount > 0 || waiterCalls.length > 0) && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-600 text-white font-bold text-[9px] flex items-center justify-center animate-pulse">
                  {activeOrdersCount + waiterCalls.length}
                </span>
              )}
            </button>
          )}

          {/* Logout / Login Action */}
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">
              {activePath === '/guest' ? 'Staff Login' : 'Logout'}
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-slate-100 text-slate-800"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2 animate-fade-in shadow-xl">
          <div className="text-xs font-bold text-slate-800">{activeHotel.name}</div>
          <div className="text-[11px] text-slate-500">
            {activeHotel.address} • FSSAI: {activeHotel.fssaiNo || '10021011000452'}
          </div>

          {hotels.length > 1 && activePath !== '/guest' && (
            <div className="pt-2">
              <label className="text-[10px] text-slate-500 block mb-1">Switch Active Hotel:</label>
              <select
                value={currentHotelId}
                onChange={(e) => {
                  setCurrentHotelId(e.target.value);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 p-2 rounded-lg"
              >
                {hotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.code})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              to="/guest"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5 text-sky-600" /> Guest Menu
            </Link>
            <Link
              to="/manager"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-600" /> Manager Suite
            </Link>
            <Link
              to="/kitchen"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" /> Kitchen (KDS)
            </Link>
            <Link
              to="/delivery"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-600" /> Dispatch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
