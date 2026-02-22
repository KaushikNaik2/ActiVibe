import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Colors } from '@/constants/theme';

export default function CreateDriveScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;

  const [driveName, setDriveName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [spots, setSpots] = useState(30);
  const [postLimit, setPostLimit] = useState(5);
  const [zoneRadius, setZoneRadius] = useState(500);
  const [showConfirm, setShowConfirm] = useState(false);

  const isValid = driveName.trim().length > 0 && date.length > 0 && location.length > 0;

  const handlePublish = () => {
    setShowConfirm(false);
    Alert.alert('✅ Drive Published!', 'Volunteers can now register for ' + driveName);
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1,
        borderBottomColor: colors.border, backgroundColor: colors.card,
      }}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 18, color: colors.ink }}>←</Text>
        </Pressable>
        <Text style={{ fontSize: 17, fontWeight: '700', color: colors.ink }}>Create Drive</Text>
        <Text style={{ fontSize: 13, fontWeight: '600', color: colors.brand }}>Save Draft</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <View style={{
          backgroundColor: colors.card, borderRadius: 20, padding: 20,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
        }}>
          {/* Drive Name */}
          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>
            Drive Name
          </Text>
          <TextInput
            value={driveName}
            onChangeText={setDriveName}
            placeholder="e.g. Versova Beach Cleanup"
            placeholderTextColor={colors.inkMuted}
            maxLength={100}
            style={{
              height: 52, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
              paddingHorizontal: 16, fontSize: 15, color: colors.ink, marginBottom: 4,
            }}
          />
          <Text style={{ fontSize: 10, color: colors.inkMuted, textAlign: 'right', marginBottom: 16 }}>
            {driveName.length}/100
          </Text>

          {/* Date & Time */}
          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>
            Date & Time
          </Text>
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="e.g. 15 June 2025, 8:00 AM – 12:00 PM"
            placeholderTextColor={colors.inkMuted}
            style={{
              height: 52, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
              paddingHorizontal: 16, fontSize: 15, color: colors.ink, marginBottom: 16,
            }}
          />

          {/* Location */}
          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>
            Drive Location
          </Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Versova Beach, Mumbai"
            placeholderTextColor={colors.inkMuted}
            style={{
              height: 52, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
              paddingHorizontal: 16, fontSize: 15, color: colors.ink, marginBottom: 8,
            }}
          />

          {/* Simulated Mini Map */}
          <View style={{
            height: 100, borderRadius: 12, backgroundColor: darkMode ? '#1a2332' : '#e8f5e9',
            alignItems: 'center', justifyContent: 'center', marginBottom: 16,
            borderWidth: 1, borderColor: colors.border,
          }}>
            <Text style={{ fontSize: 24 }}>📍</Text>
            <Text style={{ fontSize: 11, color: colors.inkMuted, marginTop: 4 }}>
              {location || 'Map preview will appear here'}
            </Text>
          </View>

          {/* Zone Radius */}
          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>
            Check-In Zone Radius: {zoneRadius}m
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Pressable onPress={() => setZoneRadius(Math.max(100, zoneRadius - 100))}
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gray100,
                alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, color: colors.ink }}>−</Text>
            </Pressable>
            <View style={{
              flex: 1, height: 6, backgroundColor: colors.gray100, borderRadius: 3,
              overflow: 'hidden',
            }}>
              <View style={{
                width: `${((zoneRadius - 100) / 1900) * 100}%`, height: '100%',
                backgroundColor: colors.brand, borderRadius: 3,
              }} />
            </View>
            <Pressable onPress={() => setZoneRadius(Math.min(2000, zoneRadius + 100))}
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gray100,
                alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, color: colors.ink }}>+</Text>
            </Pressable>
          </View>

          {/* Volunteer Spots */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View>
              <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight }}>Volunteer Spots</Text>
              <Text style={{ fontSize: 11, color: colors.inkMuted }}>0 of {spots} registered</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Pressable onPress={() => setSpots(Math.max(5, spots - 5))}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gray100,
                  alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: colors.ink }}>−</Text>
              </Pressable>
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>{spots}</Text>
              <Pressable onPress={() => setSpots(Math.min(500, spots + 5))}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gray100,
                  alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: colors.ink }}>+</Text>
              </Pressable>
            </View>
          </View>

          {/* Post Limit */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight }}>Posts per volunteer</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Pressable onPress={() => setPostLimit(Math.max(1, postLimit - 1))}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gray100,
                  alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: colors.ink }}>−</Text>
              </Pressable>
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>{postLimit}</Text>
              <Pressable onPress={() => setPostLimit(Math.min(10, postLimit + 1))}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gray100,
                  alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: colors.ink }}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Publish Footer */}
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: colors.card, paddingHorizontal: 20, paddingTop: 12,
        paddingBottom: 32, borderTopWidth: 1, borderTopColor: colors.border,
        shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05, shadowRadius: 8,
      }}>
        <Pressable
          onPress={() => isValid ? setShowConfirm(true) : null}
          disabled={!isValid}
          style={({ pressed }) => ({
            height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
            backgroundColor: colors.brand, opacity: isValid ? 1 : 0.4,
            transform: [{ scale: pressed ? 0.97 : 1 }],
          })}
        >
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>Publish Drive</Text>
        </Pressable>
      </View>

      {/* Confirmation Modal */}
      {showConfirm && (
        <Pressable
          onPress={() => setShowConfirm(false)}
          style={{
            position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Pressable style={{
            backgroundColor: colors.card, borderRadius: 20, padding: 24,
            width: '85%', maxWidth: 360,
          }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink, marginBottom: 12 }}>
              Confirm & Publish
            </Text>
            <Text style={{ fontSize: 14, color: colors.inkLight, lineHeight: 20 }}>
              {driveName}{'\n'}{date}{'\n'}{spots} spots · {postLimit} posts per volunteer
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
              <Pressable
                onPress={() => setShowConfirm(false)}
                style={{ flex: 1, height: 44, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
                  alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>Edit More</Text>
              </Pressable>
              <Pressable
                onPress={handlePublish}
                style={{ flex: 1, height: 44, borderRadius: 12, backgroundColor: colors.brand,
                  alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFF' }}>Publish</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
