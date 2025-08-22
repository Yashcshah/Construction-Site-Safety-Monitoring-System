
const mongoose = require('mongoose');
const ComplianceRecordSchema = new mongoose.Schema({
  site: { type: String, required: true },
  equipmentId: { type: String, required: true },           // asset tag / QR
  itemName: String,
  checkType: { type: String, enum: ['Inspection','Test','Calibration'], required: true },
  dueDate: Date,
  status: { type: String, enum: ['Compliant','Non-Compliant','Overdue'], default: 'Compliant' },
  notes: String,
  files: [{ url:String, label:String }],
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps:true });

module.exports = mongoose.model('ComplianceRecord', ComplianceRecordSchema);
