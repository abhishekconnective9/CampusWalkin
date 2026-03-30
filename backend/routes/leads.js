const express = require('express');
const { body, validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Submit Lead
router.post('/submit', [
  body('firstName').notEmpty().trim().escape(),
  body('lastName').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').isMobilePhone('en-IN'),
  body('courseInterested').notEmpty(),
  body('courseType').isIn(['UG', 'PG', 'MBA']),
  body('preferredLocation').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, phone, courseInterested, courseType, preferredLocation, message, leadSource } = req.body;

    // Create lead
    const lead = new Lead({
      firstName,
      lastName,
      email,
      phone,
      courseInterested,
      courseType,
      preferredLocation,
      message,
      leadSource
    });

    await lead.save();

    // Send email notification to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `🎓 New Lead Received: ${firstName} ${lastName}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Course Interested:</strong> ${courseInterested}</p>
        <p><strong>Course Type:</strong> ${courseType}</p>
        <p><strong>Preferred Location:</strong> ${preferredLocation}</p>
        <p><strong>Lead Source:</strong> ${leadSource}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        <p><a href="${process.env.FRONTEND_URL}/admin/leads/${lead._id}">View in Admin Panel</a></p>
      `
    };

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your enquiry - CampusWalkin',
      html: `
        <h2>Thank you for your enquiry!</h2>
        <p>Hi ${firstName},</p>
        <p>We have received your enquiry for <strong>${courseInterested}</strong>.</p>
        <p>Our career counsellors will contact you shortly at <strong>${phone}</strong>.</p>
        <p>In the meantime, you can explore more courses on our platform.</p>
        <p>Best regards,<br>CampusWalkin Team</p>
      `
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(201).json({
      message: 'Lead submitted successfully',
      leadId: lead._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all leads (Admin only)
router.get('/', authenticateAdminToken, async (req, res) => {
  try {
    const { status, courseType, page = 1, limit = 10 } = req.query;

    let query = {};
    if (status) query.status = status;
    if (courseType) query.courseType = courseType;

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Lead.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      leads
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update lead status (Admin only)
router.patch('/:id', authenticateAdminToken, async (req, res) => {
  try {
    const { status, notes } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, notes, updatedAt: Date.now() },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({ message: 'Lead updated', lead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export leads as CSV (Admin only)
router.get('/export/csv', authenticateAdminToken, async (req, res) => {
  try {
    const leads = await Lead.find();

    let csv = 'Name,Email,Phone,Course,Type,Location,Status,Date\n';
    leads.forEach(lead => {
      csv += `"${lead.firstName} ${lead.lastName}","${lead.email}","${lead.phone}","${lead.courseInterested}","${lead.courseType}","${lead.preferredLocation}","${lead.status}","${lead.createdAt.toISOString()}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

module.exports = router;