const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// GET /api/admin/hotels (List all onboarded client hotels)
router.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/hotels (Provision new client hotel license)
router.post('/hotels', async (req, res) => {
  try {
    const {
      name,
      code,
      ownerName,
      ownerEmail,
      phone,
      address,
      plan,
      monthlyFee,
      maxTables,
      dietaryType,
      serviceType,
      parcelService,
      branchType
    } = req.body;
    if (!name || !ownerEmail) {
      return res.status(400).json({ success: false, message: 'Hotel Name and Owner Email required.' });
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
      monthlyFee: monthlyFee || 2999,
      maxTables: maxTables || 20,
      dietaryType: dietaryType || 'Both (Veg & Non-Veg)',
      serviceType: serviceType || 'Table Service',
      parcelService: parcelService !== undefined ? parcelService : true,
      branchType: branchType || 'Single Branch'
    });

    res.status(201).json({
      success: true,
      message: `Software License Provisioned for ${name}!`,
      hotel: newHotel
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/admin/hotels/:id/status (Activate / Suspend license)
router.patch('/hotels/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findOne({ id });
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found.' });
    }

    hotel.status = hotel.status === 'Active' ? 'Suspended' : 'Active';
    await hotel.save();

    res.json({
      success: true,
      message: `Hotel '${hotel.name}' status set to ${hotel.status}`,
      hotel
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/stats (SaaS Super Admin Analytics)
router.get('/stats', async (req, res) => {
  try {
    const totalHotels = await Hotel.countDocuments();
    const activeHotels = await Hotel.countDocuments({ status: 'Active' });
    const hotelsList = await Hotel.find({ status: 'Active' });
    const totalSaaSRevenue = hotelsList.reduce((acc, h) => acc + (h.monthlyFee || 0), 0);

    res.json({
      success: true,
      stats: {
        totalHotels,
        activeHotels,
        totalSaaSRevenue,
        platformName: 'ATITHYA PRABANDHANAM',
        lockedControlSheetsCount: 3
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
