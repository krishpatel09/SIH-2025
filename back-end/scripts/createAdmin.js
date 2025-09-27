require('dotenv').config();
const User = require('../models/User');

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    const userModel = new User();
    
    // Check if admin user already exists
    const { data: existingAdmin, error: checkError } = await userModel.findByEmail('admin@jharkhandtourism.com');

    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Name:', existingAdmin.name);
      console.log('🛡️ Role:', existingAdmin.role);
      console.log('');
      console.log('🔑 Login Credentials:');
      console.log('   Email: admin@jharkhandtourism.com');
      console.log('   Password: Admin123!');
      return;
    }

    // Create admin user
    const { data, error } = await userModel.createUser({
      email: 'admin@jharkhandtourism.com',
      password: 'Admin123!',
      name: 'Admin User',
      role: 'admin'
    });

    if (error) {
      console.error('❌ Error creating admin user:', error);
      return;
    }

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@jharkhandtourism.com');
    console.log('🔑 Password: Admin123!');
    console.log('👤 Name:', data.name);
    console.log('🛡️ Role:', data.role);
    console.log('🆔 ID:', data.id);
    console.log('📅 Created:', data.created_at);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createAdminUser();
