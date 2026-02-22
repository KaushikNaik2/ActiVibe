import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/stores/authStore";
import { View } from "react-native";

export default function RootLayout() {
  const darkMode = useAuthStore((s) => s.darkMode);

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#0F0E17' : '#FEFFF8' }}>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: darkMode ? '#0F0E17' : '#FEFFF8' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(volunteer)" />
        <Stack.Screen name="(ngo)" />
        <Stack.Screen name="(shared)" />
      </Stack>
    </View>
  );
}
