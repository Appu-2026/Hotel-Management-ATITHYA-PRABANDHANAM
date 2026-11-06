const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// In-memory waiter calls store for fast real-time alerts
let waiterCallsStore = [];

// GET /api/ops/kitchen-orders/:hotelId (Active KDS queue)
router.get('/kitchen-orders/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params;
    const activeOrders = await Order.find({ hotelId, status: { $ne: 'Delivered' } }).sort({ createdAt: 1 });
    res.json({ success: true, count: activeOrders.length, orders: activeOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/ops/orders/:orderId/status (Update: Preparing -> Ready -> Delivered)
router.patch('/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'New status required.' });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    order.status = status;
    if (status === 'Delivered') {
      order.paymentStatus = 'Paid';
    }
    await order.save();

    // Broadcast Socket.io event if available
    const io = req.app.get('io');
    if (io) {
      io.emit(`order_status_${orderId}`, order);
      io.emit(`order_updated_${order.hotelId}`, order);
    }

    res.json({ success: true, message: `Order ${orderId} updated to ${status}`, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/ops/waiter-call (Guest calls waiter)
router.post('/waiter-call', (req, res) => {
  const { tableNo, requestType = 'Water Assistance', hotelId = 'H101' } = req.body;
  const newCall = {
    id: `CALL-${Date.now()}`,
    hotelId,
    tableNo,
    requestType,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'Active'
  };

  waiterCallsStore.unshift(newCall);

  const io = req.app.get('io');
  if (io) {
    io.emit(`waiter_call_${hotelId}`, newCall);
  }

  res.status(201).json({ success: true, message: 'Waitstaff notified!', waiterCall: newCall });
});

// GET /api/ops/waiter-calls/:hotelId
router.get('/waiter-calls/:hotelId', (req, res) => {
  const { hotelId } = req.params;
  const calls = waiterCallsStore.filter(c => c.hotelId === hotelId);
  res.json({ success: true, count: calls.length, waiterCalls: calls });
});

// DELETE /api/ops/waiter-calls/:callId
router.delete('/waiter-calls/:callId', (req, res) => {
  const { callId } = req.params;
  waiterCallsStore = waiterCallsStore.filter(c => c.id !== callId);
  res.json({ success: true, message: 'Waiter call resolved.' });
});

module.exports = router;
