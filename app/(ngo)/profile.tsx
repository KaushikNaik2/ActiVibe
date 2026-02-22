import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Colors } from '@/constants/theme';
import { SEED_NGO, SEED_NGO_KPIS } from '@/data/seed';
import { LinearGradient } from 'expo-linear-gradient';

export default function NGOProfileScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  const ngo = SEED_NGO;
  const kpis = SEED_NGO_KPIS;
  const logout = useAuthStore((s) => s.logout);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={darkMode ? ['#064E3B', '#0F0E17'] : ['#059669', '#047857']}
          style={{ height: 160 }}
        >
          <Pressable
            onPress={() => { logout(); router.replace('/'); }}
            style={{ position: 'absolute', top: 12, right: 16, zIndex: 10 }}
          >
            <Text style={{ fontSize: 22 }}>⚙️</Text>
          </Pressable>
        </LinearGradient>

        <View style={{ paddingHorizontal: 20, marginTop: -36 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{
              width: 80, height: 80, borderRadius: 16, borderWidth: 3, borderColor: '#FFF',
              overflow: 'hidden', backgroundColor: colors.card,
            }}>
              <Image source={{ uri: ngo.avatarUrl }} style={{ width: 74, height: 74, borderRadius: 13 }} />
            </View>
            <View style={{ flex: 1, marginLeft: 12, marginBottom: 4 }}>
              <Text style={{ fontSize: 22, fontWeight: '700', color: colors.ink }}>{ngo.name}</Text>
              <View style={{
                backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 2,
                borderRadius: 9999, alignSelf: 'flex-start', marginTop: 2,
              }}>
                <Text style={{ fontSize: 11, fontWeight: '600', color: '#059669' }}>✓ Verified</Text>
              </View>
            </View>
          </View>

          <Text style={{ fontSize: 14, color: colors.inkLight, marginTop: 12 }}>
            📍 {ngo.location} • Since {ngo.joinedDate}
          </Text>

          {/* KPI Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
            {[
              { label: 'Active Drives', value: kpis.activeDrives, icon: '🚀' },
              { label: 'Total Volunteers', value: kpis.totalVolunteers, icon: '👥' },
              { label: 'Check-In Rate', value: `${kpis.avgCheckinRate}%`, icon: '📍' },
              { label: 'Endorsements', value: kpis.endorsementsAwarded, icon: '🏅' },
            ].map((stat, i) => (
              <View key={i} style={{
                width: '47%', backgroundColor: colors.card, borderRadius: 16,
                padding: 16, alignItems: 'center',
              }}>
                <Text style={{ fontSize: 24 }}>{stat.icon}</Text>
                <Text style={{ fontSize: 22, fontWeight: '700', color: colors.brand, marginTop: 6 }}>
                  {stat.value}
                </Text>
                <Text style={{ fontSize: 12, color: colors.inkMuted, marginTop: 2 }}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Action buttons */}
          <Pressable
            onPress={() => router.push('/(ngo)/create-drive')}
            style={{
              marginTop: 20, height: 48, borderRadius: 16, backgroundColor: colors.brand,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 15, fontWeight: '600' }}>+ Create New Drive</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/(ngo)/analytics')}
            style={{
              marginTop: 10, marginBottom: 40, height: 48, borderRadius: 16,
              borderWidth: 1.5, borderColor: colors.brand,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.brand, fontSize: 15, fontWeight: '600' }}>📊 View Analytics</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
