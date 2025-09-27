const User = require('../models/User');
const { validationResult } = require('express-validator');

class AuthController {
  constructor() {
    this.userModel = new User();
  }

  // Register new user
  async register(req, res) {
    try {
    
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { email, password, name, role = 'user' } = req.body;

      ;

      // Check if user already exists
      const { data: existingUser, error: findError } = await this.userModel.findByEmail(email);
      if (findError && findError.code !== 'PGRST116') {
        throw findError;
      }

      if (existingUser) {
       
        return res.status(400).json({
          success: false,
          error: 'User already exists',
          message: 'An account with this email already exists'
        });
      }

     

      // Create new user
      const { data: user, error: createError } = await this.userModel.createUser({
        email,
        password,
        name,
        role
      });

      if (createError) {
        throw createError;
      }

      
      // Generate JWT token
      const token = this.userModel.generateToken(user.id);

      console.log('🔑 JWT TOKEN GENERATED', {
        timestamp: new Date().toISOString(),
        userId: user.id,
        tokenLength: token?.length,
        action: 'token_generated'
      });

      console.log('✅ REGISTRATION COMPLETED SUCCESSFULLY', {
        timestamp: new Date().toISOString(),
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tokenLength: token?.length,
        action: 'registration_success'
      });

      res.status(201).json({
        success: true,
        data: {
          user,
          token
        },
        message: 'User registered successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to register user',
        message: error.message
      });
    }
  }

  // Login user
  async login(req, res) {
    try {
     

      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { email, password } = req.body;

      // Find user by email
      const { data: user, error: findError } = await this.userModel.findByEmail(email);
      if (findError) {
        throw findError;
      }

      if (!user) {
        
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials',
          message: 'Email or password is incorrect'
        });
      }

     
    
      // Verify password
      const isPasswordValid = await this.userModel.verifyPassword(password, user.password);
      if (!isPasswordValid) {

        return res.status(401).json({
          success: false,
          error: 'Invalid credentials',
          message: 'Email or password is incorrect'
        });
      }

     

      // Generate JWT token
      const token = this.userModel.generateToken(user.id);

     

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;

     

      res.json({
        success: true,
        data: {
          user: userWithoutPassword,
          token
        },
        message: 'Login successful'
      });
    } catch (error) {
     
      res.status(500).json({
        success: false,
        error: 'Failed to login',
        message: error.message
      });
    }
  }

  // Get current user profile
  async getProfile(req, res) {
    try {
      const userId = req.user.userId;

     

      const { data: user, error } = await this.userModel.getUserProfile(userId);
      if (error) {
        throw error;
      }

      if (!user) {
       
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('❌ PROFILE FETCH ERROR', {
        timestamp: new Date().toISOString(),
        userId: req.user?.userId,
        error: error.message,
        stack: error.stack,
        action: 'profile_fetch_error'
      });
      res.status(500).json({
        success: false,
        error: 'Failed to fetch profile',
        message: error.message
      });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const userId = req.user.userId;
      const updateData = req.body;

      const { data: user, error } = await this.userModel.updateProfile(userId, updateData);
      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: user,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update profile',
        message: error.message
      });
    }
  }

  // Change password
  async changePassword(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const userId = req.user.userId;
      const { currentPassword, newPassword } = req.body;

      const { data: user, error } = await this.userModel.changePassword(userId, currentPassword, newPassword);
      if (error) {
        return res.status(400).json({
          success: false,
          error: error.message || 'Failed to change password'
        });
      }

      res.json({
        success: true,
        data: user,
        message: 'Password changed successfully'
      });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to change password',
        message: error.message
      });
    }
  }

  // Get all users (admin only)
  async getAllUsers(req, res) {
    try {
      const { data: users, error } = await this.userModel.getAllUsers({
        orderBy: 'created_at',
        orderDirection: { ascending: false }
      });

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch users',
        message: error.message
      });
    }
  }

  // Logout user
  async logout(req, res) {
    try {
      const userId = req.user?.userId;

      console.log('🚪 LOGOUT REQUEST RECEIVED', {
        timestamp: new Date().toISOString(),
        userId: userId,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        action: 'logout_request'
      });

      // In a real application, you might want to blacklist the token
      // For now, we'll just log the logout event
      console.log('✅ LOGOUT COMPLETED', {
        timestamp: new Date().toISOString(),
        userId: userId,
        action: 'logout_success'
      });

      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('❌ LOGOUT ERROR', {
        timestamp: new Date().toISOString(),
        userId: req.user?.userId,
        error: error.message,
        stack: error.stack,
        action: 'logout_error'
      });
      res.status(500).json({
        success: false,
        error: 'Failed to logout',
        message: error.message
      });
    }
  }

  // Verify token
  async verifyToken(req, res) {
    try {
      const userId = req.user.userId;

      console.log('🔍 TOKEN VERIFICATION REQUEST', {
        timestamp: new Date().toISOString(),
        userId: userId,
        ip: req.ip || req.connection.remoteAddress,
        action: 'token_verification'
      });

      const { data: user, error } = await this.userModel.getUserProfile(userId);
      if (error) {
        throw error;
      }

      if (!user) {
        console.log('❌ TOKEN VERIFICATION FAILED - USER NOT FOUND', {
          timestamp: new Date().toISOString(),
          userId: userId,
          action: 'token_verification_failed'
        });
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      console.log('✅ TOKEN VERIFICATION SUCCESSFUL', {
        timestamp: new Date().toISOString(),
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        action: 'token_verification_success'
      });

      res.json({
        success: true,
        data: user,
        message: 'Token is valid'
      });
    } catch (error) {
      console.error('❌ TOKEN VERIFICATION ERROR', {
        timestamp: new Date().toISOString(),
        userId: req.user?.userId,
        error: error.message,
        stack: error.stack,
        action: 'token_verification_error'
      });
      res.status(500).json({
        success: false,
        error: 'Failed to verify token',
        message: error.message
      });
    }
  }
}

module.exports = AuthController;
