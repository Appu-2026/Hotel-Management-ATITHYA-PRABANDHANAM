const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    plan: {
      type: String,
      enum: ['Enterprise VIP', 'Pro Manager', 'Starter Plan'],
      default: 'Pro Manager'
    },
    status: {
      type: String,
      enum: ['Active', 'Suspended'],
      default: 'Active'
    },
    maxTables: { type: Number, default: 20 },
    monthlyFee: { type: Number, default: 2999 },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 1420 },
    // Business Operations & Service Classifications
    dietaryType: {
      type: String,
      enum: ['Pure Veg', 'Non-Veg', 'Both (Veg & Non-Veg)'],
      default: 'Both (Veg & Non-Veg)'
    },
    serviceType: {
      type: String,
      enum: ['Table Service', 'Buffet System', 'Both (Table & Buffet)'],
      default: 'Table Service'
    },
    parcelService: {
      type: Boolean,
      default: true
    },
    branchType: {
      type: String,
      enum: ['Single Branch', 'Multiple Branches'],
      default: 'Single Branch'
    },
    fssaiNo: { type: String, default: '10021011000452' },
    gstin: { type: String, default: '07AAAAA0000A1Z5' },
    healthAuditScore: { type: String, default: '98/100 (A+ Grade)' },
    tradeLicense: { type: String, default: 'TL-DEL-2025-8841' },
    legalCertificate: {
      type: String,
      default: 'Certified Food Safety & Sanitation Compliant by FSSAI & Municipal Corp'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
