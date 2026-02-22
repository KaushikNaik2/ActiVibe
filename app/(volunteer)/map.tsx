import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Pressable, SafeAreaView, Animated, Dimensions, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { useActiveEventStore } from '@/stores/activeEventStore';
import { useFeedStore } from '@/stores/feedStore';
import { Colors } from '@/constants/theme';
import { SEED_DRIVE } from '@/data/seed';

const { width, height: screenHeight } = Dimensions.get('window');

export default function MapScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  
  const activeDrive = useActiveEventStore((s) => s.activeDrive);
  const inZone = useActiveEventStore((s) => s.inZone);
  const timerSeconds = useActiveEventStore((s) => s.timerSeconds);
  const postCount = useActiveEventStore((s) => s.postCount);
  const postLimit = useActiveEventStore((s) => s.postLimit);
  const isEventEnded = useActiveEventStore((s) => s.isEventEnded);
  const simulateEntry = useActiveEventStore((s) => s.simulateEntry);
  const simulateExit = useActiveEventStore((s) => s.simulateExit);
  const simulatePost = useActiveEventStore((s) => s.simulatePost);
  const endEvent = useActiveEventStore((s) => s.endEvent);
  const checkout = useActiveEventStore((s) => s.checkout);
  const incrementTimer = useActiveEventStore((s) => s.incrementTimer);
  const addPost = useFeedStore((s) => s.addPost);

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationFade = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0)).current;
  const celebrationFired = useRef(false);
  
  // Pulse animation for geofence
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const userDotPulse = useRef(new Animated.Value(1)).current;

  // Timer interval
  useEffect(() => {
    const interval = setInterval(() => {
      incrementTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Geofence pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 1250, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1250, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(userDotPulse, { toValue: 1.4, duration: 1500, useNativeDriver: true }),
        Animated.timing(userDotPulse, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const formatTimer = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const handleSimulateEntry = () => {
    simulateEntry();
    if (!celebrationFired.current) {
      celebrationFired.current = true;
      setShowCelebration(true);
      
      Animated.parallel([
        Animated.timing(celebrationFade, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(checkScale, { toValue: 1, damping: 10, stiffness: 120, useNativeDriver: true }),
      ]).start();

      setTimeout(() => {
        Animated.timing(celebrationFade, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
          setShowCelebration(false);
          checkScale.setValue(0);
        });
      }, 3500);
    }
  };

  const handleSimulatePost = () => {
    simulatePost();
    addPost({
      id: `post-dev-${Date.now()}`,
      type: 'volunteer_live',
      authorName: 'You',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=You',
      authorRole: 'volunteer',
      driveName: SEED_DRIVE.name,
      ngoName: SEED_DRIVE.ngoName,
      caption: 'Loving this drive! 🌊 Making a real difference today.',
      likes: 0,
      comments: 0,
      verifiedBadge: 'live',
      timestamp: 'Just now',
    });
  };

  const handleEndEvent = () => {
    endEvent();
    celebrationFired.current = false;
  };

  const handleCheckout = () => {
    const savedTime = timerSeconds;
    checkout();
    celebrationFired.current = false;
    router.push('/(shared)/performance-card');
  };

  // Determine status
  const getStatus = () => {
    if (isEventEnded) return 'ended';
    if (activeDrive && inZone) return 'checked-in';
    if (activeDrive && !inZone) return 'left-zone';
    return 'outside';
  };
  const status = getStatus();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Simulated Map Area */}
      <View style={{ flex: 1, backgroundColor: darkMode ? '#1a1a2e' : '#e8f5e9' }}>
        {/* Map background simulation */}
        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Grid pattern to simulate map */}
          <View style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <View key={`h-${i}`} style={{
                position: 'absolute', top: i * 60, left: 0, right: 0,
                height: 1, backgroundColor: colors.inkMuted,
              }} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={`v-${i}`} style={{
                position: 'absolute', left: i * 55, top: 0, bottom: 0,
                width: 1, backgroundColor: colors.inkMuted,
              }} />
            ))}
          </View>

          {/* Geofence Circle with pulse */}
          <Animated.View style={{
            width: 200, height: 200, borderRadius: 100,
            backgroundColor: 'rgba(5, 150, 105, 0.08)',
            borderWidth: 2, borderColor: 'rgba(5, 150, 105, 0.3)',
            alignItems: 'center', justifyContent: 'center',
            transform: [{ scale: pulseAnim }],
          }}>
            {/* Outer pulse ring */}
            <Animated.View style={{
              position: 'absolute', width: 220, height: 220, borderRadius: 110,
              backgroundColor: 'rgba(5, 150, 105, 0.04)',
              borderWidth: 1, borderColor: 'rgba(5, 150, 105, 0.15)',
            }} />
            
            {/* Venue Marker */}
            <View style={{
              width: 48, height: 48, borderRadius: 24,
              backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center',
              shadowColor: colors.brand, shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3, shadowRadius: 8,
            }}>
              <Text style={{ fontSize: 22 }}>🏖️</Text>
            </View>
            <Text style={{ fontSize: 11, color: colors.ink, fontWeight: '600', marginTop: 4 }}>
              {SEED_DRIVE.name.split(' ').slice(0, 2).join(' ')}
            </Text>
          </Animated.View>

          {/* User Location Dot */}
          {(status === 'checked-in' || status === 'left-zone') && (
            <Animated.View style={{
              position: 'absolute',
              top: status === 'checked-in' ? '48%' : '30%',
              left: status === 'checked-in' ? '52%' : '25%',
              transform: [{ scale: userDotPulse }],
            }}>
              <View style={{
                width: 20, height: 20, borderRadius: 10,
                backgroundColor: '#3B82F6', borderWidth: 3, borderColor: '#FFF',
                shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5, shadowRadius: 4,
              }} />
            </Animated.View>
          )}

          {/* Distance Label */}
          {status === 'outside' && (
            <View style={{
              position: 'absolute', bottom: '30%',
              backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 14,
              paddingVertical: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center',
            }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#D97706', marginRight: 6 }} />
              <Text style={{ fontSize: 13, color: '#3D3A54', fontWeight: '500' }}>~250m from check-in zone</Text>
            </View>
          )}
        </View>

        {/* DEV Mode Banner */}
        <View style={{
          backgroundColor: '#FEF3C7', paddingHorizontal: 16, paddingVertical: 6,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ fontSize: 11, fontWeight: '600', color: '#92400E' }}>
            DEV MODE — GPS Simulation Active
          </Text>
        </View>
      </View>

      {/* Status Card - Bottom Sheet simulation */}
      <View style={{
        backgroundColor: colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
        paddingHorizontal: 20, paddingTop: 14, paddingBottom: 32,
        shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1, shadowRadius: 20,
      }}>
        {/* Drag handle */}
        <View style={{
          width: 32, height: 4, borderRadius: 2,
          backgroundColor: colors.gray200, alignSelf: 'center', marginBottom: 14,
        }} />

        {/* Status indicator */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <View style={{
            width: 10, height: 10, borderRadius: 5, marginRight: 8,
            backgroundColor: status === 'checked-in' ? '#059669' :
              status === 'left-zone' || status === 'ended' ? '#D97706' : '#9CA3AF',
          }} />
          <Text style={{ fontSize: 16, fontWeight: '700', color: 
            status === 'checked-in' ? '#059669' :
            status === 'left-zone' ? '#D97706' :
            status === 'ended' ? '#D97706' : colors.ink,
          }}>
            {status === 'checked-in' ? 'Checked In ✓' :
             status === 'left-zone' ? 'Outside Zone — Paused' :
             status === 'ended' ? 'Event Ended' :
             'Outside Check-In Zone'}
          </Text>
        </View>

        {/* Timer */}
        {activeDrive && (
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
            <Text style={{
              fontSize: 28, fontWeight: '700', fontFamily: 'monospace',
              color: inZone ? '#059669' : '#D97706',
            }}>
              {formatTimer(timerSeconds)}
            </Text>
            {!inZone && activeDrive && (
              <Text style={{ fontSize: 13, color: '#D97706', marginLeft: 8, fontStyle: 'italic' }}>(paused)</Text>
            )}
          </View>
        )}

        {/* Post count */}
        {activeDrive && inZone && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 12, color: '#059669', marginRight: 6 }}>📷</Text>
            <Text style={{ fontSize: 13, color: colors.inkMuted }}>
              {postCount} / {postLimit} posts used
            </Text>
          </View>
        )}

        {/* Contextual message */}
        <Text style={{ fontSize: 13, color: colors.inkMuted, fontStyle: 'italic', marginBottom: 14 }}>
          {status === 'checked-in' ? 'Camera unlocked. Your time is being tracked automatically.' :
           status === 'left-zone' ? "You've left the drive zone — your active time is paused. Return to resume." :
           status === 'ended' ? 'This event has ended. You can now check out and post about your experience.' :
           'Check-in is automatic — no action needed. Walk into the zone.'}
        </Text>

        {/* DEV Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {!activeDrive && (
              <Pressable
                onPress={handleSimulateEntry}
                style={({ pressed }) => ({
                  paddingHorizontal: 16, height: 40, borderRadius: 20,
                  backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.border,
                  alignItems: 'center', justifyContent: 'center',
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                })}
              >
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.ink }}>
                  🧪 DEV: Simulate Entry
                </Text>
              </Pressable>
            )}

            {activeDrive && inZone && (
              <>
                <Pressable
                  onPress={() => simulateExit()}
                  style={({ pressed }) => ({
                    paddingHorizontal: 16, height: 40, borderRadius: 20,
                    backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center',
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  })}
                >
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#92400E' }}>
                    🚶 DEV: Simulate Exit
                  </Text>
                </Pressable>

                {postCount < postLimit && (
                  <Pressable
                    onPress={handleSimulatePost}
                    style={({ pressed }) => ({
                      paddingHorizontal: 16, height: 40, borderRadius: 20,
                      backgroundColor: '#D1FAE5', alignItems: 'center', justifyContent: 'center',
                      transform: [{ scale: pressed ? 0.95 : 1 }],
                    })}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#059669' }}>
                      📸 DEV: Simulate Post
                    </Text>
                  </Pressable>
                )}

                <Pressable
                  onPress={handleEndEvent}
                  style={({ pressed }) => ({
                    paddingHorizontal: 16, height: 40, borderRadius: 20,
                    backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center',
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  })}
                >
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#DC2626' }}>
                    ⏹️ DEV: End Event
                  </Text>
                </Pressable>
              </>
            )}

            {activeDrive && !inZone && !isEventEnded && (
              <Pressable
                onPress={handleSimulateEntry}
                style={({ pressed }) => ({
                  paddingHorizontal: 16, height: 40, borderRadius: 20,
                  backgroundColor: '#D1FAE5', alignItems: 'center', justifyContent: 'center',
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                })}
              >
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#059669' }}>
                  📍 DEV: Re-Enter Zone
                </Text>
              </Pressable>
            )}

            {/* Post-event posting */}
            {isEventEnded && postCount < postLimit && (
              <Pressable
                onPress={() => {
                  simulatePost();
                  addPost({
                    id: `post-pe-${Date.now()}`,
                    type: 'volunteer_post_event',
                    authorName: 'You',
                    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=You',
                    authorRole: 'volunteer',
                    driveName: SEED_DRIVE.name,
                    ngoName: SEED_DRIVE.ngoName,
                    caption: 'Just wrapped up an amazing drive! So grateful for the experience. 🌿✨',
                    likes: 0,
                    comments: 0,
                    verifiedBadge: 'post_event',
                    timestamp: 'Just now',
                  });
                }}
                style={({ pressed }) => ({
                  paddingHorizontal: 16, height: 40, borderRadius: 20,
                  backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center',
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                })}
              >
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#92400E' }}>
                  📝 Post About Event
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>

        {/* Checkout Button */}
        {activeDrive && (
          <Pressable
            onPress={handleCheckout}
            style={({ pressed }) => ({
              height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
              borderWidth: 1.5, borderColor: '#DC2626',
              transform: [{ scale: pressed ? 0.97 : 1 }], marginTop: 4,
            })}
          >
            <Text style={{ color: '#DC2626', fontSize: 15, fontWeight: '600' }}>End My Shift</Text>
          </Pressable>
        )}
      </View>

      {/* Check-In Celebration Overlay */}
      {showCelebration && (
        <Pressable
          onPress={() => {
            Animated.timing(celebrationFade, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
              setShowCelebration(false);
              checkScale.setValue(0);
            });
          }}
          style={{
            position: 'absolute', inset: 0,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Animated.View style={{
            position: 'absolute', inset: 0,
            backgroundColor: 'rgba(255,255,255,0.95)',
            opacity: celebrationFade,
          }} />
          <Animated.View style={{
            alignItems: 'center', opacity: celebrationFade,
            transform: [{ scale: checkScale }],
          }}>
            <Text style={{ fontSize: 72 }}>✅</Text>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#059669', marginTop: 16 }}>
              You're In!
            </Text>
            <Text style={{ fontSize: 17, color: '#3D3A54', marginTop: 8 }}>
              {SEED_DRIVE.name}
            </Text>
            <Text style={{ fontSize: 15, color: '#7B78A0', marginTop: 4, textAlign: 'center' }}>
              Your time is now being{'\n'}tracked automatically.
            </Text>
            <Text style={{ fontSize: 32, marginTop: 20 }}>🎉🎊🎉</Text>
          </Animated.View>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
