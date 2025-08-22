import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { AntDesign } from '@expo/vector-icons';

type Translations = {
  welcome: string;
  subtitle: string;
  secure: string;
  fast: string;
  cloud: string;
  getStarted: string;
  learnMore: string;
};

type LandingScreenProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  translations: Translations;
};

export const LandingScreen: React.FC<LandingScreenProps> = ({ 
  theme, 
  onToggleTheme, 
  translations 
}) => {
  const [email, setEmail] = useState('');
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
          <View style={styles.logoBlob} />

          <Animatable.Text 
            animation="fadeInDown" 
            delay={animationDelay * 1.5}
            style={[styles.title, { color: colors.text }]}
          >
            Log in or sign up
          </Animatable.Text>

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

          <Button
            title="Continue"
            onPress={() => console.log('Continue', email)}
            style={[styles.continueButton, { backgroundColor: '#000' }]}
            textStyle={{ color: '#fff', fontWeight: '700' }}
          />

          <Text style={[styles.orText, { color: colors.text }]}>or</Text>

          <Button
            title="Continue with Google"
            onPress={() => console.log('Google')}
            style={[styles.outlineButton]}
            textStyle={{ color: colors.text }}
            icon={<AntDesign name="google" size={18} color="#DB4437" />}
          />

          <Button
            title="Continue with Apple"
            onPress={() => console.log('Apple')}
            style={[styles.outlineButton]}
            textStyle={{ color: colors.text }}
            icon={<AntDesign name="apple1" size={18} color={colors.text} />}
          />

        </Animatable.View>
      </KeyboardAvoidingView>

  {/* Removed feature list for landing form layout */}

  {/* footer removed */}
    </SafeAreaView>
  );
};

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
    marginBottom: 18,
  },
  input: {
    width: '90%',
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 18,
  },
  continueButton: {
    width: '90%',
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 14,
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
