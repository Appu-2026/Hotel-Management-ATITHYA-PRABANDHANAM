import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import {
  UtensilsCrossed,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flame,
  ChefHat,
  BellRing,
  Check,
  XCircle
} from 'lucide-react';

export default function KitchenStaffDashboard() {
  const { orders, updateOrderStatus, menuItems, toggleItemAvailability, currentHotel } = useApp();

  const [activeTab, setActiveTab] = useState('kds');

  const activeOrders = orders.filter((o) => o.status !== 'Delivered');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Kitchen KDS Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sky-700 text-xs font-bold uppercase tracking-wider">
                <UtensilsCrossed className="w-4 h-4" /> Live KDS Display Terminal
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Kitchen Team & Chef Dashboard
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentHotel.name} • Live customer QR orders & Express REST API synced
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('kds')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'kds'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              <BellRing className="w-4 h-4" /> Active Cooking Orders ({activeOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'inventory'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              <Flame className="w-4 h-4" /> Kitchen Dish Availability
            </button>
          </div>
        </div>

        {/* TAB 1: KITCHEN DISPLAY SYSTEM GRID */}
        {activeTab === 'kds' && (
          <div className="space-y-6 animate-fade-in">
            {activeOrders.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm space-y-3">
                <div className="p-4 bg-sky-50 text-sky-600 rounded-full w-fit mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">All Clear in Kitchen!</h3>
                <p className="text-xs text-slate-500">
                  No active orders waiting right now. New customer QR orders will pop up here instantly.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeOrders.map((ord) => (
                  <div
                    key={ord.id || ord.orderId}
                    className={`rounded-2xl border p-5 flex flex-col justify-between shadow-sm transition-all ${
                      ord.status === 'Pending'
                        ? 'bg-white border-sky-400'
                        : ord.status === 'Preparing'
                        ? 'bg-white border-emerald-500'
                        : 'bg-white border-purple-400'
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                        <div>
                          <div className="text-xs text-slate-400 font-mono font-bold">{ord.id || ord.orderId}</div>
                          <div className="text-lg font-black text-sky-800 flex items-center gap-2">
                            <span>{ord.tableNo}</span>
                            <span className="text-[10px] font-semibold bg-slate-100 px-2 py-0.5 rounded-full text-slate-700">
                              {ord.type}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                              ord.status === 'Pending'
                                ? 'bg-sky-100 text-sky-900 animate-pulse'
                                : ord.status === 'Preparing'
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-purple-100 text-purple-900'
                            }`}
                          >
                            {ord.status}
                          </span>
                          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {ord.time}
                          </div>
                        </div>
                      </div>

                      {/* Payment Verification Tag */}
                      <div className="mb-3 bg-sky-50 border border-sky-200 text-sky-900 px-3 py-1 rounded-xl text-xs flex items-center justify-between font-bold">
                        <span>Payment Verified:</span>
                        <span className="text-sky-800">{ord.paymentMethod || 'UPI / Instant'} ({ord.paymentStatus || 'Paid'})</span>
                      </div>

                      {/* Items List */}
                      <div className="space-y-2.5 mb-4">
                        {ord.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between"
                          >
                            <span className="font-bold text-slate-900 text-sm">
                              {item.name}
                            </span>
                            <span className="px-2.5 py-1 bg-sky-100 text-sky-900 font-black text-sm rounded-lg border border-sky-200">
                              x{item.qty}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Customer Notes */}
                      {ord.notes && (
                        <div className="bg-sky-50 border border-sky-200 p-2.5 rounded-xl text-xs text-sky-950 mb-4 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Guest Request: </span>
                            {ord.notes}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="pt-3 border-t border-slate-100">
                      {ord.status === 'Pending' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id || ord.orderId, 'Preparing')}
                          className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all"
                        >
                          <Flame className="w-4 h-4" /> Start Cooking Now
                        </button>
                      )}

                      {ord.status === 'Preparing' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id || ord.orderId, 'Ready')}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Mark Food Ready for Pickup
                        </button>
                      )}

                      {ord.status === 'Ready' && (
                        <div className="py-2 bg-purple-50 text-purple-800 font-bold text-xs rounded-xl text-center border border-purple-200">
                          Awaiting Waiter / Delivery Dispatch
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INVENTORY STOCK TOGGLE */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-sky-700" /> Kitchen Out-of-Stock Fast Controls
              </h2>
              <p className="text-xs text-slate-500">
                If ingredients run out, chefs can toggle dish availability off here instantly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {menuItems.map((item) => {
                  const dishId = item.id || item.itemId;

                  return (
                    <div
                      key={dishId}
                      className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                        <div className="text-[10px] text-slate-500">{item.category} • ₹{item.price}</div>
                      </div>

                      <button
                        onClick={() => toggleItemAvailability(dishId)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          item.available
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {item.available ? <Check className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {item.available ? 'Available' : 'Out of Stock'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
