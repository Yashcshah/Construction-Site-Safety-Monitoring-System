const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
    location: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now },
    deadline: { type: Date },         // follow your Task shape
    resolved: { type: Boolean, default: false },
    photos: [{ type: String }],       // S3/URL strings if you add uploads later
  },
  { timestamps: true }
);

module.exports = mongoose.model('Incident', incidentSchema);
