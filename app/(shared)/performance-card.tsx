import React, { useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, Animated, Dimensions, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Colors } from '@/constants/theme';
import { SEED_VOLUNTEER, SEED_ENDORSEMENTS, SEED_DRIVE } from '@/data/seed';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function PerformanceCardScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  const vol = SEED_VOLUNTEER;

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideUp = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, damping: 12, stiffness: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🌟 ${vol.name} — ActiVibe Performance Card\n\n` +
          `✅ ${vol.totalActiveHours} GPS-verified hours\n` +
          `🏅 ${vol.endorsementCount} endorsements\n` +
          `📊 ${vol.drivesCompleted} drives completed\n\n` +
          `#ActiVibe #VerifiedVolunteer`,
      });
    } catch (e) {}
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0E17' }}>
      {/* Close button */}
      <Pressable
        onPress={() => router.back()}
        style={{
          position: 'absolute', top: 52, right: 16, zIndex: 10,
          width: 36, height: 36, borderRadius: 18,
          backgroundColor: 'rgba(255,255,255,0.15)',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color: '#FFF' }}>✕</Text>
      </Pressable>

      <ScrollView
        contentContainerStyle={{ alignItems: 'center', paddingTop: 60, paddingBottom: 100 }}
      >
        <Animated.View style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideUp }],
        }}>
          {/* The Card */}
          <View style={{
            width: width - 48, borderRadius: 28, overflow: 'hidden',
            shadowColor: '#059669', shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.3, shadowRadius: 24,
          }}>
            {/* Top gradient */}
            <LinearGradient
              colors={['#059669', '#047857']}
              style={{ paddingTop: 28, paddingBottom: 20, alignItems: 'center' }}
            >
              {/* Verified badge */}
              <View style={{
                flexDirection: 'row', alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.2)',
                paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999,
                marginBottom: 16,
              }}>
                <Text style={{ fontSize: 12 }}>🛡️ </Text>
                <Text style={{ fontSize: 11, color: '#FFF', fontWeight: '600' }}>ActiVibe Verified</Text>
              </View>

              {/* Avatar */}
              <View style={{
                width: 80, height: 80, borderRadius: 40,
                borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
                backgroundColor: '#FFF', overflow: 'hidden',
                marginBottom: 12,
              }}>
                <Animated.Image
                  source={{ uri: vol.avatarUrl }}
                  style={{ width: 74, height: 74, borderRadius: 37 }}
                />
              </View>

              <Text style={{ fontSize: 24, fontWeight: '800', color: '#FFF' }}>{vol.name}</Text>
              <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
                📍 {vol.location}
              </Text>
            </LinearGradient>

            {/* Stats section */}
            <View style={{ backgroundColor: '#FFF', paddingVertical: 24 }}>
              {/* Primary stat */}
              <View style={{ alignItems: 'center', marginBottom: 24 }}>
                <Text style={{ fontSize: 48, fontWeight: '800', color: '#059669' }}>
                  {vol.totalActiveHours}
                </Text>
                <Text style={{ fontSize: 14, color: '#7B78A0', fontWeight: '500' }}>
                  GPS-Verified Active Hours
                </Text>
                <Text style={{ fontSize: 11, color: '#9CA3AF', fontStyle: 'italic', marginTop: 2 }}>
                  (In-zone presence only)
                </Text>
              </View>

              {/* Three column stats */}
              <View style={{ flexDirection: 'row', paddingHorizontal: 24, marginBottom: 24 }}>
                {[
                  { emoji: '📊', value: vol.drivesCompleted, label: 'Drives' },
                  { emoji: '🏅', value: vol.endorsementCount, label: 'Endorsed' },
                  { emoji: '⭐', value: '4.8', label: 'Rating' },
                ].map((stat, i) => (
                  <View key={i} style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>{stat.emoji}</Text>
                    <Text style={{ fontSize: 22, fontWeight: '700', color: '#0F0E17', marginTop: 4 }}>
                      {stat.value}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#7B78A0' }}>{stat.label}</Text>
                  </View>
                ))}
              </View>

              {/* Divider */}
              <View style={{ height: 1, backgroundColor: '#E4E4F0', marginHorizontal: 24 }} />

              {/* Badge row */}
              <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#3D3A54', marginBottom: 10 }}>
                  Earned Badges
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {SEED_ENDORSEMENTS.map((end) => (
                    <View key={end.id} style={{
                      flexDirection: 'row', alignItems: 'center',
                      backgroundColor: '#F3F4F6', paddingHorizontal: 12,
                      paddingVertical: 6, borderRadius: 9999,
                    }}>
                      <Text style={{ fontSize: 16, marginRight: 4 }}>{end.emoji}</Text>
                      <Text style={{ fontSize: 12, fontWeight: '600', color: '#3D3A54' }}>{end.badgeName}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Skills row */}
              <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#3D3A54', marginBottom: 8 }}>
                  Verified Skills
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                  {vol.skills?.map((skill, i) => (
                    <View key={i} style={{
                      paddingHorizontal: 10, paddingVertical: 4, borderRadius: 9999,
                      backgroundColor: skill.tier === 'endorsed' ? '#059669' : '#D1FAE5',
                    }}>
                      <Text style={{
                        fontSize: 11, fontWeight: '600',
                        color: skill.tier === 'endorsed' ? '#FFF' : '#059669',
                      }}>
                        {skill.category} {skill.tier === 'endorsed' ? '✓' : ''}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Footer watermark */}
              <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                marginTop: 24, paddingTop: 16,
                borderTopWidth: 1, borderTopColor: '#E4E4F0',
              }}>
                <View style={{
                  width: 6, height: 6, borderRadius: 3, backgroundColor: '#059669', marginRight: 4,
                }} />
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F0E17', letterSpacing: -0.3 }}>
                  ActiVibe
                </Text>
                <Text style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 6 }}>Verified Impact</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* CTA Buttons */}
        <Animated.View style={{ marginTop: 28, opacity: fadeAnim, width: width - 48 }}>
          <Pressable
            onPress={handleShare}
            style={({ pressed }) => ({
              height: 52, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#059669',
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>📤 Share Card</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/(volunteer)/feed')}
            style={({ pressed }) => ({
              height: 48, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
              borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)', marginTop: 12,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' }}>
              Back to Feed
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
