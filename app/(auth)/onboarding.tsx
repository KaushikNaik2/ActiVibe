import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Colors, SkillCategories } from '@/constants/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSkill = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    router.replace('/(volunteer)/feed');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header with brand gradient feel */}
      <View style={{
        backgroundColor: colors.brand, paddingHorizontal: 24,
        paddingTop: 20, paddingBottom: 28, borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Step 1 of 1</Text>
        </View>
        <Text style={{ fontSize: 26, fontWeight: '700', color: '#FFF', marginTop: 12 }}>
          What are your{'\n'}strengths?
        </Text>
        <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
          We'll show you relevant drives nearby.
        </Text>
      </View>

      {/* Skill Grid */}
      <FlatList
        data={SkillCategories}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);
          return (
            <Pressable
              onPress={() => toggleSkill(item.id)}
              style={({ pressed }) => ({
                flex: 1, height: 100, borderRadius: 20,
                backgroundColor: isSelected ? item.color : colors.card,
                borderWidth: 2, borderColor: isSelected ? item.color : colors.border,
                alignItems: 'center', justifyContent: 'center',
                transform: [{ scale: pressed ? 0.96 : isSelected ? 1.03 : 1 }],
                shadowColor: isSelected ? item.color : '#000',
                shadowOffset: { width: 0, height: 2 }, shadowOpacity: isSelected ? 0.3 : 0.05,
                shadowRadius: 8, elevation: isSelected ? 4 : 1,
              })}
            >
              <Text style={{ fontSize: 32, marginBottom: 6 }}>{item.emoji}</Text>
              <Text style={{
                fontSize: 13, fontWeight: '700',
                color: isSelected ? '#FFF' : colors.ink,
                textAlign: 'center',
              }}>
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Footer */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 36 }}>
        <Text style={{
          fontSize: 13, color: colors.inkMuted, textAlign: 'center', marginBottom: 12,
        }}>
          {selected.length} categories selected
        </Text>
        <Pressable
          onPress={handleContinue}
          disabled={selected.length < 1}
          style={({ pressed }) => ({
            height: 52, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
            backgroundColor: colors.brand, opacity: selected.length < 1 ? 0.4 : 1,
            transform: [{ scale: pressed ? 0.97 : 1 }],
          })}
        >
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>Let's Go →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
