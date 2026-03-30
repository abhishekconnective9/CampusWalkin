const express = require('express');
const Course = require('../models/Course');
const College = require('../models/College');
const Lead = require('../models/Lead');
const router = express.Router();

// Middleware
function authenticateAdminToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    const User = require('../models/User');
    const user = await User.findById(decoded.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.userId = decoded.userId;
    next();
  });
}

// Dashboard Analytics
router.get('/analytics', authenticateAdminToken, async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const convertedLeads = await Lead.countDocuments({ status: 'converted' });
    const totalCourses = await Course.countDocuments();
    const totalColleges = await College.countDocuments();

    // Daily leads count (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyLeads = await Lead.aggregate([
      {
        $match: { createdAt: { $gte: thirtyDaysAgo } }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalLeads,
      newLeads,
      convertedLeads,
      totalCourses,
      totalColleges,
      dailyLeads
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add/Update Course
router.post('/courses', authenticateAdminToken, async (req, res) => {
  try {
    const { id, ...courseData } = req.body;

    if (id) {
      const course = await Course.findByIdAndUpdate(id, courseData, { new: true });
      return res.json({ message: 'Course updated', course });
    }

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({ message: 'Course created', course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Course
router.delete('/courses/:id', authenticateAdminToken, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add/Update College
router.post('/colleges', authenticateAdminToken, async (req, res) => {
  try {
    const { id, ...collegeData } = req.body;

    if (id) {
      const college = await College.findByIdAndUpdate(id, collegeData, { new: true });
      return res.json({ message: 'College updated', college });
    }

    const college = new College(collegeData);
    await college.save();

    res.status(201).json({ message: 'College created', college });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;