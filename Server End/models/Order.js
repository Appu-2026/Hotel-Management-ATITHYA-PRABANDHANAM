const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    hotelId: { type: String, required: true, default: 'H101' },
    tableNo: { type: String, required: true },
    type: { type: String, enum: ['Table Order', 'Self-Service'], default: 'Table Order' },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Ready', 'Delivered'],
      default: 'Pending'
    },
    paymentMethod: {
      type: String,
      enum: ['UPI / GPay', 'Credit / Debit Card', 'Pay Cash at Table', 'Online QR'],
      default: 'UPI / GPay'
    },
    paymentStatus: {
      type: String,
      enum: ['Paid Instant', 'Paid', 'Pending'],
      default: 'Paid Instant'
    },
    time: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
