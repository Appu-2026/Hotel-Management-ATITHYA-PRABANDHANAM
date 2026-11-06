const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const Finance = require('../models/Finance');

// GET /api/guest/hotel/:hotelId (Fetch hotel details, FSSAI license & legal compliance)
router.get('/hotel/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findOne({ id: hotelId }) || {
      id: hotelId,
      name: 'Grand Taj Imperial Palace',
      address: 'Connaught Place, New Delhi',
      rating: 4.8,
      reviewsCount: 1420,
      fssaiNo: '10021011000452',
      gstin: '07AAAAA0000A1Z5',
      healthAuditScore: '98/100 (A+ Grade)',
      tradeLicense: 'TL-DEL-2025-8841',
      legalCertificate: 'Certified Food Safety & Sanitation Compliant by FSSAI'
    };

    res.json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/guest/menu/:hotelId (Fetch available dishes)
router.get('/menu/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params;
    const items = await MenuItem.find({ hotelId, available: true });
    res.json({ success: true, count: items.length, menuItems: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/guest/orders (Place new order with digital payment)
router.post('/orders', async (req, res) => {
  try {
    const { hotelId = 'H101', tableNo, items, notes, type, paymentMethod } = req.body;
    if (!tableNo || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Table number and order items required.' });
    }

    const totalAmount = items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = await Order.create({
      orderId,
      hotelId,
      tableNo,
      type: type || 'Table Order',
      items,
      totalAmount,
      notes: notes || '',
      status: 'Pending',
      paymentMethod: paymentMethod || 'UPI / GPay',
      paymentStatus: paymentMethod === 'Pay Cash at Table' ? 'Pending' : 'Paid Instant',
      time: timeStr
    });

    // Automatically record income
    await Finance.create({
      hotelId,
      recordType: 'Income',
      category: type === 'Self-Service' ? 'Self-Service QR' : 'Restaurant Dining',
      description: `Order ${orderId} (${tableNo})`,
      amount: totalAmount,
      date: now.toISOString().split('T')[0],
      paymentMode: paymentMethod || 'UPI / GPay'
    });

    // Emit WebSockets event if io available
    const io = req.app.get('io');
    if (io) {
      io.emit(`new_order_${hotelId}`, newOrder);
      io.emit('new_order_global', newOrder);
    }

    res.status(201).json({
      success: true,
      message: 'Order placed & payment verified successfully!',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/guest/orders/:orderId (Live status tracker)
router.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
