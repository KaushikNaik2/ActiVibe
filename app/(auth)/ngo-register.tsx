import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Colors, SkillCategories } from '@/constants/theme';

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export default function NGORegisterScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;

  const [orgName, setOrgName] = useState('');
  const [city, setCity] = useState('');
  const [pan, setPan] = useState('');
  const [causes, setCauses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [panError, setPanError] = useState('');

  const isPanValid = PAN_REGEX.test(pan);
  const isValid = orgName.trim().length > 0 && city.trim().length > 0 && isPanValid && causes.length >= 1;

  const handlePanChange = (text: string) => {
    const upper = text.toUpperCase();
    setPan(upper);
    if (upper.length === 10 && !PAN_REGEX.test(upper)) {
      setPanError('Invalid PAN format (e.g., AAAPL1234C)');
    } else {
      setPanError('');
    }
  };

  const toggleCause = (id: string) => {
    setCauses((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.replace('/(ngo)/feed');
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
        <Text style={{ fontSize: 26, fontWeight: '700', color: colors.ink, marginBottom: 4 }}>
          Register Your NGO
        </Text>
        <Text style={{ fontSize: 15, color: colors.inkMuted, marginBottom: 24 }}>
          Get verified and start posting drives.
        </Text>

        {/* Form Card */}
        <View style={{
          backgroundColor: colors.card, borderRadius: 20, padding: 24,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
        }}>
          {/* Org Name */}
          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>
            Organisation Name
          </Text>
          <TextInput
            value={orgName}
            onChangeText={setOrgName}
            placeholder="e.g. Greenpeace Mumbai"
            placeholderTextColor={colors.inkMuted}
            maxLength={120}
            style={{
              height: 52, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
              paddingHorizontal: 16, fontSize: 15, color: colors.ink, marginBottom: 16,
            }}
          />

          {/* Registered City */}
          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>
            Registered City
          </Text>
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="e.g. Mumbai, Maharashtra"
            placeholderTextColor={colors.inkMuted}
            style={{
              height: 52, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
              paddingHorizontal: 16, fontSize: 15, color: colors.ink, marginBottom: 16,
            }}
          />

          {/* PAN Number */}
          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>
            PAN Number
          </Text>
          <TextInput
            value={pan}
            onChangeText={handlePanChange}
            placeholder="AAAPL1234C"
            placeholderTextColor={colors.inkMuted}
            maxLength={10}
            autoCapitalize="characters"
            style={{
              height: 52, borderRadius: 12, borderWidth: 1,
              borderColor: panError ? '#DC2626' : colors.border,
              paddingHorizontal: 16, fontSize: 15, color: colors.ink, marginBottom: 4,
            }}
          />
          {panError ? (
            <Text style={{ fontSize: 11, color: '#DC2626', marginBottom: 12 }}>{panError}</Text>
          ) : (
            <Text style={{ fontSize: 11, color: colors.inkMuted, marginBottom: 16 }}>
              Required for 80G/12A compliance verification
            </Text>
          )}

          {/* Cause Areas */}
          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 8 }}>
            Cause Area (select 1–3)
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {SkillCategories.map((cat) => {
              const isSelected = causes.includes(cat.id);
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => toggleCause(cat.id)}
                  style={{
                    paddingHorizontal: 14, height: 34, borderRadius: 9999,
                    backgroundColor: isSelected ? colors.brand : colors.gray100,
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Text style={{
                    fontSize: 13, fontWeight: '600',
                    color: isSelected ? '#FFF' : colors.inkMuted,
                  }}>
                    {cat.emoji} {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Submit */}
          <Pressable
            onPress={handleSubmit}
            disabled={!isValid || loading}
            style={({ pressed }) => ({
              height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
              backgroundColor: colors.brand, opacity: !isValid || loading ? 0.4 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Text style={{ color: '#FFF', fontSize: 15, fontWeight: '600' }}>
              {loading ? '⏳ Registering...' : 'Register Organisation'}
            </Text>
          </Pressable>
        </View>

        {/* PAN Notice */}
        <View style={{
          flexDirection: 'row', marginTop: 16,
          backgroundColor: colors.tealLight, borderRadius: 12,
          borderLeftWidth: 3, borderLeftColor: colors.teal, padding: 12,
        }}>
          <Text style={{ fontSize: 13, color: colors.teal, lineHeight: 18 }}>
            PAN will be reviewed for 80G/12A compliance. You can post drives immediately.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
