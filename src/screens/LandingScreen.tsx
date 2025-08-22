import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../components/Button';

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
      <Animatable.View 
        animation="fadeIn" 
        duration={1200}
        delay={animationDelay}
        style={styles.header}
      >
        <View style={styles.toggleContainer}>
          <Animatable.View animation="fadeIn" delay={animationDelay * 2}>
            <TouchableOpacity
              onPress={onToggleTheme}
              style={[styles.themeButton, { backgroundColor: colors.secondary }]}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={theme === 'dark' ? 'moon' : 'sunny'} 
                size={24} 
                color={colors.text} 
              />
            </TouchableOpacity>
          </Animatable.View>
        </View>
        <Animatable.View animation="bounceIn" delay={animationDelay * 3}>
          <MaterialCommunityIcons name="pyramid" size={50} color={colors.primary} />
        </Animatable.View>
        <Animatable.Text 
          animation="fadeInDown" 
          delay={animationDelay * 3.5}
          style={[styles.title, { color: colors.text }]}
        >
          {translations.welcome}
        </Animatable.Text>
        <Animatable.Text 
          animation="fadeInDown" 
          delay={animationDelay * 4}
          style={[styles.subtitle, { color: colors.text }]}
        >
          {translations.subtitle}
        </Animatable.Text>
      </Animatable.View>

      <Animatable.View 
        animation="fadeInUp" 
        duration={1000} 
        delay={500} 
        style={[styles.features, { backgroundColor: colors.secondary }]}
      >
        <View style={styles.featureItem}>
          <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
          <Text style={[styles.featureText, { color: colors.text }]}>{translations.secure}</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="flash" size={24} color={colors.primary} />
          <Text style={[styles.featureText, { color: colors.text }]}>{translations.fast}</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="cloud-done" size={24} color={colors.primary} />
          <Text style={[styles.featureText, { color: colors.text }]}>{translations.cloud}</Text>
        </View>
      </Animatable.View>

      <Animatable.View 
        animation="fadeInUp" 
        duration={1000} 
        delay={1000} 
        style={styles.buttonContainer}
      >
        <Button 
          title={translations.getStarted}
          onPress={() => console.log('Get Started pressed')} 
          style={{
            ...styles.button,
            backgroundColor: colors.primary
          }}
        />
        <Button 
          title={translations.learnMore}
          onPress={() => console.log('Learn More pressed')} 
          style={{
            ...styles.button,
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.primary
          }}
          textStyle={{ color: colors.primary }}
        />
      </Animatable.View>
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
});
