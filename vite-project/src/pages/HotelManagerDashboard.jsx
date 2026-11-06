import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import QRCodeModal from '../components/QRCodeModal';
import {
  Building2,
  UtensilsCrossed,
  Users,
  DollarSign,
  QrCode,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Search,
  ExternalLink,
  Flame,
  Leaf,
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function HotelManagerDashboard() {
  const {
    currentHotel,
    menuItems,
    addMenuItem,
    toggleItemAvailability,
    deleteMenuItem,
    staffMembers,
    addStaffMember,
    deleteStaffMember,
    finances,
    addExpenseRecord,
    orders
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');

  // Menu Form Modal State
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [menuForm, setMenuForm] = useState({
    name: '',
    category: 'Main Course',
    price: 250,
    isVeg: true,
    isSpicy: false,
    isChefSpecial: false,
    description: '',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
  });

  // Staff Form Modal State
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: '',
    role: 'Delivery / Waitstaff',
    shift: 'Morning',
    phone: '',
    username: '',
    password: ''
  });

  // Expense Form Modal State
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    category: 'Grocery & Dairy',
    amount: 1500,
    description: ''
  });

  // QR Modal State
  const [selectedQRTable, setSelectedQRTable] = useState(null);

  // Table Generator Mock Tables
  const [tablesList] = useState([
    { tableNo: 'Table 01', type: 'Table Order', zone: 'AC Main Hall' },
    { tableNo: 'Table 02', type: 'Table Order', zone: 'AC Main Hall' },
    { tableNo: 'Table 03', type: 'Table Order', zone: 'AC Main Hall' },
    { tableNo: 'Table 04', type: 'Table Order', zone: 'VIP Garden Lounge' },
    { tableNo: 'Table 05', type: 'Table Order', zone: 'VIP Garden Lounge' },
    { tableNo: 'Table 06', type: 'Table Order', zone: 'Rooftop Terrace' },
    { tableNo: 'Self-Service Kiosk 01', type: 'Self-Service', zone: 'Main Entrance Kiosk' },
    { tableNo: 'Self-Service Kiosk 02', type: 'Self-Service', zone: 'Takeaway Counter' }
  ]);

  const handleAddMenuSubmit = (e) => {
    e.preventDefault();
    if (!menuForm.name) return;
    addMenuItem(menuForm);
    setShowAddMenuModal(false);
    setMenuForm({
      name: '',
      category: 'Main Course',
      price: 250,
      isVeg: true,
      isSpicy: false,
      isChefSpecial: false,
      description: '',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
    });
  };

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!staffForm.name) return;
    addStaffMember(staffForm);
    setShowAddStaffModal(false);
    setStaffForm({ name: '', role: 'Delivery / Waitstaff', shift: 'Morning', phone: '', username: '', password: '' });
  };

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.amount) return;
    addExpenseRecord(expenseForm);
    setShowAddExpenseModal(false);
    setExpenseForm({ category: 'Grocery & Dairy', amount: 1500, description: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hotel Manager Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-sky-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" /> Hotel Executive Manager Suite
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentHotel.name}
            </h1>
            <p className="text-slate-500 text-xs mt-1 flex items-center gap-3 flex-wrap font-medium">
              <span>Code: {currentHotel.code}</span>
              <span>•</span>
              <span>Address: {currentHotel.address}</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                FSSAI Lic: {currentHotel.fssaiNo || '10021011000452'}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded-2xl shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Powered by ATITHYA PRABANDHANAM:</span>
            <span className="text-xs font-mono font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
              {currentHotel.id}
            </span>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Overview & Sales
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'menu'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" /> Hotel Menu ({menuItems.length})
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'staff'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" /> Hotel Staff ({staffMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('finances')}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'finances'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Income & Expenditure
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'qr'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <QrCode className="w-4 h-4" /> Table QR Codes
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase">Total Revenue</div>
                <div className="text-2xl font-black text-sky-700 mt-2">
                  ₹{finances.summary.totalRevenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 mt-1 font-medium">Dining & QR orders combined</div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase">Total Operational Expenses</div>
                <div className="text-2xl font-black text-rose-600 mt-2">
                  ₹{finances.summary.totalExpenses.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Groceries, staff wages & power</div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase">Net Hotel Profit</div>
                <div className="text-2xl font-black text-emerald-700 mt-2">
                  ₹{finances.summary.netProfit.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 mt-1 font-bold">+54% Profit Margin</div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase">Live Orders Today</div>
                <div className="text-2xl font-black text-slate-900 mt-2">{orders.length} Orders</div>
                <div className="text-[11px] text-sky-700 mt-1 font-medium">Real-time Express API synced</div>
              </div>
            </div>

            {/* Live Orders Activity Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-600" /> Recent Customer Orders
              </h3>
              <div className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <div key={ord.id || ord.orderId} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{ord.id || ord.orderId}</span>
                        <span className="text-xs font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                          {ord.tableNo}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {ord.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sky-700 text-sm">₹{ord.totalAmount}</div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-sky-100 text-sky-900 animate-pulse'
                        }`}
                      >
                        {ord.status} ({ord.paymentMethod || 'Paid'})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MENU MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Hotel Digital Menu Editor</h2>
                <p className="text-xs text-slate-500">
                  Manage dishes displayed to guests on the QR code scan page.
                </p>
              </div>
              <button
                onClick={() => setShowAddMenuModal(true)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add New Dish Item
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {menuItems.map((item) => {
                const dishId = item.id || item.itemId;

                return (
                  <div
                    key={dishId}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            item.isVeg ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                        {item.isChefSpecial && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-900 border border-sky-300 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-sky-600" /> Chef Special
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                          <span className="font-extrabold text-sky-700 text-base">₹{item.price}</span>
                        </div>
                        <div className="text-[10px] text-sky-700 font-semibold mt-0.5">
                          Category: {item.category}
                        </div>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">{item.description}</p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                        <button
                          onClick={() => toggleItemAvailability(dishId)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                            item.available
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {item.available ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {item.available ? 'In Stock' : 'Out of Stock'}
                        </button>

                        <button
                          onClick={() => deleteMenuItem(dishId)}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: STAFF MANAGEMENT */}
        {activeTab === 'staff' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Hotel Staff Roster</h2>
                <p className="text-xs text-slate-500">
                  Assign job roles for Kitchen Team, Chefs, Waitstaff, and Cashiers.
                </p>
              </div>
              <button
                onClick={() => setShowAddStaffModal(true)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Staff Member
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Staff Name & ID</th>
                    <th className="py-3.5 px-4">Job Role / Access</th>
                    <th className="py-3.5 px-4">Login Credentials (Manager Assigned)</th>
                    <th className="py-3.5 px-4">Shift Schedule</th>
                    <th className="py-3.5 px-4">Phone Number</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {staffMembers.map((st) => (
                    <tr key={st.id || st._id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div>{st.name}</div>
                        <div className="text-[10px] text-sky-700 font-mono">ID: {st.id || st.staffId}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        <span className="px-2.5 py-1 rounded-full text-[10px] bg-sky-50 text-sky-900 border border-sky-200 font-bold">
                          {st.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 font-mono text-[11px] inline-block">
                          <span className="text-slate-500">User:</span> <strong className="text-sky-800">{st.username || st.id || st.staffId}</strong>
                          <span className="mx-1.5 text-slate-300">|</span>
                          <span className="text-slate-500">Pass:</span> <strong className="text-slate-800">{st.password || 'staff123'}</strong>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{st.shift}</td>
                      <td className="py-3.5 px-4 text-slate-500">{st.phone}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {st.status || 'On Duty'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => deleteStaffMember(st.id || st._id)}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: INCOME & EXPENDITURE */}
        {activeTab === 'finances' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Income & Expenditure Ledger</h2>
                <p className="text-xs text-slate-500">
                  Track dining revenue, daily operational expenses, and profit logs.
                </p>
              </div>
              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Log Expense Record
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income Ledger */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-emerald-700 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Recent Income Logs
                </h3>
                <div className="divide-y divide-slate-100">
                  {finances.incomes.map((inc) => (
                    <div key={inc.id || inc._id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{inc.description}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {inc.category} • {inc.date} • Mode: {inc.paymentMode}
                        </div>
                      </div>
                      <div className="font-black text-emerald-700 text-sm">+₹{inc.amount}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expense Ledger */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-rose-700 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" /> Operational Expense Logs
                </h3>
                <div className="divide-y divide-slate-100">
                  {finances.expenses.map((exp) => (
                    <div key={exp.id || exp._id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{exp.description}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {exp.category} • {exp.date}
                        </div>
                      </div>
                      <div className="font-black text-rose-700 text-sm">-₹{exp.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: QR CODE & TABLES */}
        {activeTab === 'qr' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-slate-900">QR Code & Table Generator</h2>
              <p className="text-xs text-slate-500">
                Generate dynamic QR code tags for dining tables and self-service kiosks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {tablesList.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-sky-500 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                        {t.type}
                      </span>
                      <QrCode className="w-5 h-5 text-sky-700 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-black text-slate-900 text-lg">{t.tableNo}</h3>
                    <p className="text-xs text-slate-500 mt-1">{t.zone}</p>
                  </div>

                  <button
                    onClick={() => setSelectedQRTable({ ...t, hotelId: currentHotel.id })}
                    className="mt-5 w-full py-2 bg-stone-100 hover:bg-sky-600 hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <QrCode className="w-4 h-4" /> View & Print Tag
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add Menu Item Modal */}
      {showAddMenuModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Dish to Menu</h3>
            <form onSubmit={handleAddMenuSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-700 block mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-700 block mb-1">Category</label>
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Breads">Breads</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-700 block mb-1">Description</label>
                <textarea
                  rows="2"
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMenuModal(false)}
                  className="px-4 py-2 bg-slate-100 text-xs font-bold rounded-xl text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Staff Member Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Staff Member</h3>
            <p className="text-xs text-slate-500 mb-4">
              Create staff profile and assign manager-provided login credentials for system access.
            </p>

            <form onSubmit={handleAddStaffSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={staffForm.name}
                  onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-700 font-medium block mb-1">Job Role *</label>
                  <select
                    value={staffForm.role}
                    onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                  >
                    <option value="Delivery / Waitstaff">Delivery / Waitstaff</option>
                    <option value="Head Chef">Head Chef</option>
                    <option value="Sous Chef">Sous Chef</option>
                    <option value="Billing Cashier">Billing Cashier</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-700 font-medium block mb-1">Shift Schedule</label>
                  <select
                    value={staffForm.shift}
                    onChange={(e) => setStaffForm({ ...staffForm, shift: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Full Day">Full Day</option>
                    <option value="Night Shift">Night Shift</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98450 00000"
                  value={staffForm.phone}
                  onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                />
              </div>

              <div className="bg-sky-50 border border-sky-200 p-3 rounded-2xl space-y-2">
                <div className="text-[11px] font-bold text-sky-900">Manager-Assigned Login Credentials</div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-600 block mb-1">Username / ID</label>
                    <input
                      type="text"
                      placeholder="e.g. ST-105"
                      value={staffForm.username}
                      onChange={(e) => setStaffForm({ ...staffForm, username: e.target.value })}
                      className="w-full bg-white border border-sky-300 text-xs text-slate-900 p-2 rounded-lg outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-600 block mb-1">Login Password</label>
                    <input
                      type="text"
                      placeholder="e.g. waiter123"
                      value={staffForm.password}
                      onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                      className="w-full bg-white border border-sky-300 text-xs text-slate-900 p-2 rounded-lg outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 bg-slate-100 text-xs font-bold rounded-xl text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Add Staff & Issue Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Render Modal */}
      <QRCodeModal
        isOpen={Boolean(selectedQRTable)}
        onClose={() => setSelectedQRTable(null)}
        tableData={selectedQRTable}
        hotelName={currentHotel.name}
      />
    </div>
  );
}
