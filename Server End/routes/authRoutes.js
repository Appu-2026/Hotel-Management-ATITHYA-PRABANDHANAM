const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const { JWT_SECRET, verifyToken } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email/ID and password.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Fallback demo authentication for instant testing
      const token = jwt.sign(
        { id: 'demo_user', email, role: role || 'HotelManager', hotelId: 'H101' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({
        success: true,
        message: 'Demo Authentication Successful',
        token,
        user: { email, role: role || 'HotelManager', hotelId: 'H101' }
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials password.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, hotelId: user.hotelId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: `${user.role} Authentication Successful`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hotelId: user.hotelId
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/register-hotel
router.post('/register-hotel', async (req, res) => {
  try {
    const {
      name,
      code,
      ownerName,
      ownerEmail,
      password,
      phone,
      address,
      plan,
      dietaryType,
      serviceType,
      parcelService,
      branchType
    } = req.body;
    if (!name || !ownerEmail || !password) {
      return res.status(400).json({ success: false, message: 'Hotel Name, Owner Email, and Password required.' });
    }

    const hotelId = `H${Math.floor(100 + Math.random() * 900)}`;
    const newHotel = await Hotel.create({
      id: hotelId,
      name,
      code: code || `HOTEL-${hotelId}`,
      ownerName,
      ownerEmail,
      phone: phone || '',
      address: address || '',
      plan: plan || 'Pro Manager',
      dietaryType: dietaryType || 'Both (Veg & Non-Veg)',
      serviceType: serviceType || 'Table Service',
      parcelService: parcelService !== undefined ? parcelService : true,
      branchType: branchType || 'Single Branch'
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: ownerName,
      email: ownerEmail.toLowerCase(),
      password: hashedPassword,
      role: 'HotelManager',
      hotelId: hotelId,
      phone
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role, hotelId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: `Hotel '${name}' provisioned successfully!`,
      token,
      hotel: newHotel,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, hotelId }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user: user || req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
