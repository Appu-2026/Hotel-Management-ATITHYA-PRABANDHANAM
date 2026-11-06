const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true },
    hotelId: { type: String, required: true, default: 'H101' },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Starters', 'Main Course', 'Breads', 'Beverages', 'Desserts'],
      default: 'Main Course'
    },
    price: { type: Number, required: true },
    isVeg: { type: Boolean, default: true },
    isSpicy: { type: Boolean, default: false },
    isChefSpecial: { type: Boolean, default: false },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
