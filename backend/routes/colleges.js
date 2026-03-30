const express = require('express');
const College = require('../models/College');
const router = express.Router();

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const { location, search } = req.query;

    let query = {};

    if (location) query.location = new RegExp(location, 'i');
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const colleges = await College.find(query)
      .select('name logo location city rating placementRate')
      .sort({ rating: -1 })
      .limit(50);

    res.json({
      total: colleges.length,
      colleges
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get college by ID
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id)
      .populate('coursesOffered');

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;