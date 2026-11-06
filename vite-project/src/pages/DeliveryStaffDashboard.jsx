import React from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import {
  Truck,
  Bell,
  CheckCircle2,
  MapPin,
  Clock,
  UserCheck,
  Check,
  BellRing
} from 'lucide-react';

export default function DeliveryStaffDashboard() {
  const { orders, updateOrderStatus, waiterCalls, resolveWaiterCall, currentHotel } = useApp();

  const readyOrders = orders.filter((o) => o.status === 'Ready');
  const completedOrders = orders.filter((o) => o.status === 'Delivered');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sky-700 text-xs font-bold uppercase tracking-wider">
                <UserCheck className="w-4 h-4" /> Waitstaff & Delivery Terminal
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Floor Dispatch Dashboard
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentHotel.name} • Deliver prepared kitchen dishes & respond to customer calls
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">On Duty Dispatcher</span>
            </div>
          </div>
        </div>

        {/* Live Guest Service Calls (Water / Assistance Alerts) */}
        {waiterCalls.length > 0 && (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 shadow-sm space-y-3 animate-pulse">
            <div className="flex items-center gap-2 text-sky-900 text-sm font-black uppercase">
              <BellRing className="w-5 h-5 text-sky-700" /> Live Guest Assistance Calls ({waiterCalls.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {waiterCalls.map((call) => (
                <div
                  key={call.id}
                  className="bg-white border border-sky-300 p-4 rounded-xl flex items-center justify-between shadow-sm"
                >
                  <div>
                    <div className="font-extrabold text-slate-900 text-base">{call.tableNo}</div>
                    <div className="text-xs text-sky-800 font-semibold mt-0.5">
                      Request: {call.requestType}
                    </div>
                    <div className="text-[10px] text-slate-400">{call.time}</div>
                  </div>

                  <button
                    onClick={() => resolveWaiterCall(call.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow transition-colors flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" /> Attended
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* READY FOR PICKUP & DELIVERY */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Ready for Table Delivery ({readyOrders.length})
              </h2>
            </div>

            {readyOrders.length === 0 ? (
              <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center text-slate-400 text-xs shadow-sm">
                No orders ready for pickup currently.
              </div>
            ) : (
              readyOrders.map((ord) => (
                <div
                  key={ord.id || ord.orderId}
                  className="bg-white border border-emerald-300 rounded-2xl p-5 shadow-sm space-y-3 hover:border-emerald-500 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">{ord.id || ord.orderId}</span>
                      <div className="text-xl font-black text-sky-800 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-sky-600" /> {ord.tableNo}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800">
                        {ord.status}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-1">Total: ₹{ord.totalAmount} ({ord.paymentMethod || 'Paid'})</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 space-y-1">
                    {ord.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{i.name}</span>
                        <span className="font-bold text-sky-800">x{i.qty}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => updateOrderStatus(ord.id || ord.orderId, 'Delivered')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all"
                  >
                    <Check className="w-4 h-4" /> Deliver to {ord.tableNo} & Complete
                  </button>
                </div>
              ))
            )}
          </div>

          {/* COMPLETED / DELIVERED DISPATCH HISTORY */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-600" /> Delivered Today ({completedOrders.length})
            </h2>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm divide-y divide-slate-100">
              {completedOrders.length === 0 ? (
                <div className="text-center text-xs text-slate-400 py-6">
                  No completed deliveries recorded yet.
                </div>
              ) : (
                completedOrders.map((ord) => (
                  <div key={ord.id || ord.orderId} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{ord.tableNo}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{ord.id || ord.orderId}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Delivered at {ord.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-emerald-700 text-sm">₹{ord.totalAmount}</div>
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                        Verified Paid
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
