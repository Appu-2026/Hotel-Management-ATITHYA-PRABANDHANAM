const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');
const Finance = require('../models/Finance');

// GET /api/manager/menu?hotelId=H101
router.get('/menu', async (req, res) => {
  try {
    const { hotelId = 'H101' } = req.query;
    const menuItems = await MenuItem.find({ hotelId }).sort({ createdAt: -1 });
    res.json({ success: true, count: menuItems.length, menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/manager/menu (Add dish)
router.post('/menu', async (req, res) => {
  try {
    const { hotelId = 'H101', name, category, price, isVeg, isSpicy, isChefSpecial, description, image } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Dish name and price required.' });
    }

    const itemId = `M${Math.floor(100 + Math.random() * 900)}`;
    const newItem = await MenuItem.create({
      itemId,
      hotelId,
      name,
      category: category || 'Main Course',
      price: Number(price),
      isVeg: isVeg !== undefined ? isVeg : true,
      isSpicy: Boolean(isSpicy),
      isChefSpecial: Boolean(isChefSpecial),
      description: description || '',
      image: image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      available: true
    });

    res.status(201).json({ success: true, message: `Dish '${name}' added to menu!`, menuItem: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/manager/menu/:id/toggle-stock
router.put('/menu/:id/toggle-stock', async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await MenuItem.findOne({ itemId: id }) || await MenuItem.findById(id);
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Dish not found.' });
    }

    dish.available = !dish.available;
    await dish.save();

    res.json({ success: true, message: `Dish '${dish.name}' availability set to ${dish.available}`, menuItem: dish });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/manager/menu/:id
router.delete('/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await MenuItem.deleteOne({ itemId: id });
    res.json({ success: true, message: 'Dish removed from menu.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/manager/staff?hotelId=H101
router.get('/staff', async (req, res) => {
  try {
    const { hotelId = 'H101' } = req.query;
    const staffMembers = await User.find({ hotelId, role: { $ne: 'SystemAdmin' } }).select('-password');
    res.json({ success: true, count: staffMembers.length, staffMembers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/manager/staff
router.post('/staff', async (req, res) => {
  try {
    const { hotelId = 'H101', name, role, shift, phone, email } = req.body;
    if (!name || !role) {
      return res.status(400).json({ success: false, message: 'Staff name and role required.' });
    }

    const staffId = `ST-${Math.floor(10 + Math.random() * 90)}`;
    const newStaff = await User.create({
      staffId,
      name,
      email: email || `${staffId.toLowerCase()}@hotel.com`,
      password: 'staff_password_123',
      role: role || 'Waitstaff',
      hotelId,
      shift: shift || 'Morning',
      phone: phone || '',
      status: 'On Duty'
    });

    res.status(201).json({ success: true, message: `Staff member '${name}' added!`, staff: newStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/manager/finances?hotelId=H101
router.get('/finances', async (req, res) => {
  try {
    const { hotelId = 'H101' } = req.query;
    const records = await Finance.find({ hotelId }).sort({ createdAt: -1 });
    
    const totalIncome = records.filter(r => r.recordType === 'Income').reduce((a, b) => a + b.amount, 0);
    const totalExpense = records.filter(r => r.recordType === 'Expense').reduce((a, b) => a + b.amount, 0);
    const netProfit = totalIncome - totalExpense;

    res.json({
      success: true,
      summary: { totalRevenue: totalIncome || 245800, totalExpenses: totalExpense || 112400, netProfit: netProfit || 133400 },
      records
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/manager/expenses
router.post('/expenses', async (req, res) => {
  try {
    const { hotelId = 'H101', category, description, amount } = req.body;
    if (!description || !amount) {
      return res.status(400).json({ success: false, message: 'Expense description and amount required.' });
    }

    const newExpense = await Finance.create({
      hotelId,
      recordType: 'Expense',
      category: category || 'Grocery & Dairy',
      description,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      paymentMode: 'Bank / Cash'
    });

    res.status(201).json({ success: true, message: 'Expense logged successfully!', expense: newExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
