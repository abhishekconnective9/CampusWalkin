const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  banner: String,
  description: String,
  location: { type: String, required: true },
  city: String,
  state: String,
  country: { type: String, default: 'India' },
  website: String,
  email: String,
  phone: String,
  established: Number,
  accreditation: [String],
  coursesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  placementRate: Number,
  topRecruiters: [String],
  infrastructure: [String],
  hostels: Boolean,
  scholarship: Boolean,
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [{ user: String, rating: Number, comment: String, date: Date }],
  amenities: [String],
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('College', collegeSchema);