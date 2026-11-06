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
  Sparkles,
  LogOut,
  Menu,
  X,
  Radio
} from 'lucide-react';

export default function Navbar() {
  const { hotels, currentHotelId, setCurrentHotelId, orders, waiterCalls, isBackendConnected } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activePath = location.pathname;

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Preparing'
  ).length;

  const hideRoleSwitcher = ['/kitchen', '/delivery', '/guest'].includes(activePath);

  return (
    <header className="bg-white/95 border-b border-slate-200 text-slate-800 sticky top-0 z-50 shadow-sm backdrop-blur-md">
      {/* Top Banner: ATITHYA PRABANDHANAM SaaS Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 px-4 py-1.5 text-xs text-sky-50 font-medium flex flex-wrap items-center justify-between shadow-inner">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-sky-200" />
          <span className="font-extrabold tracking-wide">
            ATITHYA PRABANDHANAM <span className="font-normal text-sky-100 opacity-90">• EXCELLENCE IN HOSPITALITY</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-sky-900/40 px-2 py-0.5 rounded-full border border-sky-400/30">
            <Radio className="w-3 h-3 text-emerald-300 animate-pulse" /> Express REST API Connected
          </span>
        </div>

        {!hideRoleSwitcher ? (
          <div className="hidden lg:flex items-center gap-1.5">
            <span className="text-[11px] text-sky-100 font-normal mr-2">Quick Role Switcher:</span>
            <Link
              to="/admin"
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                activePath === '/admin'
                  ? 'bg-white text-slate-900 shadow'
                  : 'bg-black/20 hover:bg-black/30 text-white'
              }`}
            >
              <ShieldCheck className="w-3 h-3 text-sky-300" /> System Admin
            </Link>
            <Link
              to="/manager"
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                activePath === '/manager'
                  ? 'bg-white text-slate-900 shadow'
                  : 'bg-black/20 hover:bg-black/30 text-white'
              }`}
            >
              <Building2 className="w-3 h-3 text-cyan-300" /> Hotel Manager
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[11px] font-bold text-sky-100 uppercase tracking-wider bg-sky-900/50 px-3 py-0.5 rounded-full border border-sky-400/30">
              {activePath === '/guest'
                ? 'Guest QR Ordering Portal'
                : activePath === '/kitchen'
                ? 'Kitchen Chef Display (KDS)'
                : 'Waiter & Delivery Dispatch'}
            </span>
          </div>
        )}
      </div>

      {/* Main Navbar with Official Logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Company & Official Logo Asset */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Atithya-Prabandhanam Logo"
              className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block border-l border-slate-200 pl-3">
              <div className="font-black text-base tracking-tight text-slate-900 leading-none">
                ATITHYA PRABANDHANAM
              </div>
              <div className="text-[10px] text-sky-700 font-bold uppercase tracking-wider mt-0.5">
                Hospitality Software Management Suite
              </div>
            </div>
          </Link>
        </div>

        {/* Current Active Hotel Selector */}
        {activePath !== '/admin' && activePath !== '/guest' && (
          <div className="hidden md:flex items-center gap-2 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl shadow-inner">
            <Building2 className="w-4 h-4 text-sky-700" />
            <span className="text-xs text-slate-500 font-medium">Active Hotel:</span>
            <select
              value={currentHotelId}
              onChange={(e) => setCurrentHotelId(e.target.value)}
              className="bg-transparent text-xs font-extrabold text-slate-900 border-none outline-none cursor-pointer pr-2"
            >
              {hotels.map((h) => (
                <option key={h.id} value={h.id} className="bg-white text-slate-900">
                  {h.name} ({h.code})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {activePath !== '/guest' && (
            <div className="relative">
              <button className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors relative shadow-sm">
                <Bell className="w-5 h-5" />
                {(activeOrdersCount > 0 || waiterCalls.length > 0) && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center shadow animate-pulse">
                    {activeOrdersCount + waiterCalls.length}
                  </span>
                )}
              </button>
            </div>
          )}

          <Link
            to="/login"
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5 text-sky-400" />
            <span>{activePath === '/guest' ? 'Staff Login' : 'Logout'}</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-fade-in shadow-xl">
          {!hideRoleSwitcher ? (
            <>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Switch Role View
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-indigo-50 text-indigo-900 text-xs font-bold flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-indigo-600" /> System Admin
                </Link>
                <Link
                  to="/manager"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-sky-50 text-sky-900 text-xs font-bold flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-sky-600" /> Hotel Manager
                </Link>
              </div>
            </>
          ) : (
            <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl">
              <div className="text-xs font-extrabold text-sky-900 uppercase tracking-wider mb-1">
                {activePath === '/guest'
                  ? 'Digital Table Menu & Ordering'
                  : activePath === '/kitchen'
                  ? 'Kitchen Chef Workspace (KDS)'
                  : 'Waiter & Delivery Dispatch'}
              </div>
              <p className="text-[11px] text-slate-600">
                {activePath === '/guest'
                  ? 'Scan table QR code to browse food catalog, place live orders & request staff assistance.'
                  : 'Manage incoming food orders, kitchen status and delivery updates live.'}
              </p>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5 text-sky-400" />
                <span>{activePath === '/guest' ? 'Staff Login' : 'Logout to Login Screen'}</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
