const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==================== DATABASE CONNECTION ====================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/campuswalkin',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// ==================== ROUTES ====================
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Import routes (we'll create these files next)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/courses', require('./routes/courses'));
// app.use('/api/colleges', require('./routes/colleges'));
// app.use('/api/leads', require('./routes/leads'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/contact', require('./routes/contact'));

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500,
    timestamp: new Date().toISOString()
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// ==================== SERVER START ====================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log(`🚀 CampusWalkin Backend Server`);
  console.log('='.repeat(50));
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.MONGODB_URI?.split('@')[1] || 'local'}`);
  console.log('='.repeat(50) + '\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

module.exports = app;