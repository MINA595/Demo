import { StatusBar } from 'expo-status-bar';
import { LandingScreen } from './src/screens/LandingScreen';
import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const translations = {
  welcome: 'Welcome to MyApp',
  subtitle: 'Your Journey Starts Here',
  secure: 'Secure & Private',
  fast: 'Lightning Fast',
  cloud: 'Cloud Synced',
  getStarted: 'Get Started',
  learnMore: 'Learn More'
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <LandingScreen 
        theme={theme} 
        onToggleTheme={toggleTheme}
        translations={translations}
      />
    </>
  );
}
