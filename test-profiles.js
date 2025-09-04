const { createClient } = require('@supabase/supabase-js');

// Local Supabase configuration
const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testProfiles() {
  console.log('Testing profiles table...');
  
  try {
    // Check if profiles table exists and get all data
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) {
      console.error('Error querying profiles table:', error);
      return;
    }
    
    console.log('Profiles table data:', data);
    console.log('Number of profiles:', data.length);
    
    // Test inserting a profile
    const testProfile = {
      id: '12345678-1234-1234-1234-123456789012', // fake UUID
      name: 'Test User',
      email: 'test@example.com'
    };
    
    console.log('\nTesting profile insert...');
    const { data: insertData, error: insertError } = await supabase
      .from('profiles')
      .insert(testProfile)
      .select();
    
    if (insertError) {
      console.error('Error inserting test profile:', insertError);
    } else {
      console.log('Successfully inserted test profile:', insertData);
    }
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testProfiles();
