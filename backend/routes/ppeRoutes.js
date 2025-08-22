// routes/ppeRoutes.js
const router = require('express').Router();
const { auth } = require('../middleware/authMiddleware');
const PPEIssue = require('../models/PPEIssue');

router.post('/', auth, async (req,res)=> {
  res.status(201).json(await PPEIssue.create({ ...req.body, issuedBy: req.user.id }));
});
router.get('/', auth, async (req,res)=> {
  const { site, workerName, active } = req.query;
  const f = {};
  if (site) f.site = site;
  if (workerName) f.workerName = new RegExp(workerName,'i');
  if (active === 'true') f.returnedAt = null;
  res.json(await PPEIssue.find(f).sort('-createdAt'));
});
router.post('/:id/return', auth, async (req,res)=> {
  res.json(await PPEIssue.findByIdAndUpdate(req.params.id, { returnedAt: new Date() }, { new:true }));
});

module.exports = router;
