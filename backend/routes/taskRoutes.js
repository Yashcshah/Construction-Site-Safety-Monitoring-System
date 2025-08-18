// routes/taskRoutes.js
const router = require('express').Router();
const Task = require('../models/Task');
const { auth } = require('../middleware/authMiddleware');


router.post('/', auth, async (req,res)=> {
  const task = await Task.create({ ...req.body, owner: req.user.id });
  res.status(201).json(task);
});
router.get('/', auth, async (req,res)=> {
  const { status, site, q } = req.query;
  const f = { owner: req.user.id };
  if (status) f.status = status;
  if (site) f.site = site;
  if (q) f.$or = [{ title: new RegExp(q,'i') }, { description: new RegExp(q,'i') }];
  res.json(await Task.find(f).sort('-createdAt'));
});
router.put('/:id', auth, async (req,res)=> {
  const updated = await Task.findOneAndUpdate({ _id:req.params.id, owner:req.user.id }, req.body, { new:true });
  if (!updated) return res.status(404).json({message:'Not found'});
  res.json(updated);
});
router.delete('/:id', auth, async (req,res)=> {
  await Task.deleteOne({ _id:req.params.id, owner:req.user.id });
  res.json({ ok:true });
});

module.exports = router;
