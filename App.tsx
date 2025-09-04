import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
// initialize supabase client (reads keys from app.json extra or env)
import { supabase } from './src/lib/supabase';
import Register from './src/screens/Register';
import HomeScreen from './src/screens/HomeScreen';
import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(Appearance.getColorScheme() || 'light');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, []);

  // listen for supabase auth state and initialize user
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setUser(data.session?.user ?? null);
      } catch (e) {
        // ignore—dev may not have supabase configured
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      {user ? (
        <HomeScreen />
      ) : (
        <Register 
          theme={theme} 
          onToggleTheme={toggleTheme}
        />
      )}
    </>
  );
}
