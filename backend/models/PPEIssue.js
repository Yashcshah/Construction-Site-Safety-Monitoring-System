// models/PPEIssue.js
const mongoose = require('mongoose');
const PPEIssueSchema = new mongoose.Schema({
  workerName: { type: String, required: true },
  workerId: String,
  site: String,
  ppeItem: { type: String, required: true },               // e.g. Helmet Type C
  size: String,
  issuedAt: { type: Date, default: Date.now },
  expiryAt: Date,
  returnedAt: Date,
  notes: String,
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps:true });

module.exports = mongoose.model('PPEIssue', PPEIssueSchema);
