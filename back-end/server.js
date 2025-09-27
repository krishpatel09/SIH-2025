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
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://sih-2025-steel.vercel.app',
  'https://sih-2025-steel.vercel.app/',
  process.env.FRONTEND_URL
].filter(Boolean); // Remove any undefined values

// Add production domains explicitly
if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push('https://sih-2025-steel.vercel.app');
}

// Ensure Vercel domain is always included
if (!allowedOrigins.includes('https://sih-2025-steel.vercel.app')) {
  allowedOrigins.push('https://sih-2025-steel.vercel.app');
}

// More permissive CORS for development and production
app.use(cors({
  origin: function (origin, callback) {
    console.log('=== CORS DEBUG ===');
    console.log('Request origin:', origin);
    console.log('Allowed origins:', allowedOrigins);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('==================');
    
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      console.log('CORS: Allowing request with no origin');
      return callback(null, true);
    }
    
    // Normalize origin (remove trailing slash)
    const normalizedOrigin = origin.replace(/\/$/, '');
    const normalizedAllowedOrigins = allowedOrigins.map(o => o.replace(/\/$/, ''));
    
    // Check if origin is in allowed list (exact match)
    if (normalizedAllowedOrigins.includes(normalizedOrigin)) {
      console.log('CORS: ✅ Allowed for origin:', normalizedOrigin);
      callback(null, true);
    } else {
      console.log('CORS: ❌ Blocked origin:', normalizedOrigin);
      console.log('CORS: Available origins:', normalizedAllowedOrigins);
      console.log('CORS: Exact match failed, checking partial matches...');
      
      // Additional check for Vercel domains (more permissive)
      if (normalizedOrigin.includes('sih-2025-steel.vercel.app')) {
        console.log('CORS: ✅ Allowing Vercel domain:', normalizedOrigin);
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: Origin ${normalizedOrigin} is not allowed`));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'Cache-Control',
    'Pragma'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  preflightContinue: false
}));

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
    environment: process.env.NODE_ENV || 'development',
    headers: {
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Credentials': 'true'
    }
  });
});

// Additional CORS debug endpoint
app.get('/cors-debug', (req, res) => {
  const origin = req.headers.origin;
  const normalizedOrigin = origin ? origin.replace(/\/$/, '') : null;
  const normalizedAllowedOrigins = allowedOrigins.map(o => o.replace(/\/$/, ''));
  
  res.json({
    debug: {
      requestOrigin: origin,
      normalizedOrigin: normalizedOrigin,
      allowedOrigins: allowedOrigins,
      normalizedAllowedOrigins: normalizedAllowedOrigins,
      isAllowed: normalizedOrigin ? normalizedAllowedOrigins.includes(normalizedOrigin) : false,
      isVercelDomain: normalizedOrigin ? normalizedOrigin.includes('sih-2025-steel.vercel.app') : false,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    }
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
  console.log(`🌍 CORS: Allowing origins: ${allowedOrigins.join(', ')}`);
});

module.exports = app;