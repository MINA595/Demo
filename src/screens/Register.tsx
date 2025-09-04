import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';

const { height } = Dimensions.get('window');

type RegisterProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

const Register: React.FC<RegisterProps> = ({ 
  theme, 
  onToggleTheme
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const colors = {
    background: theme === 'dark' ? '#000000' : '#FFFFFF',
    text: theme === 'dark' ? '#FFFFFF' : '#000000',
    primary: theme === 'dark' ? '#0A84FF' : '#007AFF',
    secondary: theme === 'dark' ? '#333333' : '#F5F5F5',
    accent: theme === 'dark' ? '#5856D6' : '#5856D6',
    success: theme === 'dark' ? '#32D74B' : '#34C759',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <Animatable.View 
          animation="fadeIn" 
          duration={1200}
          delay={300}
          style={styles.header}
        >
          <Image
            source={{ uri: 'http://127.0.0.1:54321/storage/v1/object/public/demo//freepik__the-style-is-candid-image-photography-with-natural__15015.png' }}
            style={styles.logoBlob}
            resizeMode="cover"
            accessibilityLabel="Books icon"
          />

          <Animatable.Text 
            animation="fadeInDown" 
            delay={450}
            style={[styles.title, { color: colors.text }]}
          >
            Log in or sign up
          </Animatable.Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            placeholderTextColor={colors.text === '#000000' ? '#9B9B9B' : '#BBBBBB'}
            style={[styles.input, { backgroundColor: colors.secondary, color: colors.text }]}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.text === '#000000' ? '#9B9B9B' : '#BBBBBB'}
            style={[styles.input, { backgroundColor: colors.secondary, color: colors.text }]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={colors.text === '#000000' ? '#9B9B9B' : '#BBBBBB'}
              style={[styles.input, { backgroundColor: colors.secondary, color: colors.text }]}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(s => !s)}
              style={styles.showHideButton}
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              {/* use Ionicons eye / eye-off */}
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <Button
            title={mode === 'register' ? 'Create account' : 'Sign in'}
            onPress={async () => {
              setLoading(true);
              try {
                if (mode === 'register') {
                    const { data, error } = await supabase.auth.signUp({ email, password });
                    if (error) throw error;

                    // If signup succeeded and user id is returned, insert profile row
                    const userId = (data as any)?.user?.id;
                    if (userId) {
                      // Insert profile with name and email
                      await supabase.from('profiles').upsert({ id: userId, email, name });
                    }

                    Alert.alert('Check your email', 'A confirmation email has been sent if required.');
                } else {
                  const { error } = await supabase.auth.signInWithPassword({ email, password });
                  if (error) throw error;
                }
              } catch (err: any) {
                Alert.alert('Error', err.message || String(err));
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            style={[styles.continueButton, { backgroundColor: '#000' }]}
            textStyle={{ color: '#fff', fontWeight: '700' }}
          />

          <TouchableOpacity onPress={() => setMode(m => m === 'register' ? 'login' : 'register')} style={{ marginTop: 12 }}>
            <Text style={{ color: colors.primary }}>{mode === 'register' ? 'Already have an account? Sign in' : "Don't have an account? Create one"}</Text>
          </TouchableOpacity>

          {/* Social sign-in buttons removed per request */}

        </Animatable.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.08,
    width: '100%',
    paddingTop: height * 0.05,
    position: 'relative',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  logoBlob: {
    width: 60,
    height: 60,
    borderRadius: 30,
  backgroundColor: '#000',
  overflow: 'hidden',
    marginBottom: 18,
  },
  input: {
    width: '90%',
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 18,
    paddingRight: 44,
  },
  continueButton: {
    width: '90%',
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 14,
  },
  passwordContainer: {
    width: '90%',
    position: 'relative',
    marginTop: 12,
    justifyContent: 'center',
  },
  showHideButton: {
    position: 'absolute',
    right: 12,
    top: 14,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 14,
    opacity: 0.8,
  },
});
