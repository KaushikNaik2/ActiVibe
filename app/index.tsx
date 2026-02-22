import React, { useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, Pressable, Animated, Dimensions,
  SafeAreaView, useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const FEATURE_CARDS = [
  { emoji: '📍', title: 'GPS Auto Check-In', subtitle: 'No manual attendance. Walk in, get verified.', gradient: ['#059669', '#047857'] as const },
  { emoji: '📊', title: 'Live Reports', subtitle: 'Engagement analytics. Zero spreadsheets.', gradient: ['#10B981', '#059669'] as const },
  { emoji: '🏅', title: 'Verified Hours', subtitle: 'GPS-proven record. On your profile forever.', gradient: ['#34D399', '#10B981'] as const },
];

const STEPS = [
  { num: '1', text: 'NGO posts a drive' },
  { num: '2', text: 'Volunteer GPS auto check-in' },
  { num: '3', text: 'Hours logged, reports generated' },
];

export default function SplashScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const toggleDarkMode = useAuthStore((s) => s.toggleDarkMode);
  const systemScheme = useColorScheme();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const blob1 = useRef(new Animated.Value(0)).current;
  const blob2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in content
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();

    // Pulse dot animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    // Blob animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(blob1, { toValue: 1, duration: 4000, useNativeDriver: true }),
        Animated.timing(blob1, { toValue: 0, duration: 4000, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(blob2, { toValue: 1, duration: 5000, useNativeDriver: true }),
        Animated.timing(blob2, { toValue: 0, duration: 5000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const blob1TranslateX = blob1.interpolate({ inputRange: [0, 1], outputRange: [-30, 30] });
  const blob1TranslateY = blob1.interpolate({ inputRange: [0, 1], outputRange: [-20, 20] });
  const blob2TranslateX = blob2.interpolate({ inputRange: [0, 1], outputRange: [20, -20] });
  const blob2TranslateY = blob2.interpolate({ inputRange: [0, 1], outputRange: [15, -25] });

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0E17' }}>
      {/* Animated blob backgrounds */}
      <Animated.View
        style={{
          position: 'absolute', top: 60, left: -40,
          width: 200, height: 200, borderRadius: 100,
          backgroundColor: 'rgba(5, 150, 105, 0.15)',
          transform: [{ translateX: blob1TranslateX }, { translateY: blob1TranslateY }],
        }}
      />
      <Animated.View
        style={{
          position: 'absolute', top: 200, right: -60,
          width: 260, height: 260, borderRadius: 130,
          backgroundColor: 'rgba(16, 185, 129, 0.10)',
          transform: [{ translateX: blob2TranslateX }, { translateY: blob2TranslateY }],
        }}
      />
      <Animated.View
        style={{
          position: 'absolute', bottom: 100, left: 30,
          width: 180, height: 180, borderRadius: 90,
          backgroundColor: 'rgba(52, 211, 153, 0.08)',
          transform: [{ translateX: blob2TranslateX }, { translateY: blob1TranslateY }],
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Dark mode toggle */}
        <Pressable
          onPress={toggleDarkMode}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14,
            paddingHorizontal: 12, paddingVertical: 6,
          }}
        >
          <Text style={{ fontSize: 18 }}>{darkMode ? '☀️' : '🌙'}</Text>
        </Pressable>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 200, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo & Wordmark */}
          <Animated.View
            style={{
              alignItems: 'center', marginTop: 60,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Animated.View
                style={{
                  width: 10, height: 10, borderRadius: 5,
                  backgroundColor: '#059669', marginRight: 6,
                  transform: [{ scale: pulseAnim }],
                }}
              />
              <Text style={{ fontSize: 36, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1 }}>
                ActiVibe
              </Text>
            </View>

            {/* Hero Headline */}
            <Text style={{
              fontSize: 28, fontWeight: '800', color: '#FFFFFF',
              textAlign: 'center', marginTop: 24, lineHeight: 36,
            }}>
              Where action{'\n'}meets community.
            </Text>

            <Text style={{
              fontSize: 15, color: '#9090B8', textAlign: 'center',
              marginTop: 12, lineHeight: 22, maxWidth: 300,
            }}>
              GPS-verified volunteering. Real hours.{'\n'}Real impact. Real connections.
            </Text>
          </Animated.View>

          {/* Value Props — How we connect volunteers & NGOs */}
          <Animated.View style={{ marginTop: 36, opacity: fadeAnim }}>
            <View style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderRadius: 20, padding: 20, marginBottom: 8,
            }}>
              <Text style={{ fontSize: 13, color: '#059669', fontWeight: '600', marginBottom: 12, letterSpacing: 1 }}>
                HOW ACTIVIBE CONNECTS
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(5,150,105,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Text style={{ fontSize: 20 }}>🤝</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 15 }}>Bridge the Gap</Text>
                  <Text style={{ color: '#9090B8', fontSize: 13, marginTop: 2 }}>
                    NGOs post drives, volunteers discover & join with one tap. No phone calls, no forms.
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(5,150,105,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Text style={{ fontSize: 20 }}>✅</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 15 }}>Prove Real Impact</Text>
                  <Text style={{ color: '#9090B8', fontSize: 13, marginTop: 2 }}>
                    GPS tracks actual presence, not just sign-ups. Every hour is verified and permanent.
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(5,150,105,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Text style={{ fontSize: 20 }}>🌟</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 15 }}>Earn Recognition</Text>
                  <Text style={{ color: '#9090B8', fontSize: 13, marginTop: 2 }}>
                    Build a verified portfolio with NGO endorsements. Share your impact story anywhere.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Feature Cards — Horizontal scroll */}
          <Animated.View style={{ marginTop: 24, opacity: fadeAnim }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={width * 0.72 + 12}
              decelerationRate="fast"
              contentContainerStyle={{ paddingRight: 24 }}
            >
              {FEATURE_CARDS.map((card, i) => (
                <LinearGradient
                  key={i}
                  colors={[card.gradient[0], card.gradient[1]]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={{
                    width: width * 0.72, height: 150,
                    borderRadius: 20, padding: 20, marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 32, marginBottom: 8 }}>{card.emoji}</Text>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFF' }}>{card.title}</Text>
                  <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>{card.subtitle}</Text>
                </LinearGradient>
              ))}
            </ScrollView>
          </Animated.View>

          {/* How It Works — 3 Steps */}
          <Animated.View style={{ marginTop: 32, opacity: fadeAnim }}>
            <View style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderRadius: 16, padding: 20,
            }}>
              <Text style={{ fontSize: 13, color: '#059669', fontWeight: '600', marginBottom: 16, letterSpacing: 1 }}>
                HOW IT WORKS
              </Text>
              {STEPS.map((step, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: i < 2 ? 16 : 0 }}>
                  <View style={{
                    width: 32, height: 32, borderRadius: 16,
                    backgroundColor: '#059669', alignItems: 'center', justifyContent: 'center',
                    marginRight: 12,
                  }}>
                    <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 14 }}>{step.num}</Text>
                  </View>
                  <Text style={{ color: '#FFF', fontSize: 15, fontWeight: '500', flex: 1 }}>{step.text}</Text>
                  {i < 2 && <Text style={{ color: '#7B78A0', fontSize: 18, marginLeft: 8 }}>→</Text>}
                </View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>

        {/* CTA Footer */}
        <View style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          backgroundColor: 'rgba(15, 14, 23, 0.95)',
          paddingHorizontal: 24, paddingTop: 16, paddingBottom: 36,
          borderTopLeftRadius: 24, borderTopRightRadius: 24,
        }}>
          <Pressable
            onPress={() => {
              useAuthStore.getState().loginAsVolunteer();
              router.push('/(auth)/login');
            }}
            style={({ pressed }) => ({
              backgroundColor: '#059669',
              height: 52, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>I'm a Volunteer</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              useAuthStore.getState().loginAsNGO();
              router.push('/(auth)/login');
            }}
            style={({ pressed }) => ({
              height: 52, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
              borderWidth: 1.5, borderColor: '#059669', marginTop: 12,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Text style={{ color: '#059669', fontSize: 16, fontWeight: '600' }}>I'm an NGO</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
