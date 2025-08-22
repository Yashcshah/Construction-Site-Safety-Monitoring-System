// models/Incident.js
const mongoose = require('mongoose');

const EvidenceSchema = new mongoose.Schema({
  kind: { type: String, enum: ['photo','video','doc'], required: true },
  url: String,
  note: String
},{ _id:false });

const IncidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Incident','Hazard'], required: true },
  site: { type: String, required: true },                // e.g. "LOT 731 Walker St"
  severity: { type: String, enum: ['Low','Med','High','Critical'], default: 'Low' },
  status: { type: String, enum: ['Open','In Progress','Resolved','Closed'], default: 'Open' },
  description: String,
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actions: [{
    at: { type: Date, default: Date.now },
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    note: String
  }],
  evidences: [EvidenceSchema]
}, { timestamps: true });

module.exports = mongoose.model('Incident', IncidentSchema);
