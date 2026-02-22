import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import { useNotifStore } from "@/stores/notifStore";
import { Colors } from "@/constants/theme";

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    feed: '🏠',
    map: '📍',
    profile: '👤',
    notifications: '🔔',
  };
  return (
    <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.5 }}>
      {icons[name] || '📱'}
    </Text>
  );
}

export default function VolunteerLayout() {
  const darkMode = useAuthStore((s) => s.darkMode);
  const unread = useNotifStore((s) => s.unread);
  const colors = darkMode ? Colors.dark : Colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.gray400,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabIcon name="feed" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ focused }) => <TabIcon name="map" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ focused }) => (
            <View>
              <TabIcon name="notifications" focused={focused} />
              {unread > 0 && (
                <View style={{
                  position: 'absolute', top: -4, right: -8,
                  backgroundColor: '#DC2626', borderRadius: 8,
                  minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text style={{ color: '#FFF', fontSize: 9, fontWeight: '700' }}>{unread}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
