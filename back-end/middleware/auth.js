const User = require('../models/User');

// Protect routes - require authentication
const protect = async (req, res, next) => {
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
        error: 'Access denied',
        message: 'No token provided'
      });
    }

    // Verify token
    const userModel = new User();
    const decoded = userModel.verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Access denied',
        message: 'Invalid token'
      });
    }

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      error: 'Access denied',
      message: 'Token verification failed'
    });
  }
};

// Authorize specific roles
const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Access denied',
          message: 'Authentication required'
        });
      }

      // Get user role
      const userModel = new User();
      const { data: user, error } = await userModel.getUserProfile(req.user.userId);
      
      if (error || !user) {
        return res.status(401).json({
          success: false,
          error: 'Access denied',
          message: 'User not found'
        });
      }

      // Check if user role is authorized
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          error: 'Access denied',
          message: `Role '${user.role}' is not authorized to access this resource`
        });
      }

      // Add user info to request
      req.user.role = user.role;
      req.user.email = user.email;
      req.user.name = user.name;
      
      next();
    } catch (error) {
      console.error('Authorization middleware error:', error);
      res.status(401).json({
        success: false,
        error: 'Access denied',
        message: 'Authorization failed'
      });
    }
  };
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      // Verify token
      const userModel = new User();
      const decoded = userModel.verifyToken(token);
      
      if (decoded) {
        req.user = decoded;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication for optional auth
    next();
  }
};

module.exports = {
  protect,
  authorize,
  optionalAuth
};
