import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminApi, managerApi, guestApi, opsApi } from '../services/api';

const AppContext = createContext();

// Company Name: ATITHYA PRABANDHANAM (SaaS Platform Owner)
// Client Hotels: Independent businesses managed on the platform
const initialHotels = [
  {
    id: 'H104',
    name: 'SRI KRISHNA SAGAR',
    code: 'SKS-BANGALORE',
    ownerName: 'Krishna Murthy',
    ownerEmail: 'manager@srikrishnasagar.com',
    phone: '+91 98450 12345',
    address: '100ft Road, Indiranagar, Bengaluru, Karnataka',
    plan: 'Enterprise VIP',
    status: 'Active',
    maxTables: 30,
    joinedDate: '2026-09-08',
    monthlyFee: 4999,
    rating: 4.9,
    reviewsCount: 2840,
    fssaiNo: '11221002000584',
    gstin: '29AAAAA8888A1Z9',
    healthAuditScore: '99/100 (A+ Grade)',
    tradeLicense: 'TL-BLR-2026-9912',
    legalCertificate: 'Certified Food Safety & Outdoor Catering Compliant by FSSAI & BBMP'
  },
  {
    id: 'H101',
    name: 'Grand Taj Imperial Palace',
    code: 'GTIP-DELHI',
    ownerName: 'Rajesh Kumar',
    ownerEmail: 'rajesh@grandtaj.com',
    phone: '+91 98765 43210',
    address: 'Connaught Place, New Delhi',
    plan: 'Enterprise VIP',
    status: 'Active',
    maxTables: 25,
    joinedDate: '2025-01-15',
    monthlyFee: 4999,
    rating: 4.8,
    reviewsCount: 1420,
    fssaiNo: '10021011000452',
    gstin: '07AAAAA0000A1Z5',
    healthAuditScore: '98/100 (A+ Grade)',
    tradeLicense: 'TL-DEL-2025-8841',
    legalCertificate: 'Certified Food Safety & Sanitation Compliant by FSSAI & Municipal Corp'
  },
  {
    id: 'H102',
    name: 'Royal Heritage Resort & Dining',
    code: 'RHR-JAIPUR',
    ownerName: 'Sunita Sharma',
    ownerEmail: 'sunita@royalheritage.com',
    phone: '+91 98123 45678',
    address: 'Amer Road, Jaipur, Rajasthan',
    plan: 'Pro Manager',
    status: 'Active',
    maxTables: 15,
    joinedDate: '2025-03-10',
    monthlyFee: 2999,
    rating: 4.7,
    reviewsCount: 980,
    fssaiNo: '10022022000891',
    gstin: '08BBBBB1111B2Z6',
    healthAuditScore: '96/100 (A Grade)',
    tradeLicense: 'TL-JPR-2025-9932',
    legalCertificate: 'Grade A Hygiene Certification Verified by Rajasthan Food Safety Dept.'
  }
];

