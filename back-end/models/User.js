const BaseModel = require('./BaseModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User extends BaseModel {
  constructor() {
    super('users');
  }

  // Create user with hashed password
  async createUser(userData) {
    try {
      const { password, ...otherData } = userData;
      
      // Hash password
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const userDataWithHash = {
        ...otherData,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert([userDataWithHash])
        .select('id, email, name,password, role, created_at, updated_at')
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Find user by email
  async findByEmail(email) {
    try {
      console.log(`🔍 Searching for user with email: ${email}`);
      const startTime = Date.now();
      
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('email', email)
        .single();

      const queryTime = Date.now() - startTime;
      console.log(`📊 User search completed in ${queryTime}ms`);

      if (error && error.code !== 'PGRST116') {
        console.error(`❌ Database error finding user:`, error);
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error(`❌ Error in findByEmail:`, error);
      return { data: null, error };
    }
  }

  // Verify password
  async verifyPassword(plainPassword, hashedPassword) {
    try {
      console.log(`🔐 Verifying password...`);
      const startTime = Date.now();
      
      const isValid = await bcrypt.compare(plainPassword, hashedPassword);
      
      const verifyTime = Date.now() - startTime;
      console.log(`🔐 Password verification completed in ${verifyTime}ms`);
      
      return isValid;
    } catch (error) {
      console.error(`❌ Password verification error:`, error);
      return false;
    }
  }

  // Generate JWT token
  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
  }

  // Verify JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  // Get user profile (without password)
  async getUserProfile(userId) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('id, email, name,password, role, created_at, updated_at')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    try {
      const { password, ...safeUpdateData } = updateData;
      
      const profileData = {
        ...safeUpdateData,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(profileData)
        .eq('id', userId)
        .select('id, email, name,password, role, created_at, updated_at')
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Get current user with password
      const { data: user, error: userError } = await this.supabase
        .from(this.tableName)
        .select('password')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      // Verify current password
      const isCurrentPasswordValid = await this.verifyPassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return { data: null, error: { message: 'Current password is incorrect' } };
      }

      // Hash new password
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update({ 
          password: hashedNewPassword,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select('id, email, name,password, role, created_at, updated_at')
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get all users (admin only)
  async getAllUsers(options = {}) {
    try {
      let query = this.supabase
        .from(this.tableName)
        .select('id, email, name,password, role, created_at, updated_at');

      if (options.orderBy) {
        query = query.order(options.orderBy, options.orderDirection || { ascending: true });
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

module.exports = User;
