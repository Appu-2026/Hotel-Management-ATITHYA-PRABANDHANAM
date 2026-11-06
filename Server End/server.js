const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const guestRoutes = require('./routes/guestRoutes');
const opsRoutes = require('./routes/opsRoutes');

// Models for seed endpoint
const Hotel = require('./models/Hotel');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');
const Order = require('./models/Order');
const Finance = require('./models/Finance');

const app = express();
const server = http.createServer(app);

// Socket.io for Real-Time Kitchen Display System (KDS) & Waiter Dispatch
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }
});

app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    company: 'ATITHYA PRABANDHANAM',
    system: 'Complete Hotel Management & Digital Ordering Solution Backend API',
    status: 'Operational',
    version: 'v5.0 Light SaaS Suite',
    documentation: 'Use /api/seed to populate demo data or call /api/admin, /api/manager, /api/guest, /api/ops'
  });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/guest', guestRoutes);
app.use('/api/ops', opsRoutes);

// Database Seeder Endpoint (/api/seed)
app.get('/api/seed', async (req, res) => {
  try {
    await Hotel.deleteMany({});
    await MenuItem.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Finance.deleteMany({});

    // Seed SRI KRISHNA SAGAR
    const seedHotels = [
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
        monthlyFee: 4999,
        rating: 4.9,
        reviewsCount: 2840,
        fssaiNo: '11221002000584',
        gstin: '29AAAAA8888A1Z9',
        healthAuditScore: '99/100 (A+ Grade)',
        tradeLicense: 'TL-BLR-2026-9912',
        legalCertificate: 'Certified Food Safety & Outdoor Catering Compliant by FSSAI & BBMP'
      }
    ];
    await Hotel.insertMany(seedHotels);

    const seedMenu = [
      {
        itemId: 'M101',
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
        itemId: 'M102',
        hotelId: 'H104',
        name: 'Butter Masala Dosa',
        category: 'Starters',
        price: 85,
        isVeg: true,
        isSpicy: true,
        isChefSpecial: true,
        description: 'Crispy golden crepe brushed with amul butter and potato masala filling.',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        available: true
      },
      {
        itemId: 'M105',
        hotelId: 'H104',
        name: 'Idly Vada 2+1 Combo',
        category: 'Starters',
        price: 70,
        isVeg: true,
        isSpicy: false,
        isChefSpecial: true,
        description: '2 soft steamed rice idlies & 1 crispy medu vada served with hot sambar.',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        available: true
      },
      {
        itemId: 'M113',
        hotelId: 'H104',
        name: 'Paneer Butter Masala',
        category: 'Main Course',
        price: 175,
        isVeg: true,
        isSpicy: true,
        isChefSpecial: true,
        description: 'Tender cottage cheese cubes simmered in rich creamy tomato butter gravy.',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
        available: true
      },
      {
        itemId: 'M116',
        hotelId: 'H104',
        name: 'Hydrabadi Veg Biriyani',
        category: 'Main Course',
        price: 130,
        isVeg: true,
        isSpicy: true,
        isChefSpecial: true,
        description: 'Fragrant basmati rice layered with vegetables, saffron, mint and fried onions.',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
        available: true
      }
    ];
    await MenuItem.insertMany(seedMenu);

    res.json({
      success: true,
      message: 'MongoDB database populated with SRI KRISHNA SAGAR authentic menu data!',
      hotelsCount: seedHotels.length,
      menuCount: seedMenu.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Socket.io Real-Time Connection
io.on('connection', (socket) => {
  console.log(`🔌 Client connected to Socket.io: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// MongoDB Connection & Server Listen with Port Fallback
const DEFAULT_PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/atithya_prabandhanam_db';

const startServer = (port) => {
  server
    .listen(port, () => {
      console.log(`🚀 ATITHYA PRABANDHANAM API Server running on http://localhost:${port}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} in use, trying port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
};

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Database successfully!');
    startServer(Number(DEFAULT_PORT));
  })
  .catch((error) => {
    console.warn('⚠️ MongoDB connection warning:', error.message);
    startServer(Number(DEFAULT_PORT));
  });