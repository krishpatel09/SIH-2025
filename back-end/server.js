const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration - Enhanced for production deployment
const allowedOrigins = ['https://sih-2025-steel.vercel.app',
process.env.FRONTEND_URL
].filter(Boolean); // Remove any undefined values


// Logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/features', require('./routes/features'));
app.use('/api/cultural', require('./routes/cultural'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/maps', require('./routes/maps'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api', require('./routes/chatbot')); // Chatbot routes with /api/chat prefix

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    architecture: 'MVC Pattern with Authentication'
  });
});

// CORS test endpoint
app.get('/cors-test', (req, res) => {
  res.json({
    message: 'CORS is working!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins,
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏗️  Architecture: MVC Pattern with Authentication`);
  console.log(`🔐 Authentication: JWT + bcrypt`);
  console.log(`🤖 AI Chatbot: Ollama + LangChain (Local LLM)`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`🔑 Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`💬 Chatbot endpoints: http://localhost:${PORT}/api/chat`);
});

module.exports = app;