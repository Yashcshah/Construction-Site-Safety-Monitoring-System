const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // your JWT auth
const { getIncidents, addIncident, updateIncident, deleteIncident } = require('../controllers/incidentController');

router.get('/', auth, getIncidents);
router.post('/', auth, addIncident);
router.patch('/:id', auth, updateIncident);
router.delete('/:id', auth, deleteIncident);

module.exports = router;
