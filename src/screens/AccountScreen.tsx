import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

type Props = {
  onClose?: () => void;
};

const AccountScreen: React.FC<Props> = ({ onClose }) => {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      onClose && onClose();
    } catch (err: any) {
      // ignore in-screen error handling for now
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={26} color="#3b82f6" />
          </TouchableOpacity>
          <View style={styles.avatarRow}>
            <View style={styles.avatar} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.name}>John Mobbin</Text>
              <Text style={styles.email}>john.mobbin1@outlook.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.metricsCard}>
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <MaterialIcons name="emoji-events" size={22} color="#3b82f6" />
              <Text style={styles.metricValue}>6</Text>
              <Text style={styles.metricLabel}>My Rewards</Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="search" size={22} color="#3b82f6" />
              <Text style={styles.metricValue}>6/203</Text>
              <Text style={styles.metricLabel}>Daily points</Text>
            </View>
            <View style={styles.metricItem}>
              <FontAwesome5 name="check-circle" size={22} color="#3b82f6" />
              <Text style={styles.metricValue}>0 days</Text>
              <Text style={styles.metricLabel}>Daily streak</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.pill} activeOpacity={0.9}>
          <Image source={require('../../assets/icon.png')} style={styles.pillIcon} />
          <Text style={styles.pillText}>The new Bing</Text>
          <View style={{ flex: 1 }} />
          <View style={styles.approved}><Text style={styles.approvedText}>Approved</Text></View>
        </TouchableOpacity>

        <View style={styles.menuList}>
          <MenuRow icon={<Ionicons name="notifications-outline" size={22} color="#111" />} label="Notifications" />
          <MenuRow icon={<MaterialIcons name="emoji-events" size={22} color="#111" />} label="Microsoft Rewards" />
          <MenuRow icon={<Ionicons name="person-circle-outline" size={22} color="#111" />} label="Community" />
          <MenuRow icon={<Ionicons name="settings-outline" size={22} color="#111" />} label="Settings" />
          <MenuRow icon={<Ionicons name="star-outline" size={22} color="#111" />} label="Interests" />
          <MenuRow icon={<Ionicons name="time-outline" size={22} color="#111" />} label="History" />
          <MenuRow icon={<Ionicons name="bookmark-outline" size={22} color="#111" />} label="Bookmarks and saves" />
        </View>

        <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>

        <View style={{ height: 48 }} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Ionicons name="home-outline" size={20} color="#666" /><Text style={styles.navLabel}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Ionicons name="newspaper-outline" size={20} color="#666" /><Text style={styles.navLabel}>News</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navCenter}><Image source={require('../../assets/icon.png')} style={{ width: 36, height: 36 }} /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Ionicons name="layers-outline" size={20} color="#666" /><Text style={styles.navLabel}>Tabs</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Ionicons name="apps-outline" size={20} color="#666" /><Text style={styles.navLabel}>Apps</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const MenuRow: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  return (
    <TouchableOpacity style={styles.menuRow} activeOpacity={0.8}>
      <View style={styles.menuIconWrap}>{icon}</View>
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f7f8' },
  container: { padding: 18, paddingBottom: 120 },
  topRow: { marginBottom: 18 },
  backBtn: { position: 'absolute', left: 0, top: 2 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, paddingLeft: 36 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#cfe8ff' },
  name: { fontSize: 20, fontWeight: '800', color: '#111' },
  email: { color: '#777', marginTop: 4 },
  metricsCard: { backgroundColor: '#fff', borderRadius: 14, padding: 12, marginVertical: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 2 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metricItem: { alignItems: 'center', flex: 1 },
  metricValue: { fontSize: 18, fontWeight: '800', marginTop: 6 },
  metricLabel: { color: '#888', marginTop: 4, fontSize: 12 },
  pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginVertical: 8 },
  pillIcon: { width: 28, height: 28, marginRight: 10 },
  pillText: { fontWeight: '700' },
  approved: { backgroundColor: '#e6f4ea', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  approvedText: { color: '#166534', fontWeight: '700' },
  menuList: { marginTop: 10 },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  menuIconWrap: { width: 34, alignItems: 'center' },
  menuLabel: { marginLeft: 8, fontSize: 16, color: '#111' },
  signOut: { marginTop: 18, padding: 12, alignItems: 'center' },
  signOutText: { color: '#e11d48', fontWeight: '700' },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 64, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center' },
  navCenter: { width: 64, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  navLabel: { fontSize: 11, color: '#666' },
});

export default AccountScreen;
