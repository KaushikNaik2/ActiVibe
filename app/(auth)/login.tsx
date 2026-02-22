import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Colors } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const user = useAuthStore((s) => s.user);
  const loginAsVolunteer = useAuthStore((s) => s.loginAsVolunteer);
  const loginAsNGO = useAuthStore((s) => s.loginAsNGO);
  const colors = darkMode ? Colors.dark : Colors.light;

  const [role, setRole] = useState<'volunteer' | 'ngo'>(user?.role || 'volunteer');
  const [email, setEmail] = useState('demo@activibe.com');
  const [password, setPassword] = useState('demo123');
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValid = email.includes('@') && password.length >= 6 && (!isSignUp || password === confirmPassword);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    
    if (role === 'volunteer') {
      loginAsVolunteer();
      router.replace('/(auth)/onboarding');
    } else {
      loginAsNGO();
      router.replace('/(auth)/ngo-register');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: colors.ink, letterSpacing: -0.5 }}>
              ActiVibe
            </Text>
            <Text style={{ fontSize: 14, color: colors.inkMuted, marginTop: 4 }}>
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </Text>
          </View>

          {/* Auth Card */}
          <View style={{
            backgroundColor: colors.card, borderRadius: 20,
            padding: 24, shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06,
            shadowRadius: 12, elevation: 3,
          }}>
            {/* Role Selector */}
            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.inkLight, marginBottom: 8 }}>
              I am a…
            </Text>
            <View style={{
              flexDirection: 'row', backgroundColor: colors.gray100,
              borderRadius: 12, padding: 4, marginBottom: 20,
            }}>
              {(['volunteer', 'ngo'] as const).map((r) => (
                <Pressable
                  key={r}
                  onPress={() => setRole(r)}
                  style={{
                    flex: 1, height: 40, borderRadius: 10,
                    backgroundColor: role === r ? colors.brand : 'transparent',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Text style={{
                    fontSize: 13, fontWeight: '600',
                    color: role === r ? '#FFF' : colors.inkMuted,
                  }}>
                    {r === 'volunteer' ? 'Volunteer' : 'NGO'}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Google Sign-In Button (simulated) */}
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => ({
                height: 52, borderRadius: 16, borderWidth: 1, borderColor: colors.border,
                backgroundColor: colors.card, flexDirection: 'row',
                alignItems: 'center', justifyContent: 'center',
                transform: [{ scale: pressed ? 0.97 : 1 }],
              })}
            >
              <Text style={{ fontSize: 20, marginRight: 10 }}>🔵</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', color: colors.ink }}>
                Continue with Google
              </Text>
            </Pressable>

            {/* OR Divider */}
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginVertical: 20,
            }}>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              <Text style={{ marginHorizontal: 12, fontSize: 12, color: colors.inkMuted }}>or</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            </View>

            {/* Email */}
            <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={colors.inkMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                height: 52, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
                paddingHorizontal: 16, fontSize: 15, color: colors.ink,
                backgroundColor: colors.card, marginBottom: 12,
              }}
            />

            {/* Password */}
            <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>Password</Text>
            <View style={{ position: 'relative', marginBottom: isSignUp ? 12 : 20 }}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••"
                placeholderTextColor={colors.inkMuted}
                secureTextEntry={!showPassword}
                style={{
                  height: 52, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
                  paddingHorizontal: 16, paddingRight: 48, fontSize: 15, color: colors.ink,
                  backgroundColor: colors.card,
                }}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 14, top: 14 }}
              >
                <Text style={{ fontSize: 18 }}>{showPassword ? '🙈' : '👁️'}</Text>
              </Pressable>
            </View>

            {/* Confirm Password (sign up only) */}
            {isSignUp && (
              <>
                <Text style={{ fontSize: 11, fontWeight: '600', color: colors.inkLight, marginBottom: 6 }}>
                  Confirm Password
                </Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••"
                  placeholderTextColor={colors.inkMuted}
                  secureTextEntry
                  style={{
                    height: 52, borderRadius: 12, borderWidth: 1,
                    borderColor: confirmPassword && password !== confirmPassword ? '#DC2626' : colors.border,
                    paddingHorizontal: 16, fontSize: 15, color: colors.ink,
                    backgroundColor: colors.card, marginBottom: 20,
                  }}
                />
                {confirmPassword && password !== confirmPassword && (
                  <Text style={{ fontSize: 11, color: '#DC2626', marginTop: -16, marginBottom: 16 }}>
                    Passwords don't match
                  </Text>
                )}
              </>
            )}

            {/* Submit Button */}
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
                {loading ? '⏳ Signing in...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Text>
            </Pressable>

            {/* Toggle Mode */}
            <Pressable onPress={() => setIsSignUp(!isSignUp)} style={{ marginTop: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: colors.brand }}>
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
