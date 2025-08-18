import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  loading = false,
  disabled = false,
  icon
}: ButtonProps) => {
  return (
    <Animatable.View animation="fadeIn" duration={600}>
      <TouchableOpacity 
        style={[
          styles.button, 
          style, 
          disabled && styles.disabled
        ]} 
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled || loading}
      >
        <View style={styles.contentContainer}>
          {loading ? (
            <ActivityIndicator color={textStyle?.color || '#FFFFFF'} />
          ) : (
            <>
              {icon && <View style={styles.iconContainer}>{icon}</View>}
              <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.6,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});
