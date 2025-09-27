require('dotenv').config();
const User = require('../models/User');

async function resetAdminUser() {
  try {
    console.log('Resetting admin user...');
    
    const userModel = new User();
    
    // Delete existing admin user if exists
    const { error: deleteError } = await userModel.supabase
      .from('users')
      .delete()
      .eq('email', 'admin@jharkhandtourism.com');

    if (deleteError) {
      console.log('No existing admin user to delete');
    } else {
      console.log('Deleted existing admin user');
    }

    // Create new admin user with known password
    const { data, error } = await userModel.createUser({
      email: 'admin@jharkhandtourism.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    });

    if (error) {
      console.error('❌ Error creating admin user:', error);
      return;
    }

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('🔑 Login Credentials:');
    console.log('   Email: admin@jharkhandtourism.com');
    console.log('   Password: admin123');
    console.log('');
    console.log('👤 User Details:');
    console.log('   Name:', data.name);
    console.log('   Role:', data.role);
    console.log('   ID:', data.id);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

resetAdminUser();
