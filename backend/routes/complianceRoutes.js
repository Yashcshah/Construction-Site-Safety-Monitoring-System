// routes/complianceRoutes.js
const router = require('express').Router();
const { auth } = require('../middleware/authMiddleware');
const ComplianceRecord = require('../models/ComplianceRecord');

router.post('/', auth, async (req,res)=> {
  res.status(201).json(await ComplianceRecord.create({ ...req.body, recordedBy: req.user.id }));
});
router.get('/', auth, async (req,res)=> {
  const { site, status, dueBefore } = req.query;
  const f = {};
  if (site) f.site = site;
  if (status) f.status = status;
  if (dueBefore) f.dueDate = { $lte: new Date(dueBefore) };
  res.json(await ComplianceRecord.find(f).sort({ dueDate: 1 }));
});
router.put('/:id', auth, async (req,res)=> {
  res.json(await ComplianceRecord.findByIdAndUpdate(req.params.id, req.body, { new:true }));
});

module.exports = router;
