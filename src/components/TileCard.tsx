import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type TileCardProps = {
  title: string;
  subtitle?: string;
  image?: any;
  onPress?: () => void;
};

export const TileCard: React.FC<TileCardProps> = ({ title, subtitle, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.chev}>&gt;</Text>
      </View>
      <View style={styles.imageWrap}>
        {image ? <Image source={image} style={styles.image} resizeMode="cover" /> : <View style={styles.placeholder} />}
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  chev: {
    color: '#999',
    fontSize: 16,
  },
  imageWrap: {
    height: 84,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
  },
  subtitle: {
    marginTop: 8,
    color: '#666',
    fontSize: 13,
  },
});

export default TileCard;
