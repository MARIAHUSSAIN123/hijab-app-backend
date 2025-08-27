const express = require('express');
const router = express.Router();
const HijabStyle = require('../models/HijabStyle');

// Get all hijabs
router.get('/', async (req, res) => {
  try {
    const hijabs = await HijabStyle.find();
    res.json(hijabs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get single hijab by id
router.get('/:id', async (req, res) => {
  try {
    const hijab = await HijabStyle.findById(req.params.id).populate('reviews');
    if (!hijab) return res.status(404).json({ msg: 'Hijab not found' });
    res.json(hijab);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
