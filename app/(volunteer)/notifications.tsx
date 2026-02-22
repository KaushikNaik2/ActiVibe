import React from 'react';
import { View, Text, SafeAreaView, FlatList, Pressable } from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import { useNotifStore } from '@/stores/notifStore';
import { Colors } from '@/constants/theme';

const ICONS: Record<string, string> = {
  drive_confirmed: '✅',
  drive_reminder: '⏰',
  endorsement: '🌟',
  drive_update: '📢',
};

export default function NotificationsScreen() {
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  const items = useNotifStore((s) => s.items);
  const markRead = useNotifStore((s) => s.markRead);
  const markAllRead = useNotifStore((s) => s.markAllRead);
  const unread = useNotifStore((s) => s.unread);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.ink }}>Notifications</Text>
        {unread > 0 && (
          <Pressable onPress={markAllRead}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.brand }}>Mark all read</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => markRead(item.id)}
            style={{
              flexDirection: 'row', backgroundColor: item.read ? colors.card : colors.brandLight,
              borderRadius: 16, padding: 14, marginBottom: 10,
              borderLeftWidth: item.read ? 0 : 3, borderLeftColor: colors.brand,
            }}
          >
            <Text style={{ fontSize: 24, marginRight: 12 }}>{ICONS[item.type] || '📌'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>{item.title}</Text>
              <Text style={{ fontSize: 13, color: colors.inkLight, marginTop: 2, lineHeight: 18 }}>
                {item.body}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.brand }}>{item.ctaLabel}</Text>
                <Text style={{ fontSize: 11, color: colors.inkMuted }}>{item.timestamp}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
