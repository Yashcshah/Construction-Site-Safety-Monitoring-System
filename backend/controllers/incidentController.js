const Incident = require('../models/Incident');

// GET /api/incidents
const getIncidents = async (req, res) => {
  try {
    const q = { userId: req.user.id };
    // Optional filters (severity, resolved, date range)
    if (req.query.severity) q.severity = req.query.severity;
    if (req.query.resolved !== undefined) q.resolved = req.query.resolved === 'true';
    if (req.query.from || req.query.to) {
      q.reportedAt = {};
      if (req.query.from) q.reportedAt.$gte = new Date(req.query.from);
      if (req.query.to) q.reportedAt.$lte = new Date(req.query.to);
    }
    const incidents = await Incident.find(q).sort({ reportedAt: -1 });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/incidents
const addIncident = async (req, res) => {
  const { title, description, severity, location, reportedAt, deadline, photos } = req.body;
  try {
    const incident = await Incident.create({
      userId: req.user.id,
      title, description, severity, location,
      reportedAt: reportedAt ? new Date(reportedAt) : undefined,
      deadline, photos
    });
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/incidents/:id
const updateIncident = async (req, res) => {
  const { title, description, severity, location, reportedAt, deadline, resolved, photos } = req.body;
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ message: 'Incident not found' });
    if (incident.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    incident.title = title ?? incident.title;
    incident.description = description ?? incident.description;
    incident.severity = severity ?? incident.severity;
    incident.location = location ?? incident.location;
    incident.reportedAt = reportedAt ? new Date(reportedAt) : incident.reportedAt;
    incident.deadline = deadline ?? incident.deadline;
    incident.resolved = resolved ?? incident.resolved;
    if (Array.isArray(photos)) incident.photos = photos;

    const updated = await incident.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/incidents/:id
const deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ message: 'Incident not found' });
    if (incident.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await incident.deleteOne(); // .remove() is deprecated
    res.json({ message: 'Incident deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getIncidents, addIncident, updateIncident, deleteIncident };
