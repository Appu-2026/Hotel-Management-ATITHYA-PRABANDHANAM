import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import {
  QrCode,
  UtensilsCrossed,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  Leaf,
  BellRing,
  Check,
  Search,
  Wifi,
  ShieldCheck,
  Award,
  CreditCard,
  QrCode as QrIcon,
  Wallet,
  ChevronRight,
  X,
  Star,
  List,
  LayoutGrid,
  Maximize2
} from 'lucide-react';

export default function CustomerGuestPortal() {
  const [searchParams] = useSearchParams();
  const { currentHotel, menuItems, placeOrder, requestWaiterService, orders } = useApp();

  const tableNo = searchParams.get('table') || 'Table 04';
  const orderType = searchParams.get('type') || 'Table Order';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [viewMode, setViewMode] = useState('compact'); // 'compact' | 'grid' | 'detailed'

  // Cart state: { itemId: quantity }
  const [cart, setCart] = useState({});
  const [orderNotes, setOrderNotes] = useState('');
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI / GPay');

  // Legal Modal
  const [showLegalModal, setShowLegalModal] = useState(false);

  // Placed Order state
  const [placedOrder, setPlacedOrder] = useState(null);
  const [waiterCallAlert, setWaiterCallAlert] = useState(false);
  const [paymentSuccessAnimation, setPaymentSuccessAnimation] = useState(false);

  const categories = ['All', 'Starters', 'Main Course', 'Breads', 'Beverages', 'Desserts'];

  const addToCart = (itemId) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[itemId] > 1) {
        copy[itemId] -= 1;
      } else {
        delete copy[itemId];
      }
      return copy;
    });
  };

  const cartItemsList = Object.keys(cart).map((id) => {
    const dish = menuItems.find((m) => m.id === id || m.itemId === id);
    return {
      ...dish,
      qty: cart[id]
    };
  });

  const cartSubtotal = cartItemsList.reduce((acc, curr) => acc + (curr ? curr.price * curr.qty : 0), 0);
  const gstTax = Math.round(cartSubtotal * 0.05); // 5% GST
  const cartGrandTotal = cartSubtotal + gstTax;

  const handleConfirmPaymentAndPlaceOrder = () => {
    if (cartItemsList.length === 0) return;

    setPaymentSuccessAnimation(true);

    setTimeout(() => {
      const newOrder = placeOrder(tableNo, cartItemsList, orderNotes, orderType, paymentMethod);
      setPlacedOrder(newOrder);
      setCart({});
      setOrderNotes('');
      setShowPaymentModal(false);
      setShowCartDrawer(false);
      setPaymentSuccessAnimation(false);
    }, 1500);
  };

  const handleCallWaiterClick = (type) => {
    requestWaiterService(tableNo, type);
    setWaiterCallAlert(true);
    setTimeout(() => setWaiterCallAlert(false), 4000);
  };

  const filteredDishes = menuItems.filter((dish) => {
    const matchesCat = selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = filterVegOnly ? dish.isVeg : true;
    return matchesCat && matchesSearch && matchesVeg && dish.available;
  });

  // Track status of active placed order if any
  const trackedOrder = placedOrder
    ? orders.find((o) => o.id === placedOrder.id || o.orderId === placedOrder.id) || placedOrder
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-32">
      <Navbar />

      {/* Sky Theme Hotel Banner & Compliance Header */}
      <div className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-sky-100 py-3 sm:py-6 px-3 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-2.5 sm:space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-sky-600 text-white flex items-center gap-1 shadow-sm">
                  <QrCode className="w-3.5 h-3.5" /> Scanned {tableNo}
                </span>
                <span className="text-[11px] font-bold text-sky-800 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded-full">
                  FSSAI Lic: {currentHotel.fssaiNo || '10021011000452'}
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {currentHotel.name}
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                <span>{currentHotel.address}</span>
                <span>•</span>
                <span className="text-sky-800 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {currentHotel.rating || '4.8'} ({currentHotel.reviewsCount || '1,420'} Reviews)
                </span>
              </p>
            </div>

            {/* Legal & FSSAI Report Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLegalModal(true)}
                className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-[11px] sm:text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-sky-600" /> View FSSAI & Legal Reports
              </button>
            </div>
          </div>

          {/* Quick Guest Wi-Fi & Safety Badges */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1">
            <div className="flex items-center gap-2.5 bg-white border border-slate-200 p-2 sm:p-3 rounded-xl shadow-sm">
              <div className="p-1.5 bg-sky-50 text-sky-700 rounded-lg shrink-0">
                <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold truncate">Guest Wi-Fi</div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">Atithya_Guest_5G</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white border border-slate-200 p-2 sm:p-3 rounded-xl shadow-sm">
              <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg shrink-0">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold truncate">Hygiene Score</div>
                <div className="text-[11px] sm:text-xs font-bold text-emerald-700 truncate">{currentHotel.healthAuditScore || '98/100 (A+)'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Waiter Alert Notification */}
        {waiterCallAlert && (
          <div className="bg-sky-50 border border-sky-200 text-sky-900 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between animate-fade-in shadow-sm">
            <div className="flex items-center gap-3">
              <BellRing className="w-5 h-5 text-sky-600 animate-bounce" />
              <span className="text-xs font-bold">
                Waitstaff notified! Someone is arriving at {tableNo} shortly.
              </span>
            </div>
          </div>
        )}

        {/* Live Placed Order Tracker */}
        {trackedOrder && (
          <div className="bg-white border border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] sm:text-xs text-slate-400 font-mono">Order ID: {trackedOrder.id || trackedOrder.orderId}</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Live Order Progress</h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${trackedOrder.status === 'Delivered'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-sky-100 text-sky-900 animate-pulse'
                  }`}
              >
                {trackedOrder.status}
              </span>
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
              <div className="space-y-1">
                <div className="h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-700">1. Placed</span>
              </div>
              <div className="space-y-1">
                <div
                  className={`h-2 rounded-full ${trackedOrder.status === 'Preparing' ||
                    trackedOrder.status === 'Ready' ||
                    trackedOrder.status === 'Delivered'
                    ? 'bg-emerald-500'
                    : 'bg-slate-200'
                    }`}
                />
                <span
                  className={
                    trackedOrder.status === 'Preparing' ? 'text-sky-700' : 'text-slate-500'
                  }
                >
                  2. Cooking
                </span>
              </div>
              <div className="space-y-1">
                <div
                  className={`h-2 rounded-full ${trackedOrder.status === 'Ready' || trackedOrder.status === 'Delivered'
                    ? 'bg-emerald-500'
                    : 'bg-slate-200'
                    }`}
                />
                <span className={trackedOrder.status === 'Ready' ? 'text-purple-700' : 'text-slate-500'}>
                  3. Ready
                </span>
              </div>
              <div className="space-y-1">
                <div
                  className={`h-2 rounded-full ${trackedOrder.status === 'Delivered' ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                />
                <span className={trackedOrder.status === 'Delivered' ? 'text-emerald-700' : 'text-slate-500'}>
                  4. Served
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Assistance Call Buttons */}
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => handleCallWaiterClick('Water Assistance')}
            className="flex-1 py-2 sm:py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <BellRing className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" /> Request Water
          </button>
          <button
            onClick={() => handleCallWaiterClick('Call Waiter')}
            className="flex-1 py-2 sm:py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" /> Call Waiter
          </button>
        </div>

        {/* Search, Category Filter & View Density Controls */}
        <div className="space-y-2.5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search food, beverages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-900 pl-9 pr-3 py-2 sm:py-2.5 rounded-xl text-xs focus:outline-none focus:border-sky-500 shadow-sm"
              />
            </div>

            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 shadow-sm shrink-0 ${filterVegOnly
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
            >
              <Leaf className="w-3.5 h-3.5" /> Veg
            </button>

            {/* Layout Density Switcher for Mobile & Desktop */}
            <div className="flex bg-white border border-slate-200 rounded-xl p-0.5 shadow-sm shrink-0">
              <button
                onClick={() => setViewMode('compact')}
                title="Compact Vertical List (Shows 3-4 items on screen)"
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'compact' ? 'bg-sky-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="2-Column Grid View (Shows 4-6 items on screen)"
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-sky-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                title="Detailed Cards View"
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'detailed' ? 'bg-sky-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Dishes Container */}
        {viewMode === 'grid' ? (
          /* 2-Column Grid Layout (Mobile App Grid Style - Shows 4-6 dishes on screen) */
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {filteredDishes.map((dish) => {
              const dishId = dish.id || dish.itemId;
              const qtyInCart = cart[dishId] || 0;

              return (
                <div
                  key={dishId}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-24 sm:h-32 object-cover"
                    />
                    <span
                      className={`absolute top-2 left-2 w-3 h-3 rounded-full border-2 shadow-sm ${
                        dish.isVeg ? 'border-emerald-600 bg-emerald-100' : 'border-rose-600 bg-rose-100'
                      }`}
                    />
                  </div>

                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs line-clamp-1">{dish.name}</h3>
                      <div className="text-xs font-black text-sky-700 mt-1">₹{dish.price}</div>
                    </div>

                    <div className="mt-2">
                      {qtyInCart === 0 ? (
                        <button
                          onClick={() => addToCart(dishId)}
                          className="w-full py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg shadow flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-sky-50 border border-sky-200 p-0.5 rounded-lg">
                          <button
                            onClick={() => removeFromCart(dishId)}
                            className="p-1 rounded bg-white text-slate-800 border border-slate-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-extrabold text-sky-700 text-xs">{qtyInCart}</span>
                          <button
                            onClick={() => addToCart(dishId)}
                            className="p-1 rounded bg-sky-600 text-white font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : viewMode === 'compact' ? (
          /* Vertical Compact List View (Default Mobile View - Shows 3-4 items on screen) */
          <div className="space-y-2">
            {filteredDishes.map((dish) => {
              const dishId = dish.id || dish.itemId;
              const qtyInCart = cart[dishId] || 0;

              return (
                <div
                  key={dishId}
                  className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm hover:shadow-md transition-shadow flex gap-3 items-center"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 ${
                          dish.isVeg ? 'border-emerald-600 bg-emerald-100' : 'border-rose-600 bg-rose-100'
                        }`}
                      />
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{dish.name}</h3>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{dish.description}</p>
                    <div className="text-xs sm:text-sm font-black text-sky-700 mt-1">₹{dish.price}</div>
                  </div>

                  <div className="shrink-0">
                    {qtyInCart === 0 ? (
                      <button
                        onClick={() => addToCart(dishId)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-sky-50 border border-sky-200 p-0.5 rounded-lg">
                        <button
                          onClick={() => removeFromCart(dishId)}
                          className="p-1 rounded bg-white border border-slate-200 text-slate-800 shadow-sm"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-extrabold text-sky-700 text-xs px-1">
                          {qtyInCart}
                        </span>
                        <button
                          onClick={() => addToCart(dishId)}
                          className="p-1 rounded bg-sky-600 text-white hover:bg-sky-700 font-bold shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Detailed Cards View */
          <div className="space-y-4">
            {filteredDishes.map((dish) => {
              const dishId = dish.id || dish.itemId;
              const qtyInCart = cart[dishId] || 0;

              return (
                <div
                  key={dishId}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full border-2 ${
                          dish.isVeg ? 'border-emerald-600 bg-emerald-100' : 'border-rose-600 bg-rose-100'
                        }`}
                      />
                      <h3 className="font-extrabold text-slate-900 text-base">{dish.name}</h3>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{dish.description}</p>
                    <div className="text-base font-black text-sky-700 mt-2">₹{dish.price}</div>
                  </div>

                  <div className="shrink-0">
                    {qtyInCart === 0 ? (
                      <button
                        onClick={() => addToCart(dishId)}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 p-1 rounded-xl">
                        <button
                          onClick={() => removeFromCart(dishId)}
                          className="p-1 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-extrabold text-sky-700 text-xs px-1">
                          {qtyInCart}
                        </span>
                        <button
                          onClick={() => addToCart(dishId)}
                          className="p-1 rounded-lg bg-sky-600 text-white hover:bg-sky-700 font-bold shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar */}
      {cartItemsList.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto z-40">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-slate-800 animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center font-black text-white relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-white text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsList.reduce((a, b) => a + (b ? b.qty : 0), 0)}
                </span>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 font-bold uppercase">
                  {tableNo} • {cartItemsList.length} Items Selected
                </div>
                <div className="text-lg font-black text-sky-400">Total: ₹{cartGrandTotal}</div>
              </div>
            </div>

            <button
              onClick={() => setShowCartDrawer(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2 transition-transform transform active:scale-95"
            >
              View Cart & Pay <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer Slide-Over */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-md w-full h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-sky-600" />
                  <h3 className="text-lg font-black text-slate-900">Your Order Cart</h3>
                </div>
                <button
                  onClick={() => setShowCartDrawer(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 mb-6">
                {cartItemsList.map((item) => (
                  item ? (
                    <div
                      key={item.id || item.itemId}
                      className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                        <div className="text-xs text-sky-700 font-semibold mt-0.5">₹{item.price} each</div>
                      </div>

                      <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-lg">
                        <button
                          onClick={() => removeFromCart(item.id || item.itemId)}
                          className="p-1 rounded text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs px-1 text-slate-900">{item.qty}</span>
                        <button
                          onClick={() => addToCart(item.id || item.itemId)}
                          className="p-1 rounded text-sky-700 hover:bg-sky-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>

              {/* Special Instructions Note */}
              <div className="mb-6">
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Special Cooking Instructions / Requests
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Less oil, extra spicy, no onion..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 p-2.5 rounded-xl outline-none focus:border-sky-500"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-bold">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Restaurant Tax (5%):</span>
                  <span className="font-bold">₹{gstTax}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-900 font-black text-sm">
                  <span>Total Amount Payable:</span>
                  <span className="text-sky-700">₹{cartGrandTotal}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowCartDrawer(false);
                  setShowPaymentModal(true);
                }}
                className="w-full py-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                Proceed to Payment Gateway <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Payment Gateway Modal (UPI, Cards, NetBanking, Pay Cash) */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {paymentSuccessAnimation ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Payment Successful!</h3>
                <p className="text-xs text-slate-500">
                  Transaction verified via {paymentMethod}. Your order has been dispatched directly to the kitchen chef!
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sky-600" /> Digital Payment Gateway
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Order Total: <strong className="text-sky-700 font-extrabold">₹{cartGrandTotal}</strong> ({tableNo})
                  </p>
                </div>

                {/* Payment Option Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Select Payment Option</label>

                  <div
                    onClick={() => setPaymentMethod('UPI / GPay')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${paymentMethod === 'UPI / GPay'
                      ? 'bg-sky-50 border-sky-500 text-sky-950 font-bold'
                      : 'bg-stone-50 border-stone-200 text-slate-700'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrIcon className="w-5 h-5 text-sky-600" />
                      <div>
                        <div className="text-xs font-bold">UPI / GPay / PhonePe / Paytm</div>
                        <div className="text-[10px] text-slate-400">Scan QR Code or UPI ID</div>
                      </div>
                    </div>
                    {paymentMethod === 'UPI / GPay' && <Check className="w-4 h-4 text-sky-600" />}
                  </div>

                  <div
                    onClick={() => setPaymentMethod('Credit / Debit Card')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${paymentMethod === 'Credit / Debit Card'
                      ? 'bg-sky-50 border-sky-500 text-sky-950 font-bold'
                      : 'bg-stone-50 border-stone-200 text-slate-700'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs font-bold">Credit / Debit Card</div>
                        <div className="text-[10px] text-slate-400">Visa, Mastercard, RuPay</div>
                      </div>
                    </div>
                    {paymentMethod === 'Credit / Debit Card' && <Check className="w-4 h-4 text-sky-600" />}
                  </div>

                  <div
                    onClick={() => setPaymentMethod('Pay Cash at Table')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${paymentMethod === 'Pay Cash at Table'
                      ? 'bg-sky-50 border-sky-500 text-sky-950 font-bold'
                      : 'bg-stone-50 border-stone-200 text-slate-700'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="text-xs font-bold">Pay Cash / Bill at Table</div>
                        <div className="text-[10px] text-slate-400">Pay waiter after meal</div>
                      </div>
                    </div>
                    {paymentMethod === 'Pay Cash at Table' && <Check className="w-4 h-4 text-sky-600" />}
                  </div>
                </div>

                {/* Payment QR preview if UPI */}
                {paymentMethod === 'UPI / GPay' && (
                  <div className="bg-stone-100 p-4 rounded-xl text-center space-y-2 border border-stone-200">
                    <div className="text-[11px] font-bold text-slate-700">Scan QR Code using GPay / PhonePe</div>
                    <div className="bg-white p-3 rounded-lg w-32 h-32 mx-auto border border-slate-200 flex items-center justify-center">
                      <QrIcon className="w-24 h-24 text-slate-900" />
                    </div>
                    <div className="text-[10px] font-mono text-sky-800">UPI: atithya.hotel@okaxis</div>
                  </div>
                )}

                <button
                  onClick={handleConfirmPaymentAndPlaceOrder}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Confirm & Pay ₹{cartGrandTotal}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FSSAI & Legal Compliance Report Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setShowLegalModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Food Safety & Legal Compliance Report</h3>
              <p className="text-xs text-slate-500 mt-1">{currentHotel.name}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600">FSSAI Registration License No:</span>
                  <span className="font-extrabold text-sky-800 font-mono">{currentHotel.fssaiNo || '10021011000452'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600">GST Registration Number (GSTIN):</span>
                  <span className="font-bold text-slate-800 font-mono">{currentHotel.gstin || '07AAAAA0000A1Z5'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600">Municipal Trade License:</span>
                  <span className="font-bold text-slate-800">{currentHotel.tradeLicense || 'TL-2025-8841'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600">Hygiene & Safety Audit Grade:</span>
                  <span className="font-extrabold text-emerald-700">{currentHotel.healthAuditScore || '98/100 (A+ Grade)'}</span>
                </div>
              </div>

              <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl text-sky-950 leading-relaxed">
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-sky-700" /> Government Safety Assurance
                </div>
                This establishment is audited and certified by the Food Safety & Standards Authority of India (FSSAI). All kitchen staff undergo daily temperature and sanitization protocols.
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                Software Platform Security Verified by <strong>ATITHYA PRABANDHANAM SaaS Suite</strong>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
