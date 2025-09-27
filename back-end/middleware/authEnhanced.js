const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Enhanced authentication middleware
const authMiddleware = {
  // Generate JWT token
  generateToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  },

  // Verify JWT token
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  },

  // Protect routes - require authentication
  protect: async (req, res, next) => {
    try {
      let token;

      // Get token from header
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      // Check if token exists
      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'ACCESS_DENIED',
          message: 'No token provided. Please login to access this resource.',
          code: 'NO_TOKEN'
        });
      }

      // Verify token
      const decoded = authMiddleware.verifyToken(token);
      
      if (!decoded) {
        return res.status(401).json({
          success: false,
          error: 'INVALID_TOKEN',
          message: 'Token is invalid or expired. Please login again.',
          code: 'INVALID_TOKEN'
        });
      }

      // Check if user still exists in database
      const userModel = new User();
      const { data: user, error } = await userModel.getUserProfile(decoded.userId);
      
      if (error || !user) {
        return res.status(401).json({
          success: false,
          error: 'USER_NOT_FOUND',
          message: 'User account no longer exists.',
          code: 'USER_NOT_FOUND'
        });
      }

      // Add user info to request
      req.user = {
        userId: decoded.userId,
        email: user.email,
        name: user.name,
        role: user.role,
        iat: decoded.iat,
        exp: decoded.exp
      };
      
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(500).json({
        success: false,
        error: 'AUTH_ERROR',
        message: 'Authentication failed due to server error.',
        code: 'SERVER_ERROR'
      });
    }
  },

  // Authorize specific roles
  authorize: (...roles) => {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({
            success: false,
            error: 'AUTH_REQUIRED',
            message: 'Authentication required for this action.',
            code: 'AUTH_REQUIRED'
          });
        }

        // Check if user role is authorized
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({
            success: false,
            error: 'INSUFFICIENT_PERMISSIONS',
            message: `Role '${req.user.role}' is not authorized to access this resource. Required roles: ${roles.join(', ')}`,
            code: 'INSUFFICIENT_PERMISSIONS'
          });
        }
        
        next();
      } catch (error) {
        console.error('Authorization middleware error:', error);
        res.status(500).json({
          success: false,
          error: 'AUTHORIZATION_ERROR',
          message: 'Authorization failed due to server error.',
          code: 'SERVER_ERROR'
        });
      }
    };
  },

  // Optional authentication - doesn't fail if no token
  optionalAuth: async (req, res, next) => {
    try {
      let token;

      // Get token from header
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (token) {
        // Verify token
        const decoded = authMiddleware.verifyToken(token);
        
        if (decoded) {
          // Check if user still exists
          const userModel = new User();
          const { data: user, error } = await userModel.getUserProfile(decoded.userId);
          
          if (!error && user) {
            req.user = {
              userId: decoded.userId,
              email: user.email,
              name: user.name,
              role: user.role,
              iat: decoded.iat,
              exp: decoded.exp
            };
          }
        }
      }

      next();
    } catch (error) {
      // Continue without authentication for optional auth
      console.error('Optional auth error:', error);
      next();
    }
  },

  // Rate limiting for auth endpoints
  rateLimitAuth: (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
    const attempts = new Map();
    
    return (req, res, next) => {
      const ip = req.ip || req.connection.remoteAddress;
      const now = Date.now();
      const windowStart = now - windowMs;
      
      // Clean old attempts
      if (attempts.has(ip)) {
        attempts.set(ip, attempts.get(ip).filter(time => time > windowStart));
      } else {
        attempts.set(ip, []);
      }
      
      const userAttempts = attempts.get(ip);
      
      if (userAttempts.length >= maxAttempts) {
        return res.status(429).json({
          success: false,
          error: 'TOO_MANY_ATTEMPTS',
          message: 'Too many authentication attempts. Please try again later.',
          code: 'RATE_LIMITED',
          retryAfter: Math.ceil((userAttempts[0] + windowMs - now) / 1000)
        });
      }
      
      // Add current attempt
      userAttempts.push(now);
      
      next();
    };
  },

  // Admin only middleware
  adminOnly: authMiddleware.authorize('admin'),

  // Moderator or Admin
  moderatorOrAdmin: authMiddleware.authorize('moderator', 'admin'),

  // User, Moderator, or Admin
  authenticatedUser: authMiddleware.authorize('user', 'moderator', 'admin')
};

module.exports = authMiddleware;
