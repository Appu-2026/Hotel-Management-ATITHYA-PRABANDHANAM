const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    staffId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['SystemAdmin', 'HotelManager', 'HeadChef', 'SousChef', 'Waitstaff', 'Cashier'],
      required: true
    },
    hotelId: { type: String, default: 'H101' },
    shift: { type: String, default: 'Morning' },
    phone: { type: String, default: '' },
    status: { type: String, enum: ['On Duty', 'Off Duty'], default: 'On Duty' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
