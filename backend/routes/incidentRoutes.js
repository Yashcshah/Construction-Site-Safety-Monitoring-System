// backend/routes/incidentRoutes.js
const router = require('express').Router();
const Incident = require('../models/Incident');

// ✅ ADD THIS LINE (correct relative path & named export)
const { protect } = require('../middleware/authMiddleware');

// CREATE
router.post('/', protect, async (req, res) => {
  const incident = await Incident.create({ ...req.body, reportedBy: req.user._id });
  res.status(201).json(incident);
});

// LIST
router.get('/', protect, async (req, res) => {
  const { status, site, type, severity, q } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (site) filter.site = site;
  if (type) filter.type = type;
  if (severity) filter.severity = severity;
  if (q) filter.$text = { $search: q };

  const items = await Incident.find(filter).sort('-createdAt');
  res.json(items);
});

// GET ONE
router.get('/:id', protect, async (req, res) => {
  const item = await Incident.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

// UPDATE
router.put('/:id', protect, async (req, res) => {
  const updated = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// ASSIGN / RESOLVE / CLOSE
router.post('/:id/assign', protect, async (req, res) => {
  const updated = await Incident.findByIdAndUpdate(req.params.id, { assignee: req.body.assignee }, { new: true });
  res.json(updated);
});
router.post('/:id/resolve', protect, async (req, res) => {
  const updated = await Incident.findByIdAndUpdate(req.params.id, { status: 'Resolved' }, { new: true });
  res.json(updated);
});
router.post('/:id/close', protect, async (req, res) => {
  const updated = await Incident.findByIdAndUpdate(req.params.id, { status: 'Closed' }, { new: true });
  res.json(updated);
});

module.exports = router;
