const supabase = require('../config/supabase');

async function setupDestinationImageBucket() {
  try {
    console.log('Setting up destination images storage bucket...');

    // Create the bucket if it doesn't exist
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('destination-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880 // 5MB limit
    });

    if (bucketError && bucketError.message !== 'Bucket already exists') {
      throw bucketError;
    }

    console.log('✅ Destination images bucket created successfully');

    // Set up RLS policies for the bucket
    const policies = [
      {
        name: 'Allow public read access to destination images',
        policy: `
          CREATE POLICY "Allow public read access to destination images" ON storage.objects
          FOR SELECT USING (bucket_id = 'destination-images');
        `
      },
      {
        name: 'Allow authenticated users to upload destination images',
        policy: `
          CREATE POLICY "Allow authenticated users to upload destination images" ON storage.objects
          FOR INSERT WITH CHECK (
            bucket_id = 'destination-images' 
            AND auth.role() = 'authenticated'
            AND (storage.foldername(name))[1] = 'destinations'
          );
        `
      },
      {
        name: 'Allow users to update their own destination images',
        policy: `
          CREATE POLICY "Allow users to update their own destination images" ON storage.objects
          FOR UPDATE USING (
            bucket_id = 'destination-images' 
            AND auth.role() = 'authenticated'
            AND (storage.foldername(name))[1] = 'destinations'
          );
        `
      },
      {
        name: 'Allow users to delete their own destination images',
        policy: `
          CREATE POLICY "Allow users to delete their own destination images" ON storage.objects
          FOR DELETE USING (
            bucket_id = 'destination-images' 
            AND auth.role() = 'authenticated'
            AND (storage.foldername(name))[1] = 'destinations'
          );
        `
      }
    ];

    // Note: These policies need to be run in Supabase SQL editor
    console.log('\n📋 Storage policies to be created in Supabase SQL editor:');
    policies.forEach((policy, index) => {
      console.log(`\n${index + 1}. ${policy.name}:`);
      console.log(policy.policy);
    });

    console.log('\n✅ Storage bucket setup completed!');
    console.log('📝 Please run the above policies in your Supabase SQL editor to complete the setup.');

  } catch (error) {
    console.error('❌ Error setting up storage bucket:', error.message);
    throw error;
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupDestinationImageBucket()
    .then(() => {
      console.log('\n🎉 Storage setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Storage setup failed:', error.message);
      process.exit(1);
    });
}

module.exports = { setupDestinationImageBucket };
