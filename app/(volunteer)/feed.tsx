import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, Pressable, SafeAreaView, Image,
  FlatList, TextInput, Modal, RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { useFeedStore } from '@/stores/feedStore';
import { useActiveEventStore } from '@/stores/activeEventStore';
import { useNotifStore } from '@/stores/notifStore';
import { Colors } from '@/constants/theme';
import { type FeedPost } from '@/data/seed';

function VerifiedBadge({ variant }: { variant: 'live' | 'post_event' }) {
  const isLive = variant === 'live';
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: isLive ? '#D1FAE5' : '#FEF3C7',
      paddingHorizontal: 10, paddingVertical: 3, borderRadius: 9999,
      alignSelf: 'flex-start', marginTop: 4,
    }}>
      <Text style={{ fontSize: 10 }}>✓ </Text>
      <Text style={{
        fontSize: 11, fontWeight: '600',
        color: isLive ? '#059669' : '#D97706',
      }}>
        {isLive ? 'GPS Verified' : 'Post-Event'}
      </Text>
    </View>
  );
}

function PostCard({ post, colors }: { post: FeedPost; colors: typeof Colors.light }) {
  const [liked, setLiked] = useState(false);

  if (post.type === 'recommendation') {
    return (
      <View style={{
        backgroundColor: colors.tealLight, borderRadius: 16, padding: 16,
        marginBottom: 12, borderLeftWidth: 3, borderLeftColor: colors.teal,
      }}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: colors.teal }}>✨ Matched for You</Text>
        <Text style={{ fontSize: 14, color: colors.ink, marginTop: 6 }}>{post.caption}</Text>
        <Pressable style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.teal }}>View Drive →</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{
      backgroundColor: colors.card, borderRadius: 20, marginBottom: 12,
      shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14 }}>
        <Image
          source={{ uri: post.authorAvatar }}
          style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.gray100 }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: colors.ink }}>{post.authorName}</Text>
            {post.ngoName && post.authorRole === 'volunteer' && (
              <Text style={{ fontSize: 13, color: colors.inkMuted }}> at {post.ngoName}</Text>
            )}
          </View>
          {post.driveName && (
            <View style={{
              backgroundColor: colors.brandLight, paddingHorizontal: 8, paddingVertical: 2,
              borderRadius: 6, alignSelf: 'flex-start', marginTop: 3,
            }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: colors.brand }}>#{post.driveName}</Text>
            </View>
          )}
          {post.verifiedBadge && <VerifiedBadge variant={post.verifiedBadge} />}
        </View>
        <Text style={{ fontSize: 11, color: colors.inkMuted }}>{post.timestamp}</Text>
      </View>

      {/* Caption */}
      <Text style={{ fontSize: 15, color: colors.ink, paddingHorizontal: 14, lineHeight: 22, marginBottom: post.imageUrl ? 10 : 0 }}>
        {post.caption}
      </Text>

      {/* Image */}
      {post.imageUrl && (
        <Image
          source={{ uri: post.imageUrl }}
          style={{ width: '100%', height: 200, marginTop: 4 }}
          resizeMode="cover"
        />
      )}

      {/* Actions */}
      <View style={{ flexDirection: 'row', padding: 14, gap: 20 }}>
        <Pressable onPress={() => setLiked(!liked)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>{liked ? '❤️' : '🤍'}</Text>
          <Text style={{ fontSize: 13, color: colors.inkMuted, marginLeft: 4 }}>
            {post.likes + (liked ? 1 : 0)}
          </Text>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16 }}>💬</Text>
          <Text style={{ fontSize: 13, color: colors.inkMuted, marginLeft: 4 }}>{post.comments}</Text>
        </View>
        <Text style={{ fontSize: 16 }}>↗️</Text>
      </View>

      {/* CTA */}
      {post.ctaLabel && (
        <Pressable style={{
          marginHorizontal: 14, marginBottom: 14, height: 40, borderRadius: 12,
          backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '600' }}>{post.ctaLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function FeedScreen() {
  const router = useRouter();
  const darkMode = useAuthStore((s) => s.darkMode);
  const colors = darkMode ? Colors.dark : Colors.light;
  const posts = useFeedStore((s) => s.posts);
  const feedTab = useFeedStore((s) => s.feedTab);
  const setFeedTab = useFeedStore((s) => s.setFeedTab);
  const activeDrive = useActiveEventStore((s) => s.activeDrive);
  const inZone = useActiveEventStore((s) => s.inZone);
  const timerSeconds = useActiveEventStore((s) => s.timerSeconds);
  const unread = useNotifStore((s) => s.unread);
  const toggleDarkMode = useAuthStore((s) => s.toggleDarkMode);
  const [refreshing, setRefreshing] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);

  const formatTimer = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const filteredPosts = feedTab === 'all' ? posts :
    feedTab === 'drives' ? posts.filter((p) => p.type === 'ngo_drive' || p.type === 'recommendation') :
    posts.filter((p) => p.type === 'ngo_update' || p.type === 'volunteer_live' || p.type === 'volunteer_post_event');

  const tabs: { key: typeof feedTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'drives', label: 'Drives' },
    { key: 'updates', label: 'Updates' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Nav Bar */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12,
        backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border,
      }}>
        <Pressable onPress={() => router.push('/(volunteer)/feed')}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: colors.brand, letterSpacing: -0.5 }}>
            ActiVibe
          </Text>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={toggleDarkMode}>
            <Text style={{ fontSize: 18 }}>{darkMode ? '☀️' : '🌙'}</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/(volunteer)/notifications')}>
            <View>
              <Text style={{ fontSize: 20 }}>🔔</Text>
              {unread > 0 && (
                <View style={{
                  position: 'absolute', top: -4, right: -6,
                  backgroundColor: '#DC2626', borderRadius: 8,
                  minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text style={{ color: '#FFF', fontSize: 9, fontWeight: '700' }}>{unread}</Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>
      </View>

      {/* Active Drive Banner */}
      {activeDrive && (
        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: colors.brand, paddingHorizontal: 16, paddingVertical: 10,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 8, height: 8, borderRadius: 4,
              backgroundColor: inZone ? '#34D399' : '#FBBF24', marginRight: 8,
            }} />
            <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '600' }}>{activeDrive.driveName}</Text>
          </View>
          <Text style={{
            color: inZone ? '#FFF' : '#FBBF24', fontSize: 14,
            fontFamily: 'monospace', fontWeight: '600',
          }}>
            {formatTimer(timerSeconds)}{!inZone ? ' (paused)' : ''}
          </Text>
        </View>
      )}

      {/* Filter Chips */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setFeedTab(tab.key)}
            style={{
              paddingHorizontal: 16, height: 34, borderRadius: 9999,
              backgroundColor: feedTab === tab.key ? colors.brand : colors.gray100,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{
              fontSize: 13, fontWeight: '600',
              color: feedTab === tab.key ? '#FFF' : colors.inkMuted,
            }}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand} />
        }
        ListHeaderComponent={
          /* Stories Row - Drives Near You */
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.inkMuted, marginBottom: 8 }}>
              Drives Near You
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['Greenpeace', 'TeachForIndia', 'iVolunteer', 'NSS', 'Red Cross'].map((name, i) => (
                <View key={i} style={{ alignItems: 'center', marginRight: 16 }}>
                  <View style={{
                    width: 62, height: 62, borderRadius: 31, borderWidth: 2,
                    borderColor: colors.brand, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: colors.card,
                  }}>
                    <Image
                      source={{ uri: `https://api.dicebear.com/7.x/identicon/png?seed=${name}` }}
                      style={{ width: 52, height: 52, borderRadius: 26 }}
                    />
                  </View>
                  <Text style={{ fontSize: 10, color: colors.inkMuted, marginTop: 4, textAlign: 'center' }}>
                    {name}
                  </Text>
                  <View style={{
                    paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4,
                    backgroundColor: i === 0 ? '#059669' : colors.gray100, marginTop: 2,
                  }}>
                    <Text style={{ fontSize: 8, fontWeight: '700', color: i === 0 ? '#FFF' : colors.inkMuted }}>
                      {i === 0 ? 'LIVE' : 'REGISTER'}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => <PostCard post={item} colors={colors} />}
      />
    </SafeAreaView>
  );
}
