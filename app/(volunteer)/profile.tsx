import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable, Image } from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { Colors } from '@/constants/theme';
import { SEED_VOLUNTEER, SEED_ENDORSEMENTS } from '@/data/seed';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  const vol = SEED_VOLUNTEER;
  const logout = useAuthStore((s) => s.logout);

  const driveHistory = [
    { name: 'Versova Beach Cleanup', ngo: 'Greenpeace Mumbai', role: 'Logistics Coordinator', hours: '2:47', date: 'Jun 2025' },
    { name: 'Literacy Sessions', ngo: 'Teach For India', role: 'Tutor', hours: '4:12', date: 'May 2025' },
    { name: 'City Cleanup Drive', ngo: 'iVolunteer', role: 'Team Lead', hours: '3:15', date: 'Apr 2025' },
    { name: 'Orientation Drive', ngo: 'NSS Mumbai', role: 'Volunteer', hours: '1:30', date: 'Mar 2024' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Photo */}
        <LinearGradient
          colors={darkMode ? ['#064E3B', '#0F0E17'] : ['#059669', '#10B981']}
          style={{ height: 180, position: 'relative' }}
        >
          {/* Settings gear */}
          <Pressable
            onPress={() => {
              logout();
              router.replace('/');
            }}
            style={{ position: 'absolute', top: 12, right: 16, zIndex: 10 }}
          >
            <Text style={{ fontSize: 22 }}>⚙️</Text>
          </Pressable>
        </LinearGradient>

        {/* Identity Row */}
        <View style={{ paddingHorizontal: 20, marginTop: -44 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{
              width: 92, height: 92, borderRadius: 46, borderWidth: 3, borderColor: '#FFF',
              overflow: 'hidden', backgroundColor: colors.card,
            }}>
              <Image source={{ uri: vol.avatarUrl }} style={{ width: 86, height: 86, borderRadius: 43 }} />
            </View>
            <View style={{ flex: 1, marginLeft: 14, marginBottom: 8 }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.ink }}>{vol.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <View style={{
                  backgroundColor: colors.brandLight, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 9999,
                }}>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: colors.brand }}>Volunteer</Text>
                </View>
                <Text style={{ fontSize: 12, color: colors.inkMuted }}>Since {vol.joinedDate}</Text>
              </View>
            </View>
          </View>

          {/* Bio */}
          <Text style={{ fontSize: 14, color: colors.inkLight, marginTop: 12, lineHeight: 20 }}>
            {vol.bio}
          </Text>
        </View>

        {/* Primary Stat — Active Hours */}
        <View style={{
          marginHorizontal: 20, marginTop: 20, backgroundColor: colors.card,
          borderRadius: 16, padding: 20, borderLeftWidth: 3, borderLeftColor: '#059669',
          shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
        }}>
          <Text style={{ fontSize: 32, fontWeight: '800', color: '#059669' }}>
            {vol.totalActiveHours} hrs
          </Text>
          <Text style={{ fontSize: 14, color: colors.inkMuted, marginTop: 2 }}>
            Total Active Drive Time
          </Text>
          <Text style={{ fontSize: 11, color: colors.inkMuted, fontStyle: 'italic', marginTop: 2 }}>
            (GPS-verified — time inside drive zones only)
          </Text>

          {/* Secondary stats row */}
          <View style={{ flexDirection: 'row', marginTop: 16, gap: 16 }}>
            {[
              { value: vol.drivesCompleted, label: 'Drives' },
              { value: vol.endorsementCount, label: 'Endorsed' },
              { value: '📍', label: 'Mumbai' },
            ].map((stat, i) => (
              <View key={i} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>
                  {stat.value}
                </Text>
                <Text style={{ fontSize: 11, color: colors.inkMuted }}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Skills */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink, marginBottom: 10 }}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {vol.skills?.map((skill, i) => (
              <View key={i} style={{
                flexDirection: 'row', alignItems: 'center',
                paddingHorizontal: 12, paddingVertical: 6, borderRadius: 9999,
                backgroundColor: skill.tier === 'endorsed' ? colors.brand : skill.tier === 'inferred' ? colors.brandLight : 'transparent',
                borderWidth: skill.tier === 'self' ? 1 : 0,
                borderColor: colors.brand,
              }}>
                <Text style={{
                  fontSize: 12, fontWeight: '600',
                  color: skill.tier === 'endorsed' ? '#FFF' : skill.tier === 'inferred' ? colors.brand : colors.brand,
                }}>
                  {skill.category}
                </Text>
                {skill.tier === 'endorsed' && (
                  <Text style={{ fontSize: 10, color: '#FFF', marginLeft: 4 }}>✓</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Endorsements */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>Endorsements</Text>
          <Text style={{ fontSize: 12, color: colors.inkMuted, fontStyle: 'italic', marginTop: 2, marginBottom: 12 }}>
            Manually awarded by NGO coordinators. Cannot be self-earned.
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {SEED_ENDORSEMENTS.map((end) => (
              <View key={end.id} style={{
                width: '47%', backgroundColor: colors.card, borderRadius: 16,
                padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
              }}>
                <Text style={{ fontSize: 28 }}>{end.emoji}</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.ink, marginTop: 6 }}>
                  {end.badgeName}
                </Text>
                <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 2 }}>
                  {end.ngoName}
                </Text>
                <Text style={{ fontSize: 10, color: colors.inkMuted }}>{end.driveName} • {end.date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Drive History */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink, marginBottom: 10 }}>
            Drive History
          </Text>
          {driveHistory.map((drive, i) => (
            <View key={i} style={{
              flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
              borderBottomWidth: i < driveHistory.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
            }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>✅</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>{drive.name}</Text>
                <Text style={{ fontSize: 12, color: colors.inkMuted }}>{drive.ngo} • {drive.role}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#059669' }}>{drive.hours}</Text>
                <Text style={{ fontSize: 10, color: colors.inkMuted }}>{drive.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Verified Seal */}
        <View style={{
          marginHorizontal: 20, marginTop: 24, marginBottom: 16,
          backgroundColor: colors.card, borderRadius: 16, padding: 16,
          borderLeftWidth: 3, borderLeftColor: colors.brand,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Text style={{ fontSize: 18, marginRight: 6 }}>🛡️</Text>
            <Text style={{ fontSize: 17, fontWeight: '700', color: colors.ink }}>ActiVibe Verified</Text>
          </View>
          <Text style={{ fontSize: 13, color: colors.inkLight, lineHeight: 18 }}>
            Every hour confirmed by GPS geofence presence. Every endorsement is a deliberate award from an NGO coordinator.
          </Text>
        </View>

        {/* Share footer */}
        <Pressable
          style={{
            marginHorizontal: 20, marginBottom: 40, height: 48, borderRadius: 16,
            borderWidth: 1.5, borderColor: colors.brand,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.brand }}>📸 Save as Image</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
