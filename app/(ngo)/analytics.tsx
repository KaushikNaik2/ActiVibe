import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { Colors } from '@/constants/theme';
import {
  SEED_ANALYTICS_SUMMARY, SEED_ANALYTICS_VOLUNTEERS,
  SEED_ZONE_TIME_DISTRIBUTION, SEED_ROLE_FILL, SEED_DRIVE,
} from '@/data/seed';

export default function AnalyticsScreen() {
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  const [activeTab, setActiveTab] = useState<'analytics' | 'endorsements'>('analytics');
  const summary = SEED_ANALYTICS_SUMMARY;
  const volunteers = SEED_ANALYTICS_VOLUNTEERS;
  const maxMinutes = Math.max(...volunteers.map((v) => v.activeMinutes));

  const statCards = [
    { label: 'Total Volunteers', value: summary.totalVolunteers.toString() },
    { label: 'Avg Active Time', value: summary.avgActiveTime },
    { label: 'Collective Hours', value: `${summary.totalCollectiveHours}h` },
    { label: 'Attendance Rate', value: `${summary.attendanceRate}%`, trend: '↑ 12%' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header */}
      <View style={{
        paddingHorizontal: 16, paddingVertical: 14,
        backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.ink }}>Drive Analytics</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <Text style={{ fontSize: 14, color: colors.inkMuted }}>{SEED_DRIVE.name}</Text>
              <View style={{
                backgroundColor: '#D1FAE5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 9999,
              }}>
                <Text style={{ fontSize: 10, fontWeight: '600', color: '#059669' }}>GPS Tracked</Text>
              </View>
            </View>
          </View>
          <Text style={{ fontSize: 20 }}>📤</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        {/* Summary Stats */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
          {statCards.map((card, i) => (
            <View key={i} style={{
              width: 148, backgroundColor: colors.card, borderRadius: 16,
              padding: 16, marginRight: 10,
              shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
            }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.brand }}>{card.value}</Text>
              <Text style={{ fontSize: 12, color: colors.inkMuted, marginTop: 4 }}>{card.label}</Text>
              {card.trend && (
                <Text style={{ fontSize: 11, color: '#059669', fontWeight: '600', marginTop: 2 }}>{card.trend}</Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* GPS Verified Banner */}
        <View style={{
          marginTop: 16, backgroundColor: colors.tealLight, borderRadius: 12,
          borderLeftWidth: 3, borderLeftColor: colors.teal, padding: 12,
        }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: darkMode ? colors.teal : colors.ink, lineHeight: 20 }}>
            ✓ All data automatically tracked by GPS geofence. Zero manual input from NGO staff.
          </Text>
        </View>

        {/* Per-Volunteer Active Time Bar Chart */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink, marginTop: 24, marginBottom: 12 }}>
          Active Time Per Volunteer
        </Text>
        {volunteers.map((vol, i) => (
          <View key={vol.id} style={{
            flexDirection: 'row', alignItems: 'center', marginBottom: 10,
            backgroundColor: i === 0 ? colors.brandLight : 'transparent',
            borderRadius: 12, padding: 8,
          }}>
            <Image source={{ uri: vol.avatar }} style={{ width: 28, height: 28, borderRadius: 14 }} />
            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.ink, width: 70, marginLeft: 8 }} numberOfLines={1}>
              {vol.name.split(' ')[0]}
            </Text>
            <View style={{ flex: 1, height: 20, backgroundColor: colors.gray100, borderRadius: 4, marginHorizontal: 8 }}>
              <View style={{
                width: `${(vol.activeMinutes / maxMinutes) * 100}%`, height: '100%',
                backgroundColor: colors.brand, borderRadius: 4,
              }} />
            </View>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#059669', width: 50, textAlign: 'right' }}>
              {vol.activeTime.slice(0, 4)}
            </Text>
          </View>
        ))}

        {/* Attendance Funnel */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink, marginTop: 24, marginBottom: 12 }}>
          Attendance Funnel
        </Text>
        <View style={{ alignItems: 'center', gap: 8 }}>
          {[
            { label: 'Registered', count: summary.registeredCount, color: colors.brand, width: '100%' },
            { label: 'Checked In', count: summary.checkedInCount, color: '#059669', width: '82%' },
            { label: 'Completed', count: summary.completedCount, color: colors.teal, width: '68%' },
          ].map((step, i) => (
            <View key={i} style={{ width: '100%', alignItems: 'center' }}>
              <View style={{
                width: step.width as any, height: 44, backgroundColor: step.color,
                borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                flexDirection: 'row',
              }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFF' }}>{step.count}</Text>
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginLeft: 8 }}>{step.label}</Text>
              </View>
              {i < 2 && <Text style={{ fontSize: 16, color: colors.inkMuted, marginVertical: 2 }}>↓</Text>}
            </View>
          ))}
        </View>

        {/* Role Fill Rate */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink, marginTop: 24, marginBottom: 12 }}>
          Role Breakdown
        </Text>
        {SEED_ROLE_FILL.map((role, i) => (
          <View key={i} style={{
            backgroundColor: colors.card, borderRadius: 12, padding: 12, marginBottom: 8,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>{role.role}</Text>
                <Text style={{ fontSize: 11, color: colors.inkMuted }}>
                  {role.filled} of {role.total} slots • {role.avgHours}h avg
                </Text>
              </View>
            </View>
            <View style={{
              height: 6, backgroundColor: colors.gray100, borderRadius: 3, marginTop: 8,
            }}>
              <View style={{
                width: `${(role.filled / role.total) * 100}%`, height: '100%',
                backgroundColor: role.filled < role.total ? '#D97706' : '#059669',
                borderRadius: 3,
              }} />
            </View>
          </View>
        ))}

        {/* Zone Time Distribution */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.ink, marginTop: 24, marginBottom: 12 }}>
          Activity by Time of Day
        </Text>
        <View style={{
          flexDirection: 'row', alignItems: 'flex-end', height: 120,
          gap: 6, paddingHorizontal: 4,
        }}>
          {SEED_ZONE_TIME_DISTRIBUTION.map((slot, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center' }}>
              <View style={{
                width: '100%', height: Math.max(4, (slot.count / 23) * 100),
                backgroundColor: colors.brand, borderTopLeftRadius: 4, borderTopRightRadius: 4,
              }} />
              <Text style={{ fontSize: 8, color: colors.inkMuted, marginTop: 4 }}>{slot.hour}</Text>
            </View>
          ))}
        </View>

        {/* Export */}
        <Pressable style={{
          marginTop: 24, height: 48, borderRadius: 16, borderWidth: 1.5, borderColor: colors.brand,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.brand }}>📊 Export as CSV</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
