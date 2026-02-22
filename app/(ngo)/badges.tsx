import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, Pressable, Alert } from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { Colors, BadgeTypes } from '@/constants/theme';
import { SEED_ANALYTICS_VOLUNTEERS, SEED_DRIVE } from '@/data/seed';

export default function BadgesScreen() {
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  const [awardedBadges, setAwardedBadges] = useState<Record<string, string[]>>({});

  const volunteers = SEED_ANALYTICS_VOLUNTEERS;

  const awardBadge = (volId: string, badgeName: string) => {
    setAwardedBadges((prev) => ({
      ...prev,
      [volId]: [...(prev[volId] || []), badgeName],
    }));
    Alert.alert('✅ Badge Awarded!', `${badgeName} has been awarded.`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header */}
      <View style={{
        paddingHorizontal: 16, paddingVertical: 14,
        backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border,
      }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.ink }}>Award Badges</Text>
        <Text style={{ fontSize: 14, color: colors.inkMuted, marginTop: 2 }}>
          {SEED_DRIVE.name} — Recognize your volunteers
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* How it works */}
        <View style={{
          backgroundColor: colors.tealLight, borderRadius: 12, padding: 12,
          borderLeftWidth: 3, borderLeftColor: colors.teal, marginBottom: 20,
        }}>
          <Text style={{ fontSize: 13, color: darkMode ? colors.teal : colors.ink, lineHeight: 18 }}>
            🏅 NGO coordinators manually award badges. These appear on volunteer profiles and cannot be self-earned.
          </Text>
        </View>

        {/* Available Badges */}
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.ink, marginBottom: 10 }}>
          Available Badges
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {BadgeTypes.map((badge) => (
            <View key={badge.id} style={{
              width: 90, backgroundColor: colors.card, borderRadius: 16,
              padding: 12, marginRight: 10, alignItems: 'center',
              shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
            }}>
              <Text style={{ fontSize: 32 }}>{badge.emoji}</Text>
              <Text style={{ fontSize: 11, fontWeight: '600', color: colors.ink, marginTop: 6, textAlign: 'center' }}>
                {badge.name}
              </Text>
              <Text style={{ fontSize: 9, color: colors.inkMuted, marginTop: 2 }}>
                Max: {badge.maxPerDrive}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Volunteers */}
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.ink, marginBottom: 10 }}>
          Volunteers ({volunteers.length})
        </Text>
        {volunteers.map((vol) => (
          <View key={vol.id} style={{
            backgroundColor: colors.card, borderRadius: 16, padding: 14, marginBottom: 10,
            shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Image source={{ uri: vol.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.ink }}>{vol.name}</Text>
                <Text style={{ fontSize: 12, color: colors.inkMuted }}>
                  {vol.role} • {vol.activeTime.slice(0, 5)} active
                </Text>
              </View>
              <View style={{
                backgroundColor: '#D1FAE5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 9999,
              }}>
                <Text style={{ fontSize: 10, fontWeight: '600', color: '#059669' }}>{vol.tasksDone}</Text>
              </View>
            </View>

            {/* Awarded badges */}
            {awardedBadges[vol.id] && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                {awardedBadges[vol.id].map((badge, i) => {
                  const b = BadgeTypes.find((bt) => bt.name === badge);
                  return (
                    <View key={i} style={{
                      flexDirection: 'row', alignItems: 'center',
                      backgroundColor: colors.brandLight, paddingHorizontal: 8,
                      paddingVertical: 3, borderRadius: 9999,
                    }}>
                      <Text style={{ fontSize: 12 }}>{b?.emoji}</Text>
                      <Text style={{ fontSize: 10, fontWeight: '600', color: colors.brand, marginLeft: 3 }}>
                        {badge}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Badge buttons */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {BadgeTypes.slice(0, 4).map((badge) => {
                  const alreadyAwarded = awardedBadges[vol.id]?.includes(badge.name);
                  return (
                    <Pressable
                      key={badge.id}
                      onPress={() => !alreadyAwarded && awardBadge(vol.id, badge.name)}
                      disabled={alreadyAwarded}
                      style={({ pressed }) => ({
                        paddingHorizontal: 12, height: 34, borderRadius: 9999,
                        backgroundColor: alreadyAwarded ? colors.gray100 : colors.card,
                        borderWidth: 1, borderColor: alreadyAwarded ? colors.gray200 : colors.brand,
                        alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'row', opacity: alreadyAwarded ? 0.5 : 1,
                        transform: [{ scale: pressed ? 0.95 : 1 }],
                      })}
                    >
                      <Text style={{ fontSize: 14, marginRight: 4 }}>{badge.emoji}</Text>
                      <Text style={{
                        fontSize: 12, fontWeight: '600',
                        color: alreadyAwarded ? colors.inkMuted : colors.brand,
                      }}>
                        {alreadyAwarded ? '✓' : 'Award'}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
