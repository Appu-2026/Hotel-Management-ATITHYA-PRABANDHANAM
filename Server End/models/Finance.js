const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema(
  {
    hotelId: { type: String, required: true, default: 'H101' },
    recordType: { type: String, enum: ['Income', 'Expense'], required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    paymentMode: { type: String, default: 'Digital UPI' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Finance', financeSchema);
