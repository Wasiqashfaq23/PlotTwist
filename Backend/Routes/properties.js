const express = require('express');
const router = express.Router();
const {
  getProperties,
  getProperty,
  createProperty,
  deleteProperty,
  getMyProperties,
} = require('../Controller/PropertyController');
const protect = require('../Middleware/Protect');

router.get('/user/my-listings', protect, getMyProperties);

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', protect, createProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;
