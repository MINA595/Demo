import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import TileCard from '../components/TileCard';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import AccountScreen from './AccountScreen';
import { Modal } from 'react-native';

export const HomeScreen: React.FC = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err: any) {
      Alert.alert('Sign out failed', err.message || String(err));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.heading}>Money</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAccountOpen(true)}>
              <View style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceTopRow}>
            <Text style={styles.balanceLabel}>Cash Balance</Text>
            <Text style={styles.accountLink}>Account & Routing</Text>
          </View>
          <Text style={styles.balanceAmount}>$0.00</Text>
          <View style={styles.balanceButtonsRow}>
            <TouchableOpacity style={styles.ctaButton}><Text style={styles.ctaText}>Add Cash</Text></TouchableOpacity>
            <TouchableOpacity style={styles.ctaButton}><Text style={styles.ctaText}>Cash Out</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.gridRow}>
          <TileCard title="Savings" subtitle="Save for a goal" image={require('../../assets/icon.png')} />
          <TileCard title="Buy bitcoin" image={require('../../assets/splash-icon.png')} />
        </View>

        <View style={styles.gridRow}>
          <TileCard title="Invest in stocks" image={require('../../assets/icon.png')} />
          <TileCard title="Free tax filing" image={require('../../assets/splash-icon.png')} />
        </View>

      </ScrollView>
      <Modal visible={accountOpen} animationType="slide">
        <AccountScreen onClose={() => setAccountOpen(false)} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f7f8' },
  container: { padding: 18 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  heading: { fontSize: 32, fontWeight: '700', color: '#111' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ddd' },
  balanceCard: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 3 },
  balanceTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { fontSize: 16, fontWeight: '700' },
  accountLink: { color: '#999' },
  balanceAmount: { fontSize: 40, fontWeight: '800', marginTop: 8 },
  balanceButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  ctaButton: { backgroundColor: '#f3f3f3', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 24 },
  ctaText: { fontWeight: '700', color: '#111' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  logoutButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#eee', borderRadius: 8, marginRight: 8 },
  logoutText: { color: '#111', fontWeight: '700' },
});

export default HomeScreen;