// Exact Menu Items Extracted from SRI KRISHNA SAGAR Menu Card Image
const initialMenuItems = [
  // TIFFEN & DOSAS
  {
    id: 'M101',
    hotelId: 'H104',
    name: 'Masala Dosa',
    category: 'Starters',
    price: 70,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Golden crispy rice crepe filled with spiced potato masala, served with coconut chutney & sambar.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M102',
    hotelId: 'H104',
    name: 'Butter Masala Dosa',
    category: 'Starters',
    price: 85,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Crispy golden crepe brushed with generous amul butter and potato masala filling.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M103',
    hotelId: 'H104',
    name: 'Plain Dosa',
    category: 'Starters',
    price: 60,
    isVeg: true,
    isSpicy: false,
    isChefSpecial: false,
    description: 'Classic thin & crispy South Indian rice crepe served with fresh coconut & tomato chutneys.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M104',
    hotelId: 'H104',
    name: 'Onion Uttappa',
    category: 'Starters',
    price: 80,
    isVeg: true,
    isSpicy: false,
    isChefSpecial: false,
    description: 'Thick savory pancake topped with finely chopped onions, green chilies, and coriander.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M105',
    hotelId: 'H104',
    name: 'Idly Vada 2+1 Combo',
    category: 'Starters',
    price: 70,
    isVeg: true,
    isSpicy: false,
    isChefSpecial: true,
    description: '2 soft steamed rice idlies & 1 crispy medu vada served with piping hot lentil sambar.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M106',
    hotelId: 'H104',
    name: 'Chow Chow Bath',
    category: 'Starters',
    price: 70,
    isVeg: true,
    isSpicy: false,
    isChefSpecial: true,
    description: 'Traditional combo of savory Khara Bath (Upma) & sweet Kesari Bath served together.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M107',
    hotelId: 'H104',
    name: 'Bisi Bele Bath',
    category: 'Starters',
    price: 60,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: false,
    description: 'Aromatic Karnataka hot lentil rice dish slow-cooked with fresh vegetables, ghee & spices.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M108',
    hotelId: 'H104',
    name: 'Bonda Soup',
    category: 'Starters',
    price: 45,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Crispy fried urad dal bondas submerged in rich, flavorful hot spiced moong soup.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // HOT BEVERAGES
  {
    id: 'M109',
    hotelId: 'H104',
    name: 'Filter Coffee / Tea',
    category: 'Beverages',
    price: 20,
    isVeg: true,
    isSpicy: false,
    isChefSpecial: true,
    description: 'Authentic South Indian chicory filter coffee brewed fresh with frothy milk.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M110',
    hotelId: 'H104',
    name: 'Badam Milk / Horlicks',
    category: 'Beverages',
    price: 20,
    isVeg: true,
    isSpicy: false,
    isChefSpecial: false,
    description: 'Warm saffron almond milk garnished with crushed nuts.',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // MEALS & BREADS
  {
    id: 'M111',
    hotelId: 'H104',
    name: 'South Indian Special Meals',
    category: 'Main Course',
    price: 85,
    isVeg: true,
    isSpicy: false,
    isChefSpecial: true,
    description: 'Complete thali with steamed rice, sambar, rasam, kootu, palya, curd, papad & sweet.',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M112',
    hotelId: 'H104',
    name: 'Channa Batura',
    category: 'Main Course',
    price: 100,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Fluffy giant fried batura served with spicy Punjabi chickpea masala gravy.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // PANEER & KADAI SPECIALS
  {
    id: 'M113',
    hotelId: 'H104',
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    price: 175,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Tender cottage cheese cubes simmered in rich creamy tomato cashew butter gravy.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M114',
    hotelId: 'H104',
    name: 'Kadai Paneer Special',
    category: 'Main Course',
    price: 190,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Cottage cheese tossed with bell peppers, onions, and coarse kadai spices.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M115',
    hotelId: 'H104',
    name: 'Sri Krishna Sagar Special Gravy',
    category: 'Main Course',
    price: 210,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Signature rich royal vegetable & paneer curry crafted by house head chef.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // RICE & BIRYANI
  {
    id: 'M116',
    hotelId: 'H104',
    name: 'Hydrabadi Veg Biriyani',
    category: 'Main Course',
    price: 130,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Fragrant basmati rice layered with fresh vegetables, saffron, mint and fried onions.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M117',
    hotelId: 'H104',
    name: 'Paneer Tikka Biriyani',
    category: 'Main Course',
    price: 140,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Chargrilled tandoori paneer tikka layered in aromatic dum biryani basmati rice.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M118',
    hotelId: 'H104',
    name: 'Jeera Rice / Ghee Rice',
    category: 'Main Course',
    price: 105,
    isVeg: true,
    isSpicy: false,
    isChefSpecial: false,
    description: 'Fragrant basmati rice tempered with aromatic cumin seeds and pure cow ghee.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // CHINESE & NOODLES
  {
    id: 'M119',
    hotelId: 'H104',
    name: 'Gobi Manchuria Dry / Gravy',
    category: 'Starters',
    price: 95,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Crispy fried cauliflower florets tossed in tangy soya garlic manchurian sauce.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M120',
    hotelId: 'H104',
    name: 'Paneer Chilli Dry',
    category: 'Starters',
    price: 150,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Cubes of cottage cheese wok-fried with bell peppers, green chilies, and spicy Indo-Chinese sauces.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'M121',
    hotelId: 'H104',
    name: 'Sezwan Paneer Noodles',
    category: 'Main Course',
    price: 130,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: true,
    description: 'Spicy Schezwan noodles stir-fried with cottage cheese strips and crisp garden vegetables.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // SOUPS
  {
    id: 'M122',
    hotelId: 'H104',
    name: 'Veg Manchow Soup',
    category: 'Starters',
    price: 70,
    isVeg: true,
    isSpicy: true,
    isChefSpecial: false,
    description: 'Spicy garlic-flavored Chinese vegetable soup served topped with crispy fried noodles.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    available: true
  }
];

const initialStaff = [
  { id: 'ST-101', username: 'ST-101', name: 'Chef Murugan Swamy', role: 'Head Chef', shift: 'Morning', phone: '9845011111', status: 'On Duty', password: 'chef123' },
  { id: 'ST-102', username: 'ST-102', name: 'Venkatesh Rao', role: 'Kitchen Sous Chef', shift: 'Evening', phone: '9845022222', status: 'On Duty', password: 'chef123' },
  { id: 'ST-103', username: 'ST-103', name: 'Karthik N', role: 'Delivery / Waitstaff', shift: 'Morning', phone: '9845033333', status: 'On Duty', password: 'waiter123' },
  { id: 'ST-104', username: 'ST-104', name: 'Srinivas B', role: 'Billing Cashier', shift: 'Full Day', phone: '9845055555', status: 'On Duty', password: 'cashier123' }
];

const initialOrders = [
  {
    id: 'ORD-901',
    tableNo: 'Table 04',
    type: 'Table Order',
    items: [
      { name: 'Masala Dosa', qty: 2, price: 70 },
      { name: 'Filter Coffee / Tea', qty: 2, price: 20 },
      { name: 'Idly Vada 2+1 Combo', qty: 1, price: 70 }
    ],
    totalAmount: 250,
    notes: 'Extra coconut chutney please.',
    status: 'Pending',
    paymentMethod: 'UPI / GPay',
    paymentStatus: 'Paid Instant',
    time: '09:15 AM',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ORD-902',
    tableNo: 'Table 02',
    type: 'Table Order',
    items: [
      { name: 'Paneer Butter Masala', qty: 1, price: 175 },
      { name: 'Butter Naan', qty: 3, price: 50 },
      { name: 'Hydrabadi Veg Biriyani', qty: 1, price: 130 }
    ],
    totalAmount: 455,
    notes: 'Serve biryani hot.',
    status: 'Preparing',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid Instant',
    time: '09:05 AM',
    createdAt: new Date().toISOString()
  }
];

const initialFinances = {
  summary: {
    totalRevenue: 389400,
    totalExpenses: 142000,
    netProfit: 247400,
    month: 'September 2026'
  },
  incomes: [
    { id: 'INC-201', date: '2026-09-08', category: 'Restaurant Dining', description: 'Morning breakfast sales', amount: 28450, paymentMode: 'UPI / GPay' },
    { id: 'INC-202', date: '2026-09-07', category: 'Outdoor Catering', description: 'Corporate catering advance', amount: 85000, paymentMode: 'Bank Transfer' }
  ],
  expenses: [
    { id: 'EXP-301', date: '2026-09-08', category: 'Grocery & Dairy', description: 'Fresh vegetables & butter batch', amount: 6400, status: 'Paid' },
    { id: 'EXP-302', date: '2026-09-07', category: 'Staff Salaries', description: 'Weekly chef disbursement', amount: 22500, status: 'Paid' }
  ]
};

export const AppProvider = ({ children }) => {
  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem('atithya_hotels');
    return saved ? JSON.parse(saved) : initialHotels;
  });

  const [currentHotelId, setCurrentHotelId] = useState('H104');

  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('atithya_menu');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [staffMembers, setStaffMembers] = useState(() => {
    const saved = localStorage.getItem('atithya_staff');
    return saved ? JSON.parse(saved) : initialStaff;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('atithya_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [finances, setFinances] = useState(() => {
    const saved = localStorage.getItem('atithya_finances');
    return saved ? JSON.parse(saved) : initialFinances;
  });

  const [waiterCalls, setWaiterCalls] = useState([]);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Sync with Backend API on mount
  useEffect(() => {
    const syncBackend = async () => {
      try {
        const resHotels = await adminApi.getHotels();
        if (resHotels.data && resHotels.data.hotels && resHotels.data.hotels.length > 0) {
          setHotels(resHotels.data.hotels);
          setIsBackendConnected(true);
        }
      } catch (err) {
        setIsBackendConnected(false);
      }

      try {
        const resMenu = await managerApi.getMenu(currentHotelId);
        if (resMenu.data && resMenu.data.menuItems && resMenu.data.menuItems.length > 0) {
          setMenuItems(resMenu.data.menuItems);
        }
      } catch (err) {}
    };

    syncBackend();
  }, [currentHotelId]);

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem('atithya_hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('atithya_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('atithya_staff', JSON.stringify(staffMembers));
  }, [staffMembers]);

  useEffect(() => {
    localStorage.setItem('atithya_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('atithya_finances', JSON.stringify(finances));
  }, [finances]);

  const currentHotel = hotels.find((h) => h.id === currentHotelId) || hotels[0];

  // Actions
  const addHotel = (newHotelData) => {
    const createdHotel = {
      id: `H${100 + hotels.length + 1}`,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewsCount: 1,
      fssaiNo: '11225099000123',
      gstin: '29ABCDE1234F1Z5',
      healthAuditScore: '99/100 (A+ Grade)',
      tradeLicense: 'TL-2026-NEW',
      legalCertificate: 'Certified FSSAI & Municipal Health Compliant',
      ...newHotelData
    };
    setHotels([createdHotel, ...hotels]);

    adminApi.provisionHotel(createdHotel).catch(() => {});
    return createdHotel;
  };

  const toggleHotelStatus = (hotelId) => {
    setHotels(
      hotels.map((h) =>
        h.id === hotelId ? { ...h, status: h.status === 'Active' ? 'Suspended' : 'Active' } : h
      )
    );
    adminApi.toggleHotelStatus(hotelId).catch(() => {});
  };

  const addMenuItem = (itemData) => {
    const newItem = {
      id: `M${menuItems.length + 1}`,
      available: true,
      ...itemData
    };
    setMenuItems([...menuItems, newItem]);
    managerApi.addMenuItem({ hotelId: currentHotelId, ...itemData }).catch(() => {});
  };

  const toggleItemAvailability = (itemId) => {
    setMenuItems(
      menuItems.map((item) => (item.id === itemId || item.itemId === itemId ? { ...item, available: !item.available } : item))
    );
    managerApi.toggleStock(itemId).catch(() => {});
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(menuItems.filter((item) => item.id !== itemId && item.itemId !== itemId));
    managerApi.deleteMenuItem(itemId).catch(() => {});
  };

  const addStaffMember = (staffData) => {
    const staffId = `ST-${100 + staffMembers.length + 1}`;
    const newStaff = {
      id: staffId,
      username: staffData.username || staffId,
      password: staffData.password || 'staff123',
      status: 'On Duty',
      ...staffData
    };
    setStaffMembers([...staffMembers, newStaff]);
    managerApi.addStaff({ hotelId: currentHotelId, ...newStaff }).catch(() => {});
  };

  const deleteStaffMember = (staffId) => {
    setStaffMembers(staffMembers.filter((s) => s.id !== staffId && s._id !== staffId));
  };

  const addExpenseRecord = (expenseData) => {
    const newExp = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      ...expenseData
    };
    const updatedExpenses = [newExp, ...finances.expenses];
    const newTotalExpenses = finances.summary.totalExpenses + Number(expenseData.amount);
    const newNetProfit = finances.summary.totalRevenue - newTotalExpenses;

    setFinances({
      ...finances,
      expenses: updatedExpenses,
      summary: {
        ...finances.summary,
        totalExpenses: newTotalExpenses,
        netProfit: newNetProfit
      }
    });

    managerApi.addExpense({ hotelId: currentHotelId, ...expenseData }).catch(() => {});
  };

  const placeOrder = (
    tableNo,
    orderItems,
    notes = '',
    orderType = 'Table Order',
    paymentMethod = 'UPI / GPay'
  ) => {
    const totalAmount = orderItems.reduce((acc, curr) => acc + (curr ? curr.price * curr.qty : 0), 0);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNo,
      type: orderType,
      items: orderItems,
      totalAmount,
      notes,
      status: 'Pending',
      paymentMethod,
      paymentStatus: paymentMethod === 'Pay Cash at Table' ? 'Pending' : 'Paid Instant',
      time: timeStr,
      createdAt: now.toISOString()
    };

    setOrders([newOrder, ...orders]);

    guestApi
      .placeOrder({
        hotelId: currentHotelId,
        tableNo,
        items: orderItems,
        notes,
        type: orderType,
        paymentMethod
      })
      .catch(() => {});

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((ord) => (ord.id === orderId || ord.orderId === orderId ? { ...ord, status: newStatus } : ord))
    );
    opsApi.updateOrderStatus(orderId, newStatus).catch(() => {});
  };

  const requestWaiterService = (tableNo, requestType = 'Water / Assistance') => {
    const newCall = {
      id: `CALL-${Date.now()}`,
      tableNo,
      requestType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Active'
    };
    setWaiterCalls((prev) => [newCall, ...prev]);
    opsApi.requestWaiterCall({ hotelId: currentHotelId, tableNo, requestType }).catch(() => {});
  };

  const resolveWaiterCall = (callId) => {
    setWaiterCalls((prev) => prev.filter((c) => c.id !== callId));
    opsApi.resolveWaiterCall(callId).catch(() => {});
  };

  return (
    <AppContext.Provider
      value={{
        hotels,
        currentHotel,
        currentHotelId,
        setCurrentHotelId,
        addHotel,
        toggleHotelStatus,
        menuItems,
        addMenuItem,
        toggleItemAvailability,
        deleteMenuItem,
        staffMembers,
        addStaffMember,
        deleteStaffMember,
        orders,
        placeOrder,
        updateOrderStatus,
        finances,
        addExpenseRecord,
        waiterCalls,
        requestWaiterService,
        resolveWaiterCall,
        isBackendConnected
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
