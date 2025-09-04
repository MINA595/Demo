import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

type Translations = {
  welcome: string;
  subtitle: string;
  secure: string;
  fast: string;
  cloud: string;
  getStarted: string;
  learnMore: string;
};

type RegisterProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  translations: Translations;
};

const Register: React.FC<RegisterProps> = ({ 
  theme, 
  onToggleTheme, 
  translations 
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

  const animationDelay = 300;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <Animatable.View 
          animation="fadeIn" 
          duration={1200}
          delay={animationDelay}
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
            delay={animationDelay * 1.5}
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

  {/* Removed feature list for landing form layout */}

  {/* footer removed */}
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
    marginTop: hp('8%'),
    width: '100%',
    paddingTop: hp('5%'),
    position: 'relative',
  },
  toggleContainer: {
    position: 'absolute',
    right: wp('5%'),
    top: 0,
    zIndex: 1,
    flexDirection: 'row',
    gap: 8,
    paddingTop: hp('1%'),
    paddingRight: wp('2%'),
  },
  themeButton: {
    padding: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.8,
    letterSpacing: 0.3,
  },
  features: {
    marginTop: hp('8%'),
    marginHorizontal: wp('5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: hp('10%'),
    left: 0,
    right: 0,
    paddingHorizontal: wp('10%'),
  },
  button: {
    marginBottom: 10,
  }
  ,
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
  outlineButton: {
    width: '90%',
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: 'transparent',
  },
  
});
