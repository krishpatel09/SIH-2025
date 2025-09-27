const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with optimized configuration
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: false
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'smart-india-hackathon-2025'
    }
  },
  // Add connection timeout and retry configuration
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Add connection health check
const checkConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Supabase connection check failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection is healthy');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection check error:', error);
    return false;
  }
};

// Perform initial connection check
checkConnection();

module.exports = supabase;
