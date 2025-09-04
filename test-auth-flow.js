const { createClient } = require('@supabase/supabase-js');

// Local Supabase configuration
const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuthFlow() {
  console.log('Testing auth and profile creation flow...');
  
  const testEmail = 'testuser@example.com';
  const testPassword = 'test123456';
  const testName = 'Test User';
  
  try {
    // 1. Sign up user
    console.log('1. Signing up user...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword
    });
    
    if (signUpError) {
      console.error('Signup error:', signUpError);
      return;
    }
    
    const userId = signUpData.user?.id;
    console.log('User created with ID:', userId);
    
    if (!userId) {
      console.error('No user ID returned from signup');
      return;
    }
    
    // 2. Insert profile
    console.log('2. Creating profile...');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: testEmail,
        name: testName
      })
      .select();
    
    if (profileError) {
      console.error('Profile creation error:', profileError);
    } else {
      console.log('Profile created successfully:', profileData);
    }
    
    // 3. Query profiles to verify
    console.log('3. Querying all profiles...');
    const { data: allProfiles, error: queryError } = await supabase
      .from('profiles')
      .select('*');
    
    if (queryError) {
      console.error('Query error:', queryError);
    } else {
      console.log('All profiles:', allProfiles);
    }
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testAuthFlow();
