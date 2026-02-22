import React from 'react';
import {
  View, Text, ScrollView, SafeAreaView, Pressable, Image,
  FlatList, RefreshControl,
} from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { useFeedStore } from '@/stores/feedStore';
import { Colors } from '@/constants/theme';
import { SEED_NGO_KPIS } from '@/data/seed';

export default function NGOFeedScreen() {
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  const posts = useFeedStore((s) => s.posts);
  const toggleDarkMode = useAuthStore((s) => s.toggleDarkMode);
  const logout = useAuthStore((s) => s.logout);

  const kpis = [
    { label: 'Active Drives', value: SEED_NGO_KPIS.activeDrives, color: colors.brand },
    { label: 'Volunteers', value: SEED_NGO_KPIS.totalVolunteers, color: '#3B82F6' },
    { label: 'Check-In Rate', value: `${SEED_NGO_KPIS.avgCheckinRate}%`, color: '#059669' },
    { label: 'Endorsed', value: SEED_NGO_KPIS.endorsementsAwarded, color: '#F59E0B' },
  ];

  const ngoPostsOnly = posts.filter((p) => p.authorRole === 'ngo' || p.type === 'volunteer_live');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Nav */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12,
        backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border,
      }}>
        <Text style={{ fontSize: 20, fontWeight: '800', color: colors.brand }}>ActiVibe</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable onPress={toggleDarkMode}>
            <Text style={{ fontSize: 18 }}>{darkMode ? '☀️' : '🌙'}</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Welcome */}
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.ink, marginBottom: 4 }}>
          Welcome, Greenpeace 👋
        </Text>
        <Text style={{ fontSize: 14, color: colors.inkMuted, marginBottom: 16 }}>
          Here's your organisation dashboard.
        </Text>

        {/* KPI Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {kpis.map((kpi, i) => (
            <View key={i} style={{
              width: 140, backgroundColor: colors.card, borderRadius: 16,
              padding: 16, marginRight: 10,
              shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
            }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: kpi.color }}>
                {kpi.value}
              </Text>
              <Text style={{ fontSize: 12, color: colors.inkMuted, marginTop: 4 }}>{kpi.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Recent Activity */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink, marginBottom: 12 }}>
          Recent Activity
        </Text>
        {ngoPostsOnly.slice(0, 4).map((post) => (
          <View key={post.id} style={{
            backgroundColor: colors.card, borderRadius: 16, padding: 14, marginBottom: 10,
            shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: post.authorAvatar }}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gray100 }}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>{post.authorName}</Text>
                <Text style={{ fontSize: 11, color: colors.inkMuted }}>{post.timestamp}</Text>
              </View>
              {post.verifiedBadge && (
                <View style={{
                  backgroundColor: '#D1FAE5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 9999,
                }}>
                  <Text style={{ fontSize: 10, fontWeight: '600', color: '#059669' }}>✓ Verified</Text>
                </View>
              )}
            </View>
            <Text style={{ fontSize: 13, color: colors.inkLight, marginTop: 8, lineHeight: 18 }} numberOfLines={2}>
              {post.caption}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
